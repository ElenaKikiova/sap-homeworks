import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {IonContent, NavController, PopoverController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {EmojiPopoverComponent} from '../../component/emoji-popover/emoji-popover.component';
import {FsService} from '../../service/firestore/fs.service';
import {ChatMessage} from './chat-message';
import {map, tap} from 'rxjs/operators';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.page.html',
    styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

    @ViewChild('content', {static: false}) ionContent: IonContent;

    id: string;
    name: string;
    messages: Observable<ChatMessage[]>;

    message = '';

    constructor(private route: ActivatedRoute,
                private navController: NavController,
                private fsService: FsService,
                private popoverController: PopoverController) {
    }

    ngOnInit() {
        this.route.paramMap.subscribe(paramMap => {
            if (paramMap.has('chatId')) {
                console.log(paramMap);
                const chatId = paramMap.get('chatId');
                this.getChatData(chatId);
            }
        });
    }

    getChatData(chatId: string) {
        this.fsService.chatRoom(chatId)
            .subscribe(chatData => {
                this.id = chatData.id;
                this.name = chatData.name;

                this.fetchChatMessages(this.id);
            });
    }

    fetchChatMessages(chatId: string) {
        this.messages = this.fsService.messages(chatId).pipe(
            map(v => this.processMessages(v)),
            tap(v => {
                setTimeout(() => {
                    this.ionContent.scrollToBottom(200).then(r => console.log('Scrolled to bottom!'));
                }, 50);
            })
        );
    }

    processMessages(messages: ChatMessage[]) {
        let lastUid = '';

        let last50 = [];

        if(messages.length > 50){
          for (let i = messages.length - 50; i < messages.length; i++) {
            last50.push(messages[i]);
          }
        }
        else last50 = messages;

        for (const [i, v] of last50.entries()) {
            last50[i].isFirst = true;
            last50[i].isLast = true;

            const currentUid = v.createdBy.uid;

            if (i > 0 && lastUid === currentUid) {
                last50[i].isFirst = false;
                last50[i - 1].isLast = false;
            }

            lastUid = currentUid;
        }

        return last50;
    }

    onMessageSend() {
        if (this.message.trim() !== '') {
            this.fsService.sendMessage(this.id, this.message).then(() => {
                console.log('Изпращане на : ' + this.message);
                this.message = '';
            });
        }
    }

    onEmojiPopoverOpen($event: MouseEvent) {
        this.popoverController.create({
            id: 'EmojiPopover',
            component: EmojiPopoverComponent,
            event: $event,
            mode: 'ios'
        }).then(popover => {
            popover.present().then(() => console.log('Popover presented!'));
            popover.onWillDismiss().then(popoverData => {
                if (popoverData.data) {
                    const emoji = popoverData.data.emoji;
                    this.message += emoji;
                } else {
                    console.log('Popover closed without data!');
                }
            });
        });
    }

}

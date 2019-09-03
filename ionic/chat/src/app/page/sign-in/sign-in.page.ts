import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit{

  title = "CHAT4e";

  constructor(private navController: NavController) {}

  onNavToRegister(){
    this.navController.navigateForward("sign-up");
  }

  onSignIn(){
    this.navController.navigateForward("chat-rooms");
  }

}

import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  title = "CHAT4e";

  constructor() {}

  onClick(){
    alert("Helloww");
  }

}

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth/auth.service";

/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {

  messages: string[] = [];

  constructor(
    public authService: AuthServiceProvider,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  enviaMensagem(novaMensagem: string): void {
    this.messages.push(novaMensagem);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

}

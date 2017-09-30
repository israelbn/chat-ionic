import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from "../../providers/auth/auth.service";
import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2";
import { Mensagem } from "../../models/mensagem.model";
import { MensagemServiceProvider } from "../../providers/mensagem/mensagem.service";
import { User } from "../../models/user.model";
import { UsuarioServiceProvider } from "../../providers/usuario/usuario.service";

import { Chat } from "../../models/chat.model";
import firebase from 'firebase';
import { ChatServiceProvider } from "../../providers/chat/chat.service";
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

  messages: FirebaseListObservable<Mensagem[]>;
  recipient: User;
  sender: User;
  pageTitle: string;
  private chat1: FirebaseObjectObservable<Chat>;
  private chat2: FirebaseObjectObservable<Chat>;

  constructor(
    public chatService: ChatServiceProvider,
    public usuarioService: UsuarioServiceProvider,
    public mensagemService: MensagemServiceProvider,
    public authService: AuthServiceProvider,
    public navCtrl: NavController,
    public navParams: NavParams) {
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  enviaMensagem(novaMensagem: string): void {
    if (novaMensagem) {
      let currentTimestamp: Object = firebase.database.ServerValue.TIMESTAMP;

      this.mensagemService.create(
        new Mensagem(
          this.sender.uid,
          novaMensagem,
          currentTimestamp
        ),
        this.messages
      ).then(() => {

        this.chat1
          .update({
            lastMessage: novaMensagem,
            timestamp: currentTimestamp
          });

        this.chat2
          .update({
            lastMessage: novaMensagem,
            timestamp: currentTimestamp
          });

      });
    }
  }

  ionViewDidLoad() {
    this.recipient = this.navParams.get('recipientUser');
    this.pageTitle = this.recipient.nome;

    this.usuarioService.currentUser
      .subscribe((currentUser: User) => {
        this.sender = currentUser;

        this.chat1 = this.chatService.getDeepChat(
          this.sender.uid, this.recipient.uid
        );
        this.chat2 = this.chatService.getDeepChat(
          this.recipient.uid, this.sender.uid
        );

        this.messages = this.mensagemService
          .getMensagens(this.sender.uid, this.recipient.uid);

        this.messages
          .subscribe((messages: Mensagem[]) => {
            if (messages.length === 0) {
              this.messages = this.mensagemService
                .getMensagens(this.recipient.uid, this.sender.uid);
            }
          });
      });
  }

}

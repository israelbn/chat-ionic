import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { CadastroUsuarioPage } from "../cadastro-usuario/cadastro-usuario";
import { AuthServiceProvider } from "../../providers/auth/auth.service";
import { FirebaseListObservable } from "angularfire2";
import { User } from "../../models/user.model";
import { UsuarioServiceProvider } from "../../providers/usuario/usuario.service";
import { ChatPage } from "../chat/chat";
import { Chat } from "../../models/chat.model";
import { ChatServiceProvider } from "../../providers/chat/chat.service";
import firebase from "firebase";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuarios: FirebaseListObservable<User[]>;
  chats: FirebaseListObservable<Chat[]>;

  constructor(
    public menuCtrl: MenuController,
    public chatService: ChatServiceProvider,
    public usuarioService: UsuarioServiceProvider,
    public authService: AuthServiceProvider,
    public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.menuCtrl.enable(true, 'user-menu');
    this.usuarios = this.usuarioService.users;
    this.chats = this.chatService.chats;
  }

  onChatCreate(user: User): void {
    this.usuarioService.currentUser
      .subscribe((currentUser: User) => {
        this.chatService.getDeepChat(currentUser.uid, user.uid)
          .subscribe((chat: Chat) => {
            if(chat.hasOwnProperty('$value')) {
              let timestamp: Object = firebase.database.ServerValue.TIMESTAMP;

              let chat1 = new Chat('', timestamp, user.nome, '');
              this.chatService.create(chat1, currentUser.uid, user.uid);

              let chat2 = new Chat('', timestamp, currentUser.nome, '');
              this.chatService.create(chat2, user.uid, currentUser.uid);
            }
          });
      });

      this.navCtrl.push(ChatPage, {
        user: user
      });
    
  }

  onAbrir(): void {
    this.navCtrl.push(CadastroUsuarioPage);
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

  onChatOpen(chat: Chat): void {
    let recipientUserId: string = chat.$key;

    this.usuarioService.get(recipientUserId)
      .subscribe((user: User) => {
        this.navCtrl.push(ChatPage, {
          recipientUser: recipientUserId
        });
      });
  }

}

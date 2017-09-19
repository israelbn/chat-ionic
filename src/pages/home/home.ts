import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CadastroUsuarioPage } from "../cadastro-usuario/cadastro-usuario";
import { AuthServiceProvider } from "../../providers/auth/auth.service";
import { FirebaseListObservable } from "angularfire2";
import { User } from "../../models/user.model";
import { UsuarioServiceProvider } from "../../providers/usuario/usuario.service";
import { ChatPage } from "../chat/chat";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuarios: FirebaseListObservable<User[]>;

  constructor(
    public usuarioService: UsuarioServiceProvider,
    public authService: AuthServiceProvider,
    public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.usuarios = this.usuarioService.users;
  }

  onChatCreate(user: User): void {
    console.log('Usuário: ', user.nome);
    this.navCtrl.push(ChatPage);
  }

  onAbrir(): void {
    this.navCtrl.push(CadastroUsuarioPage);
  }

  ionViewCanEnter(): Promise<boolean> {
    return this.authService.authenticated;
  }

}

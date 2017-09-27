import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { User } from "../../models/user.model";
import { UsuarioServiceProvider } from "../../providers/usuario/usuario.service";
import { AuthServiceProvider } from "../../providers/auth/auth.service";

/**
 * Generated class for the UserProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  usuarioLogado: User;
  canEdit: boolean = false;
  private filePhoto: File;

  constructor(
    public userService: UsuarioServiceProvider,
    public authService: AuthServiceProvider,
    public navCtrl: NavController, 
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.userService.currentUser
      .subscribe((user: User) => {
        this.usuarioLogado = user;
      });
  }

  onSubmit(event: Event): void {
    let loading: Loading = this.showLoading();
    event.preventDefault();

    if(this.filePhoto) {
      let uploadTask = this.userService.uploadPhoto(
        this.filePhoto, this.usuarioLogado.uid);
      uploadTask.on('state_changed', (snapshot) => {

      }, (error: Error) => {
        // catch error
      }, () => {
        this.editUser(uploadTask.snapshot.downloadURL);
      });
    } else {
      this.editUser();
    }
    loading.dismiss();
  }

  private editUser(photoUrl?: string): void {
    this.userService.edit({
      nome: this.usuarioLogado.nome,
      photo: photoUrl || this.usuarioLogado.photo || '',
      username: this.usuarioLogado.usuario
    }).then(() => {
      this.canEdit = false;
      this.filePhoto = undefined;
    });
  }

  onPhoto(event): void {
    this.filePhoto = event.target.files[0];
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });
    loading.present();
    return loading;
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['Ok']
    }).present();
  }

}

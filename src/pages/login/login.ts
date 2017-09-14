import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Loading } from 'ionic-angular';
import { CadastroUsuarioPage } from "../cadastro-usuario/cadastro-usuario";
import { HomePage } from "../home/home";
import { AuthServiceProvider } from "../../providers/auth/auth.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  signinForm: FormGroup;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public authService: AuthServiceProvider,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController) {

      this.signinForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onCadastro(): void {
    this.navCtrl.
      push(CadastroUsuarioPage);
  }

  login(): void {
    let loading: Loading = this.showLoading();

    this.authService.signinWithEmail(this.signinForm.value)
      .then((isLogged: boolean) => {
        if(isLogged) {
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        }
      }).catch((error: any) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      });
  }

  private showAlert(message: string): void {
    this.alertCtrl.create({
      message: message,
      buttons: ['OK']
    }).present();
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Por favor aguarde...'
    });

    loading.present();
    return loading;
  }

}

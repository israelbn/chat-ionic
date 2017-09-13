import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsuarioServiceProvider } from "../../providers/usuario/usuario.service";
import { FirebaseAuthState } from "angularfire2";
import { HomePage } from "../home/home";
import { AuthServiceProvider } from "../../providers/auth/auth.service";

/**
 * Generated class for the CadastroUsuarioPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro-usuario',
  templateUrl: 'cadastro-usuario.html',
})
export class CadastroUsuarioPage {

  cadastroForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public usuarioService: UsuarioServiceProvider,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public authService: AuthServiceProvider
  ) {
    this.cadastroForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      email: ['', [Validators.required]],
      senha: ['', [Validators.required, 
        Validators.minLength(6)]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroUsuarioPage');
  }

  onSubmit(): void {
    let loading: Loading = this.showLoading();
    let formUser = this.cadastroForm.value;

    this.authService.createAuthUser({
      email: formUser.email,
      password: formUser.senha
    }).then((authState: FirebaseAuthState) => {
      delete formUser.senha;
      formUser.uid = authState.auth.uid;

      this.usuarioService.create(formUser)
        .then(() => {
          console.log('Usuário cadastrado!');
          this.navCtrl.setRoot(HomePage);
          loading.dismiss();
        }).catch((error: any) => {
          console.log(error);
          loading.dismiss();
          this.showAlert(error);
        });
    }).catch((error: any) => {
      console.log(error);
      loading.dismiss();
      this.showAlert(error);
    });

    
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

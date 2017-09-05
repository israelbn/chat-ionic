import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UsuarioServiceProvider } from "../../providers/usuario/usuario.service";

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
    public usuarioService: UsuarioServiceProvider
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
    console.log(this.cadastroForm.value);
    this.usuarioService.create(
      this.cadastroForm.value
    ).then(() => {
      console.log('Usuário cadastrado!');
    });
  }

}

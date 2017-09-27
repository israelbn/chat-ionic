import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { User } from "../models/user.model";
import { UsuarioServiceProvider } from "../providers/usuario/usuario.service";
import { AuthServiceProvider } from "../providers/auth/auth.service";
import { FirebaseAuthState } from "angularfire2";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  usuarioLogado: User;

  rootPage:any = LoginPage;

  constructor(
    authService: AuthServiceProvider,
    userService: UsuarioServiceProvider,
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    authService.auth.subscribe((authState: FirebaseAuthState) => {
      if(authState) {
        userService.currentUser.subscribe((user: User) => {
          this.usuarioLogado = user;
        });
      }
    });
  }
}


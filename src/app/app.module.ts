import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CadastroUsuarioPage } from "../pages/cadastro-usuario/cadastro-usuario";
import { LoginPage } from "../pages/login/login";
import { UsuarioServiceProvider } from '../providers/usuario/usuario.service';
import { HttpModule } from "@angular/http";

const config = {
  apiKey: "AIzaSyB4ENw8lrTcVmpOrlQmjRbWS4IxyfEeSvQ",
  authDomain: "chat-senac.firebaseapp.com",
  databaseURL: "https://chat-senac.firebaseio.com",
  projectId: "chat-senac",
  storageBucket: "chat-senac.appspot.com",
  messagingSenderId: "764069440039"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CadastroUsuarioPage,
    LoginPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CadastroUsuarioPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioServiceProvider
  ]
})
export class AppModule {}

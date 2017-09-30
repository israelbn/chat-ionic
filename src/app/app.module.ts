import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule, AuthMethods, AuthProviders } from 'angularfire2';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CadastroUsuarioPage } from "../pages/cadastro-usuario/cadastro-usuario";
import { LoginPage } from "../pages/login/login";
import { UsuarioServiceProvider } from '../providers/usuario/usuario.service';
import { HttpModule } from "@angular/http";
import { AuthServiceProvider } from '../providers/auth/auth.service';
import { ChatPage } from "../pages/chat/chat";
import { ChatServiceProvider } from '../providers/chat/chat.service';
import { UserInfoComponent } from "../components/user-info/user-info";
import { UserMenuComponent } from "../components/user-menu/user-menu";
import { UserProfilePage } from "../pages/user-profile/user-profile";
import { MensagemProvider } from '../providers/mensagem/mensagem';

const config = {
  apiKey: "AIzaSyB4ENw8lrTcVmpOrlQmjRbWS4IxyfEeSvQ",
  authDomain: "chat-senac.firebaseapp.com",
  databaseURL: "https://chat-senac.firebaseio.com",
  storageBucket: "chat-senac.appspot.com",
  messagingSenderId: "764069440039"
};

const firebaseAuthConfig = {
  provider: AuthProviders.Custom,
  method: AuthMethods.Password
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CadastroUsuarioPage,
    LoginPage,
    ChatPage,
    UserInfoComponent,
    UserMenuComponent,
    UserProfilePage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(
      config, 
      firebaseAuthConfig
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CadastroUsuarioPage,
    LoginPage,
    ChatPage,
    UserProfilePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioServiceProvider,
    AuthServiceProvider,
    ChatServiceProvider,
    MensagemProvider
  ]
})
export class AppModule {}

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireAuth, FirebaseAuthState } from "angularfire2";

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class AuthServiceProvider 
  extends BaseService{

    constructor(
      public http: Http,
      public auth: AngularFireAuth
    ) {
      super();
    }

    // criar usuário no firebase
    createAuthUser(
      user: {
        email: string,
        password: string
      }): firebase.Promise<FirebaseAuthState> {
        return this.auth.createUser(user)
          .catch(this.handlePromiseError);
    }

    // Logar usuário no Firebase
    signinWithEmail(user: {
      email: string, password: string
    }): firebase.Promise<boolean> {
      return this.auth.login(user)
        .then((authState: FirebaseAuthState) => {
          return authState != null;
        }).catch(this.handlePromiseError);
    }

}

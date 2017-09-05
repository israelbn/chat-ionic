import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire } from "angularfire2";
import { User } from "../../models/user.model";

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UsuarioServiceProvider {

  constructor(
    public af: AngularFire,
    public http: Http) {
    
  }

  create(user: User): firebase.Promise<void> {
    return this.af.database.list('/users')
      .push(user);
  }

}

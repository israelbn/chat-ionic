import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseListObservable, FirebaseAuthState } from "angularfire2";
import { User } from "../../models/user.model";
import { BaseService } from "../base/base.service";

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class UsuarioServiceProvider extends BaseService{

  users: FirebaseListObservable<User[]>;

  constructor(
    public af: AngularFire,
    public http: Http) {
      super();
      this.users = this.af.database.list('/users');
    
  }

  create(user: User): firebase.Promise<void> {
    return this.af.database.object(`/users/${user.uid}`).set(user)
      .catch(this.handlePromiseError);
  }

  private listenAuthState(): void {
    this.af.auth
      .subscribe((authState: FirebaseAuthState) => {
        if(authState) {
          this.currentUser = this.af.database.object
            (`/users/${authState.auth.uid}`);
          this.setUsers(authState.auth.uid);
        }
      });
  }

  private setUsers(uidToExclude: string): void {
    this.users = <FirebaseListObservable<User[]>>
      this.af.database.list(`/users`, {
        query: {
          orderByChild: 'nome'
        }
      }).map((users: User[]) => {
        return users.filter((user: User) =>
          user.uid !== uidToExclude);
    });
  }

}

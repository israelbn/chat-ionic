import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFire, FirebaseObjectObservable } from "angularfire2";
import { BaseService } from "../base/base.service";
import { Chat } from "../../models/chat.model";

/*
  Generated class for the ChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ChatServiceProvider extends BaseService{

  constructor(public http: Http, public af: AngularFire) {
    super();
  }

  create(chat: Chat, userId1: string, userId2: string): 
    firebase.Promise<void>{
      return this.af.database.object(`/chats/${userId1}/${userId2}`)
        .set(chat)
        .catch(this.handlePromiseError);
  }

  getDeepChat(userId1: string, userId2: string):
    FirebaseObjectObservable<Chat> {
      return <FirebaseObjectObservable<Chat>>
        this.af.database.object(`/chats/${userId1}/${userId2}`);
    }

}

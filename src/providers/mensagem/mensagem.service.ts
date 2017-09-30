import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BaseService } from "../base/base.service";
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { Mensagem } from "../../models/mensagem.model";

/*
  Generated class for the MensagemProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MensagemServiceProvider extends BaseService {

  constructor(public http: Http, public af: AngularFire) {
    super();
  }

  create(mensagem: Mensagem,
    listMensagens: FirebaseListObservable<Mensagem[]>): firebase
    .Promise<void> {
    return listMensagens.push(mensagem)
      .catch(this.handlePromiseError);
  }

  getMensagens(userId1: string, userId2: string):
    FirebaseListObservable<Mensagem[]> {
    return <FirebaseListObservable<Mensagem[]>>
      this.af.database.list(`/mensagens/${userId1}-${userId2}`, {
        query: {
          orderByChild: 'timestamp'
        }
      });
  }

}

import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";

const extractError = (
  error: Response | any): string => {
    let errMsg: string;
    if(error instanceof Response){
      error.json().then(body => {
        if (!body) {
            body = "";
        }
    
        const err = body.error || JSON.stringify(body);
        const errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      });
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);

    return errMsg;
  }

export abstract class BaseService {

  protected handlePromiseError(
    error: Response | any): Promise<any> {
      return Promise.reject(extractError(error));
  }

  protected handleObservableError(
    error: Response | any): Observable<any> {
      return Observable.throw(extractError(error));
    }

}

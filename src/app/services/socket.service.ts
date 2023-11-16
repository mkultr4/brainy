import { Observable } from 'rxjs';
import { BaseService } from './base.service';
import * as $ from "jquery";
import { User } from '../models/users/user';
import { environment } from 'src/environments/environment';
import * as io from 'socket.io-client';

export class SocketService extends BaseService {

  public socket: any;
  public intervalID: any;

  private freeSockets = [
    'changepassword',
    'confirm_register',
    'confirmation',
    'login',
    'loginSocial',
    'recover',
    'registrar',
    'socialregister'
  ];

  constructor(socketUrl: any) {
    super();
    console.log('entra ' + socketUrl);
    console.log('environment ' + environment.envName)
    if (environment.envName !== 'design') {
      const user = btoa(localStorage.getItem('currentUser'));
      const sessionID = this.validateSessionID();
      this.socket = io.connect(socketUrl, { query: `user=${user}&sessionID${sessionID}` });
      console.log(this.socket);
    }
  }

  proccessRequest(event: string, data: any): Observable<any> {
    this.socket.emit(event, data);

    const observable = new Observable<any>(observer => {
      this.socket.on(event, (dat: any) => {
        observer.next(dat);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  validateSessionID() {
    if(localStorage.getItem('sessionID')) {
      return localStorage.getItem('sessionID');
    } else {
      return false;
    }
  }
}

import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketService } from './socket.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService extends SocketService {

  constructor() {
    super(environment.urlSocketLogin);
  }

  loginSimple(credentials: any) {
    return this.proccessRequest('login', credentials);
  }

  loginSocial(credentials: any) {
    return this.proccessRequest('loginSocial', credentials);
  }
}

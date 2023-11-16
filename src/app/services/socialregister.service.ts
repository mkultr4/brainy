import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketService } from './socket.service';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocialRegisterService extends SocketService {

  constructor() {
    super(environment.urlSocketLogin);
  }

  registrarSocial(credentials: any) {
    return this.proccessRequest('socialregister', credentials);
  }

}

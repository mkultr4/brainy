import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfirmRegisterService extends SocketService {

  constructor() {
    super(environment.urlSocketLogin);
  }

  registrarSimple(credentials: any) {
    return this.proccessRequest('confirm_register', credentials);
  }

}

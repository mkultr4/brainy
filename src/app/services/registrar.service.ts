import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrarService extends SocketService {

  constructor() {
    super(environment.urlSocketLogin);
  }

  registrarSimple(credentials: any) {
    return this.proccessRequest('registrar', credentials);
  }

}

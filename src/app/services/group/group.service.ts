import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketService } from '../../services/socket.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GroupService extends SocketService{

  
  constructor() {
    super(environment.urlSocketMyProfile);
  }

  getAllGroup(credentials: any){
    console.log(credentials);
    
    const getallgroup = this.proccessRequest('getallgroup',credentials);
    console.log('PRUEBA DE LAS VARIABLE DE GETALLGROUP'+' '+JSON.stringify(getallgroup));
    return getallgroup;
  }
}
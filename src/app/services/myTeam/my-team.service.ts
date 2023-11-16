import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketService } from '../../services/socket.service';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class MyTeamService extends SocketService {

  constructor() {
    super(environment.urlSocketMyProfile);
  }

  getMyAllTeam(credentials: any){
    console.log('MY-TEAM.SERVICE.TS'+credentials);
    const res= this.proccessRequest('getallteam',credentials);
    console.log('RES'+JSON.stringify(res));
    return res;
  }
}

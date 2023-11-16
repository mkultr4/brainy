import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketService } from '../../services/socket.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActivityService extends SocketService {

  constructor() {
    super(environment.urlSocketMyProfile);
   }

   getActivity(credentials: any){
    console.log(credentials);
    return this.proccessRequest('getactivity',credentials);
   }
   
}

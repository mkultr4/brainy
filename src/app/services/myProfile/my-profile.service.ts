import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { SocketService } from '../../services/socket.service';
import { environment } from '../../../environments/environment';
import { runInThisContext } from 'vm';
import { BILLING, PAYLOG, PAYMENTMETHOD } from 'src/app/data/mock-billing';
import { of } from 'rxjs';

@Injectable()
export class MyProfileService extends SocketService {

  constructor() {
    super(environment.urlSocketMyProfile);
  }

  getMyProfile(credentials: any) {
    console.log(credentials);
    return this.proccessRequest('myprofile', credentials);
  }
  updateMyProfile(json:any){
    console.log("my-profile.services.ts==>"+json);
    return this.proccessRequest('myprofileupdate',json);
  }

  getAllLanguages(credentials: any) {
    console.log(credentials);
    return this.proccessRequest('getalllanguages', credentials);
  }
  getActivity(credentials:any){
    console.log(credentials);
    return this.proccessRequest('myactivity',credentials);
  }
  getBilling(credentials:any){
    console.log(credentials);
    return this.proccessRequest('mybills',credentials);
  }
  getMyAccount(credentials:any){
    console.log(credentials);
    return this.proccessRequest('myaccount',credentials);
  }
  getAllCountry(credentials:any){
    console.log(credentials);
    return this.proccessRequest('getallcountry',credentials);
  }
  getAllCity(credentials:any){
    console.log(credentials);
    return this.proccessRequest('getallcity',credentials);
  }
  getAllLocality(credentials:any){
    console.log(credentials);
    return this.proccessRequest('getalllocality',credentials);
  }
  getAllState(credentials:any){
    console.log(credentials);
    return this.proccessRequest('getallstate',credentials);
  }
  updateMyBills(credentials:any){
    console.log(credentials);
    return this.proccessRequest('mybillingdataupdate',credentials);
  }
  getIdState(credentials:any){
    console.log(credentials);
    return this.proccessRequest('getidstate',credentials);

  }
  getIdCity(credentials:any){
    console.log(credentials);
    return this.proccessRequest('getaidcity',credentials);
  }
  getSaveMyGroup(credentials:any){
    console.log(credentials);
    return this.proccessRequest('createGroup',credentials);
  }

  getActivityProfile(credentials: any){
    console.log(credentials);
    return this.proccessRequest('activityprofile',credentials);
  }

  getAllGroup(credentials: any){
    console.log(credentials);
    
    const getallgroup = this.proccessRequest('getallgroup',credentials);
    console.log('PRUEBA DE LAS VARIABLE DE GETALLGROUP'+' '+JSON.stringify(getallgroup));
    return getallgroup;
  }

  getMyAllTeam(credentials: any){
    console.log(credentials);
    return this.proccessRequest('getallteam',credentials);
  }
  ActTest(credentials: any){
    console.log(credentials);
    return this.proccessRequest('acTest',credentials);
  }

}


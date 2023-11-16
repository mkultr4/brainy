import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BillingService } from './billing.service';
import { BaseService } from '../base.service';
import { BillingMockService } from './billing-mock.service';

@Injectable({
    providedIn: 'root'
  })
export class BillingStrategyService {

    userService: BaseService;
    
  constructor() {
    if(environment.envName === 'design'){
        this.userService = new BillingMockService();
    }else{
        this.userService = new BillingService();
    }
   }
   getService(){
    return this.userService;
}


}

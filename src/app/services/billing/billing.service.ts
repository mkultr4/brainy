import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { BILLING, PAYLOG, PAYMENTMETHOD } from 'src/app/data/mock-billing';
import { SocketService } from '../socket.service';
import { PaymentMethod } from 'src/app/models/paymentLog/paymentMethod';
import { CardType } from 'src/app/models/paymentLog/card-type';
import { Account } from 'src/app/models/account/account';

@Injectable()
export class BillingService extends SocketService{
  private _paymentMethod: BehaviorSubject<PaymentMethod[]>;
  private dataStore: {
    paymentMethod:PaymentMethod[]
  }
  constructor() {
    super(environment.urlSocketMyProfile);
    this.dataStore = { paymentMethod: [] };
   }
   getbilling(){
    return of(BILLING[0]);
  
  }
  
  getHistoryLog(){
    return of(PAYLOG);
  }
  
  getCard(){
    return of(PAYMENTMETHOD);
  }
  
  editCard(){
    return of(PAYMENTMETHOD[0]);
  }

}

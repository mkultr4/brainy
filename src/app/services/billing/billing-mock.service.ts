import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { BILLING, PAYLOG, PAYMENTMETHOD, REASON } from 'src/app/data/mock-billing';
import { BaseService } from '../base.service';
import { PaymentMethod } from 'src/app/models/paymentLog/paymentMethod';
import * as uuid from 'uuid/v4';
import { Account } from 'src/app/models/account/account';
import { CardType } from 'src/app/models/paymentLog/card-type';

@Injectable()
export class BillingMockService extends BaseService{

  private _paymentMethod: BehaviorSubject<PaymentMethod[]>;
  public paymentMethod: Observable<PaymentMethod[]>;
  private dataStore: {
    paymentMethod:PaymentMethod[]
  }
  constructor() {
    super();
    this._paymentMethod = new BehaviorSubject(new Array<PaymentMethod>());
    this.paymentMethod = this._paymentMethod.asObservable();
    this.dataStore = { paymentMethod: [] };

   }
   proccessRequest(event: string, data: any): Observable<any> {
    throw new Error("Method not implemented.");
}
   getbilling(){
    return of(BILLING[0]);
  
  }
  
  getHistoryLog(){
    return of(PAYLOG);
  }
  
  getPaymentMethod(id: any){
    const observable = new Observable((observer) => {
      let paymentMethod;
      this.dataStore.paymentMethod.forEach(
        p=>{
          if(p.id === id){
            paymentMethod = p;
          }
      });
      observer.next(paymentMethod);
    });
    return observable;
  }

 

  loadPayMethods(){
    const observable = new Observable((observer) => {
      
      this.dataStore.paymentMethod = Object.assign([],PAYMENTMETHOD);
      
      
      this._paymentMethod.next(Object.assign({}, this.dataStore).paymentMethod);
      observer.next(this.dataStore.paymentMethod);
    });
    return observable;
  }
  
  create(paymentMethod: PaymentMethod) {

    const observable = new Observable((observer) => {
      paymentMethod.id = uuid();
      paymentMethod.cardType = CardType[0];
      paymentMethod.creditCardNumber.substr(paymentMethod.creditCardNumber.length - 4);
      paymentMethod.expiration = paymentMethod.expiration.substring(0, 2) + "/"+ paymentMethod.expiration.substring(2,4);
      paymentMethod.account = Account[0];


     
      
      this.dataStore.paymentMethod.push(Object.assign(new PaymentMethod(), paymentMethod));
      this._paymentMethod.next(Object.assign({}, this.dataStore).paymentMethod);
      observer.next(paymentMethod);
    });
    return observable;
  }
  updatePaymentMethod(id:any,newPaymentMethod: PaymentMethod){
    const observable = new Observable((observer) => {
      this.dataStore.paymentMethod.forEach(
        (p,index)=>{
          if(p.id === id){
            this.dataStore.paymentMethod[index].expiration = newPaymentMethod.expiration.substring(0, 2) + "/"+ newPaymentMethod.expiration.substring(2,4);
            this.dataStore.paymentMethod[index].secureCode = newPaymentMethod.secureCode;
          }
      });
      this._paymentMethod.next(Object.assign({}, this.dataStore).paymentMethod);
      observer.next(newPaymentMethod);
    });
    return observable;

  }
  delatePaymentMethod(id:any){
    const observable = new Observable((observer) => {
      this.dataStore.paymentMethod.forEach(
        (p,index)=>{
          if(p.id === id){
            this.dataStore.paymentMethod.splice(index,1);
          }
      });
      this._paymentMethod.next(Object.assign({}, this.dataStore).paymentMethod);
      observer.next(id);
    });
    return observable;

  }

  getReason(){
    return of(REASON);
  }
}

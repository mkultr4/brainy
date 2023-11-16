import { Injectable } from "@angular/core";
import { BaseService } from "../base.service";
import { Observable, of } from "rxjs";
import { BILLING, PAYLOG, PAYMENTMETHOD } from '../../data/mock-billing'

@Injectable()
  export class MyProfileMockService extends BaseService {
    
    constructor() {
      super();
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

    getCard(){
        return of(PAYMENTMETHOD);
    }

    editCard(){
        return of(PAYMENTMETHOD[0]);
    }

}
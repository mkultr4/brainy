import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable, of } from 'rxjs';
import { ACCOUNTS, BILLING_HISTORY } from '../../data/mock-account';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService {

  constructor() {
    super();
  }

  proccessRequest(event: string, data: any): Observable<any> {
    return new Observable();
  }

  getAccount(id) {
    return of(ACCOUNTS[0]);
  }
  getAccountBillingHistory(id) {
    return of(BILLING_HISTORY);
  }
  updateAccount(account) {
    return of(account);
  }

}

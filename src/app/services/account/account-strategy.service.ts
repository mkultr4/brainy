import { Injectable } from '@angular/core';
import { AccountService } from './account.service';
import { environment } from '../../../environments/environment';
import { AccountMockService } from './account-mock.service';

@Injectable({
  providedIn: 'root'
})
export class AccountStrategyService {

  accountService: AccountService;

  constructor(
  ) {
    if (environment.envName === 'design') {
      this.accountService = new AccountMockService();
    } else {
      this.accountService = new AccountService();
    }
  }

  getService() {
    return this.accountService;
  }

}

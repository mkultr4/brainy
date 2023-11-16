import { Injectable } from '@angular/core';
import { UserMockService } from './user-mock.service';
import { UserService } from './user.service';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserStrategyService {

  userService: BaseService;

  constructor() {
    if (environment.envName === 'design') {
      this.userService = new UserMockService();
    } else {
      this.userService = new UserService();
    }
  }

  getService() {
    return this.userService;
  }
}

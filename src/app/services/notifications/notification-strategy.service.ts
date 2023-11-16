import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NotificationMockService } from './notification-mock.service';
import { NotificationService } from './notification.service';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationStrategyService {

  public notificationService: BaseService;

  constructor(
  ) {
    if (environment.envName === 'design') {
      this.notificationService = new NotificationMockService();
    } else {
      this.notificationService = new NotificationService();
    }
  }

  getService() {
    return this.notificationService;
  }


}

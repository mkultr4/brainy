import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { environment } from 'src/environments/environment';
import { DailyMessageService } from './daily-message.service';
import { DailyMessageMockService } from './daily-message-mock.service';

@Injectable()
export class DailyMessageStrategyService {

  dailyMessageService: BaseService;

  constructor(
  ) {
    if (environment.envName === 'design') {
      this.dailyMessageService = new DailyMessageMockService();
    } else {
      this.dailyMessageService = new DailyMessageService();
    }
  }

  getService() {
    return this.dailyMessageService;
  }


}

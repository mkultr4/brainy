import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base.service';
import { BriefService } from './brief.service';
import { BriefMockService } from './brief-mock.service';

@Injectable()
export class BriefStrategyService {
  briefService: BaseService;

  constructor() {
    if (environment.envName === 'design') {
      this.briefService = new BriefMockService();
    } else {
      this.briefService = new BriefService();
    }
  }

  getService() {
    return this.briefService;
  }

}

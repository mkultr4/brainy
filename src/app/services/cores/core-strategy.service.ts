import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment';
import { CoreMockService } from './core-mock.service';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class CoreStrategyService {

  coreService: BaseService;

  constructor() {
    if (environment.envName === 'design') {
      this.coreService = new CoreMockService();
    } else {
      this.coreService = new CoreService();
    }
  }

  getService() {
    return this.coreService;
  }
}

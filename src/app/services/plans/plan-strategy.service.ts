import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment';
import { PlanMockService } from './plan-mock.service';
import { PlanService } from './plan.service';

@Injectable({
  providedIn: 'root'
})
export class PlanStrategyService {

  planService: BaseService;

  constructor(
  ) {
    if (environment.envName === 'design') {
      this.planService = new PlanMockService();
    } else {
      this.planService = new PlanService();
    }
  }

  getService() {
    return this.planService;
  }

}

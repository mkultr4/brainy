import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { environment } from 'src/environments/environment';
import { BriefPresentationService } from './brief-presentation.service';
import { BriefPresentationMockService } from './brief-presentation-mock.service';

@Injectable()
export class BriefPresentationStrategyService {
  briefPresentationService: BaseService;

  constructor() {
    if (environment.envName === 'design') {
      this.briefPresentationService = new BriefPresentationMockService();
    } else {
      this.briefPresentationService = new BriefPresentationService();
    }
  }

  getService() {
    return this.briefPresentationService;
  }

}

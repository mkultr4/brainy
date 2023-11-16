import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment';
import { FeedbackService } from './feedback.service';
import { FeedbackMockService } from './feedback-mock.service';
@Injectable()
export class FeedbackStrategyService {

  feedbackService: BaseService;

  constructor() {
    if (environment.envName === 'design') {
      this.feedbackService = new FeedbackMockService();
    } else {
      this.feedbackService = new FeedbackService();
    }
  }

  getService() {
    return this.feedbackService;
  }

}

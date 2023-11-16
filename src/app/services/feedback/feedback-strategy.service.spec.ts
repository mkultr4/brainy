/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FeedbackStrategyService } from './feedback-strategy.service';

describe('Service: FeedbackStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedbackStrategyService]
    });
  });

  it('should ...', inject([FeedbackStrategyService], (service: FeedbackStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

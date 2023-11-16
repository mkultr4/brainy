/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DailyMessageStrategyService } from './daily-message-strategy.service';

describe('Service: DailyMessageStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DailyMessageStrategyService]
    });
  });

  it('should ...', inject([DailyMessageStrategyService], (service: DailyMessageStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

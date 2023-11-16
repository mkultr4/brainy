/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BriefStrategyService } from './brief-strategy.service';

describe('Service: BriefStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BriefStrategyService]
    });
  });

  it('should ...', inject([BriefStrategyService], (service: BriefStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

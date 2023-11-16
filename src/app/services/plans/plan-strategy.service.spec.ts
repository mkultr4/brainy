/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlanStrategyService } from './plan-strategy.service';

describe('Service: PlanStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanStrategyService]
    });
  });

  it('should ...', inject([PlanStrategyService], (service: PlanStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BriefPresentationStrategyService } from './brief-presentation-strategy.service';

describe('Service: BriefPresentationStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BriefPresentationStrategyService]
    });
  });

  it('should ...', inject([BriefPresentationStrategyService], (service: BriefPresentationStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

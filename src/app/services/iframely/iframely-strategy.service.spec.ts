/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IframelyStrategyService } from './iframely-strategy.service';

describe('Service: IframelyStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IframelyStrategyService]
    });
  });

  it('should ...', inject([IframelyStrategyService], (service: IframelyStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocationStrategyService } from './location-strategy.service';

describe('Service: LocationStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationStrategyService]
    });
  });

  it('should ...', inject([LocationStrategyService], (service: LocationStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

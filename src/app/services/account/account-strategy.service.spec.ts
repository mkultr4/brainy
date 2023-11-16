/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AccountStrategyService } from './account-strategy.service';

describe('Service: AccountStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountStrategyService]
    });
  });

  it('should ...', inject([AccountStrategyService], (service: AccountStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

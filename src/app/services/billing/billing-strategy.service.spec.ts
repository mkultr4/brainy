import { TestBed, inject } from '@angular/core/testing';
import { BillingStrategyService } from './billing-strategy.service';

describe('BillingStrategyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillingStrategyService]
    });
  });

  it('should be created', inject([BillingStrategyService], (service: BillingStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

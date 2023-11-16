import { TestBed, inject } from '@angular/core/testing';
import { BillingMockService } from './billing-mock.service';

describe('BillingMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillingMockService]
    });
  });

  it('should be created', inject([BillingMockService], (service: BillingMockService) => {
    expect(service).toBeTruthy();
  }));
});

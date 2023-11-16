import { TestBed, inject } from '@angular/core/testing';

import { BrandStrategyService } from './brand-strategy.service';

describe('BrandStrategyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrandStrategyService]
    });
  });

  it('should be created', inject([BrandStrategyService], (service: BrandStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

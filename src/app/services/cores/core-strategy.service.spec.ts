import { TestBed, inject } from '@angular/core/testing';

import { CoreStrategyService } from './core-strategy.service';

describe('CoreStrategyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoreStrategyService]
    });
  });

  it('should be created', inject([CoreStrategyService], (service: CoreStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

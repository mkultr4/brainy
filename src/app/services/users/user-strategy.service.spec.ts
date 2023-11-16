import { TestBed, inject } from '@angular/core/testing';

import { UserStrategyService } from './user-strategy.service';

describe('UserStrategyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserStrategyService]
    });
  });

  it('should be created', inject([UserStrategyService], (service: UserStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

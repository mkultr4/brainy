/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CategoryStrategyService } from './category-strategy.service';

describe('Service: CategoryStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CategoryStrategyService]
    });
  });

  it('should ...', inject([CategoryStrategyService], (service: CategoryStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

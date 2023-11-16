/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RolStrategyService } from './rol-strategy.service';

describe('Service: RolStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RolStrategyService]
    });
  });

  it('should ...', inject([RolStrategyService], (service: RolStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

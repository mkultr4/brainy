/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SeoStrategyService } from './seo-strategy.service';

describe('Service: SeoStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeoStrategyService]
    });
  });

  it('should ...', inject([SeoStrategyService], (service: SeoStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

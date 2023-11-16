/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LanguageStrategyService } from './language-strategy.service';

describe('Service: LanguageStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguageStrategyService]
    });
  });

  it('should ...', inject([LanguageStrategyService], (service: LanguageStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

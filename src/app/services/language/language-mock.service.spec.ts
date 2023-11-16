/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LanguageMockService } from './language-mock.service';

describe('Service: LanguageMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LanguageMockService]
    });
  });

  it('should ...', inject([LanguageMockService], (service: LanguageMockService) => {
    expect(service).toBeTruthy();
  }));
});

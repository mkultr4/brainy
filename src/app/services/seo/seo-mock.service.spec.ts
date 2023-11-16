/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SeoMockService } from './seo-mock.service';

describe('Service: SeoMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SeoMockService]
    });
  });

  it('should ...', inject([SeoMockService], (service: SeoMockService) => {
    expect(service).toBeTruthy();
  }));
});

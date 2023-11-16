import { TestBed, inject } from '@angular/core/testing';

import { BrandMockService } from './brand-mock.service';

describe('BrandMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrandMockService]
    });
  });

  it('should be created', inject([BrandMockService], (service: BrandMockService) => {
    expect(service).toBeTruthy();
  }));
});

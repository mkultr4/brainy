/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BrandProfileService } from './brand-profile.service';

describe('Service: BrandProfile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrandProfileService]
    });
  });

  it('should ...', inject([BrandProfileService], (service: BrandProfileService) => {
    expect(service).toBeTruthy();
  }));
});

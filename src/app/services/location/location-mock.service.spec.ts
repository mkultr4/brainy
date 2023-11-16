/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocationMockService } from './location-mock.service';

describe('Service: LocationMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationMockService]
    });
  });

  it('should ...', inject([LocationMockService], (service: LocationMockService) => {
    expect(service).toBeTruthy();
  }));
});

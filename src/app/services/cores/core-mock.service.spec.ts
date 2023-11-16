import { TestBed, inject } from '@angular/core/testing';

import { CoreMockService } from './core-mock.service';

describe('CoreMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoreMockService]
    });
  });

  it('should be created', inject([CoreMockService], (service: CoreMockService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { UserMockService } from './user-mock.service';

describe('UserMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserMockService]
    });
  });

  it('should be created', inject([UserMockService], (service: UserMockService) => {
    expect(service).toBeTruthy();
  }));
});

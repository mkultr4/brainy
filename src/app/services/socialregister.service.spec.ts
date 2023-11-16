import { TestBed, inject } from '@angular/core/testing';

import { SocialregisterService } from './socialregister.service';

describe('SocialregisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocialregisterService]
    });
  });

  it('should be created', inject([SocialregisterService], (service: SocialregisterService) => {
    expect(service).toBeTruthy();
  }));
});

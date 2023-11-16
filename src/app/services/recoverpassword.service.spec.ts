import { TestBed, inject } from '@angular/core/testing';

import { RecoverpasswordService } from './recoverpassword.service';

describe('RecoverpasswordService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecoverpasswordService]
    });
  });

  it('should be created', inject([RecoverpasswordService], (service: RecoverpasswordService) => {
    expect(service).toBeTruthy();
  }));
});

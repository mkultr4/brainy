import { TestBed, inject } from '@angular/core/testing';

import { ConfirmRegisterService } from './confirm-register.service';

describe('ConfirmRegisterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConfirmRegisterService]
    });
  });

  it('should be created', inject([ConfirmRegisterService], (service: ConfirmRegisterService) => {
    expect(service).toBeTruthy();
  }));
});

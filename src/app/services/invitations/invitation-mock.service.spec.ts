/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InvitationMockService } from './invitation-mock.service';

describe('Service: InvitationMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvitationMockService]
    });
  });

  it('should ...', inject([InvitationMockService], (service: InvitationMockService) => {
    expect(service).toBeTruthy();
  }));
});

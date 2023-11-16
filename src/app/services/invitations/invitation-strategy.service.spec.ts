/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InvitationStrategyService } from './invitation-strategy.service';

describe('Service: InvitationStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvitationStrategyService]
    });
  });

  it('should ...', inject([InvitationStrategyService], (service: InvitationStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AccountMockService } from './account-mock.service';

describe('Service: AccountMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountMockService]
    });
  });

  it('should ...', inject([AccountMockService], (service: AccountMockService) => {
    expect(service).toBeTruthy();
  }));
});

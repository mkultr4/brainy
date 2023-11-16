/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BriefMockService } from './brief-mock.service';

describe('Service: BriefMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BriefMockService]
    });
  });

  it('should ...', inject([BriefMockService], (service: BriefMockService) => {
    expect(service).toBeTruthy();
  }));
});

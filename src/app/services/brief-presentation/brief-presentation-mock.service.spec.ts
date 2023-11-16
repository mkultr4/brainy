/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BriefPresentationMockService } from './brief-presentation-mock.service';

describe('Service: BriefPresentationMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BriefPresentationMockService]
    });
  });

  it('should ...', inject([BriefPresentationMockService], (service: BriefPresentationMockService) => {
    expect(service).toBeTruthy();
  }));
});

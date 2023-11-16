/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FeedbackMockService } from './feedback-mock.service';

describe('Service: FeedbackMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedbackMockService]
    });
  });

  it('should ...', inject([FeedbackMockService], (service: FeedbackMockService) => {
    expect(service).toBeTruthy();
  }));
});

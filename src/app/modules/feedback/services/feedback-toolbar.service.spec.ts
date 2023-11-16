/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FeedbackToolbarService } from './feedback-toolbar.service';

describe('Service: FeedbackToolbar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedbackToolbarService]
    });
  });

  it('should ...', inject([FeedbackToolbarService], (service: FeedbackToolbarService) => {
    expect(service).toBeTruthy();
  }));
});
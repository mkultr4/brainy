/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FeedbackWorkflowService } from './feedback-workflow.service';

describe('Service: FeedbackWorkflow', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedbackWorkflowService]
    });
  });

  it('should ...', inject([FeedbackWorkflowService], (service: FeedbackWorkflowService) => {
    expect(service).toBeTruthy();
  }));
});

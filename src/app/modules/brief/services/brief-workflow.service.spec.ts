/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BriefWorkflowService } from './brief-workflow.service';

describe('Service: BriefWorkflow', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BriefWorkflowService]
    });
  });

  it('should ...', inject([BriefWorkflowService], (service: BriefWorkflowService) => {
    expect(service).toBeTruthy();
  }));
});

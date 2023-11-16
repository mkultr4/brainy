/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CoreWorkflowService } from './core-workflow.service';

describe('Service: CoreWorkflow', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CoreWorkflowService]
    });
  });

  it('should ...', inject([CoreWorkflowService], (service: CoreWorkflowService) => {
    expect(service).toBeTruthy();
  }));
});

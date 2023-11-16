/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeaderWorkflowService } from './header-workflow.service';

describe('Service: HeaderWorkflow', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeaderWorkflowService]
    });
  });

  it('should ...', inject([HeaderWorkflowService], (service: HeaderWorkflowService) => {
    expect(service).toBeTruthy();
  }));
});

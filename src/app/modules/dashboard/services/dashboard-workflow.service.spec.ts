/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DashboardWorkflowService } from './dashboard-workflow.service';

describe('Service: DashboardWorkflow', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DashboardWorkflowService]
    });
  });

  it('should ...', inject([DashboardWorkflowService], (service: DashboardWorkflowService) => {
    expect(service).toBeTruthy();
  }));
});

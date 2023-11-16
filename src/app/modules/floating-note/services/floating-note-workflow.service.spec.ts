/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FloatingNoteWorkflowService } from './floating-note-workflow.service';

describe('Service: FloatingNoteWorkflow', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FloatingNoteWorkflowService]
    });
  });

  it('should ...', inject([FloatingNoteWorkflowService], (service: FloatingNoteWorkflowService) => {
    expect(service).toBeTruthy();
  }));
});

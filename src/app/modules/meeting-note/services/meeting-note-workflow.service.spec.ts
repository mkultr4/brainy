/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MeetingNoteWorkflowService } from './meeting-note-workflow.service';

describe('Service: MeetingNoteWorkflow', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeetingNoteWorkflowService]
    });
  });

  it('should ...', inject([MeetingNoteWorkflowService], (service: MeetingNoteWorkflowService) => {
    expect(service).toBeTruthy();
  }));
});

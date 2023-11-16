/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MeetingNoteCommentsService } from './meeting-note-comments.service';

describe('Service: MeetingNoteComments', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeetingNoteCommentsService]
    });
  });

  it('should ...', inject([MeetingNoteCommentsService], (service: MeetingNoteCommentsService) => {
    expect(service).toBeTruthy();
  }));
});

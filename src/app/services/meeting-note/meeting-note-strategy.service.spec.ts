/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MeetingNoteStrategyService } from './meeting-note-strategy.service';

describe('Service: MeetingNoteStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeetingNoteStrategyService]
    });
  });

  it('should ...', inject([MeetingNoteStrategyService], (service: MeetingNoteStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

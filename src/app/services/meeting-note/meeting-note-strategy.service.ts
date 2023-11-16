import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BaseService } from '../base.service';
import { MeetingNoteMockService } from './meeting-note-mock.service';
import { MeetingNoteService } from './meeting-note.service';

@Injectable()
export class MeetingNoteStrategyService {

  meetingNoteService: BaseService;

  constructor() {
    if (environment.envName === 'design') {
      this.meetingNoteService = new MeetingNoteMockService();
    } else {
      this.meetingNoteService = new MeetingNoteService();
    }
  }

  getService() {
    return this.meetingNoteService;
  }


}

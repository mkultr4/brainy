import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable, of } from 'rxjs';
import { DAILY_MESSAGES_DASHBOARD, DAILY_MESSAGES_PITCH, DAILY_MESSAGES_PITCH_FINALIST, DAILY_MESSAGES_PITCH_DISCARDED } from 'src/app/data/mock-daily-messages';

@Injectable()
export class DailyMessageMockService extends BaseService {
  public messages = [];
  constructor() {
    super();
  }

  proccessRequest(event: string, data: any): Observable<any> {
    return new Observable();
  }

  getDailyMessages(empty = true, messagesKey?) {
    if (!empty) {
      if (messagesKey === 'pitch') {
        this.messages = DAILY_MESSAGES_PITCH;
      } else if (messagesKey === 'pitch-finalist') {
        this.messages = DAILY_MESSAGES_PITCH_FINALIST;
      } else if (messagesKey === 'pitch-discarded') {
        this.messages = DAILY_MESSAGES_PITCH_DISCARDED;
      } else {
        this.messages = DAILY_MESSAGES_DASHBOARD;
      }
    } else {
      this.messages = [];
    }
    return of(this.messages);
  }
}

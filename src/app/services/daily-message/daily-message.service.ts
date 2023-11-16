import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable, of } from 'rxjs';

@Injectable()
export class DailyMessageService extends BaseService {
  public messages = [];
  constructor() {
    super();
  }

  proccessRequest(event: string, data: any): Observable<any> {
    return new Observable();
  }
  getDailyMessages() {
    return of(this.messages);
  }
}

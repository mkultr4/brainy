import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';

@Injectable()
export class NoteService extends BaseService{

  constructor() {
    super();
  }
  proccessRequest(event: string, data: any): Observable<any> {
    return new Observable();
  }

}

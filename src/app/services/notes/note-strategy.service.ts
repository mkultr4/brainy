import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { environment } from 'src/environments/environment';
import { NoteMockService } from './note-mock.service';
import { NoteService } from './note.service';

@Injectable()
export class NoteStrategyService {
  noteService: BaseService;

  constructor(
  ) {
    if (environment.envName === 'design') {
      this.noteService = new NoteMockService();
    } else {
      this.noteService = new NoteService();
    }
  }

  getService() {
    return this.noteService;
  }


}

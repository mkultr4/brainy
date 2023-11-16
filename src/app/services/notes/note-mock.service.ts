import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Note } from 'src/app/models/notes/note';
import { NOTES } from 'src/app/data/mock-notes';
import { NoteReminder } from 'src/app/models/notes/note-reminder';
import { User } from 'src/app/models/users/user';
import * as uuid from 'uuid/v4';
@Injectable()
export class NoteMockService extends BaseService {
  // Notes
  private _notes: BehaviorSubject<Note[]>;
  public notes: Observable<Note[]>
  private dataStore;
  // Constructor
  constructor() {
    super();
    this._notes = new BehaviorSubject(new Array<Note>());
    this.notes = this._notes.asObservable();
    this.dataStore = { notes: [] };
  }
  proccessRequest(event: string, data: any): Observable<any> {
    return new Observable();
  }

  // Load all
  loadAll(empty?) {
    const observable = new Observable(observer => {
      if(empty){
        this.dataStore.notes =[];
      }else{
        this.dataStore.notes = Object.assign([], NOTES);
      }
      
      this._notes.next(Object.assign({}, this.dataStore).notes);
      observer.next(this.dataStore.notes);
    });
    return observable;
  }

  /**
   * Create a note
   * @param note 
   */
  create(note: Note) {
    const observable = new Observable(observer => {
      note.id = uuid();
      note.created = new Date();
      note.modified = new Date();
      this.dataStore.notes.push(note);
      this._notes.next(Object.assign([], this.dataStore).notes);
      observer.next(note);
    });
    return observable;

  }
  /**
   * Update note
   * @param note 
   */
  update(note: Note) {
    const observable = new Observable(observer => {
      let itemEdit;
      this.dataStore.notes.forEach((n, i) => {
        if (n.id === note.id) {
          note.modified = new Date();
          this.dataStore.notes[i] = note;
          itemEdit = this.dataStore.notes[i];
        }
      });
      this._notes.next(Object.assign({}, this.dataStore).notes);
      observer.next(note);
    });
    return observable;

  }
  /**
   * Remove note
   * @param note 
   */
  remove(note: Note) {
    const observable = new Observable(observer => {
      this.dataStore.notes.forEach((n, i) => {
        if (n.id === note.id) { this.dataStore.notes.splice(i, 1); }
      });
      this._notes.next(Object.assign([], this.dataStore).notes);
      observer.next(note);
    });
    return observable;


  }

  //Reminders
  /**
   * Add reminder
   * @param note 
   * @param reminder 
   */
  addReminder(note: Note, reminder: NoteReminder) {
    const observable = new Observable(observer => {
      this.dataStore.notes.forEach((n, i) => {
        reminder.id = uuid();
        if (n.id === note.id) {
          this.dataStore.notes[i].reminders.push(reminder)
        }
      });
      this._notes.next(Object.assign({}, this.dataStore).notes);
      observer.next(reminder);
    });
    return observable;
  }
  /**
   * Update reminder
   * @param note 
   * @param reminder 
   */
  updateReminder(note: Note, reminder: NoteReminder) {
    const observable = new Observable(observer => {
      this.dataStore.notes.forEach((n, i) => {

        if (n.id === note.id) {
          this.dataStore.notes[i].reminders.forEach((r, y) => {
            if (r.id === reminder.id) {
              this.dataStore.notes[i].reminders[y] = reminder;
            }
          })

        }
      });
      this._notes.next(Object.assign({}, this.dataStore).notes);
      observer.next(reminder);
    });
    return observable;
  }
  /**
   * Remove reminder
   * @param note 
   * @param reminder 
   */
  removeReminder(note: Note, reminder: NoteReminder) {
    const observable = new Observable(observer => {
      this.dataStore.notes.forEach((n, i) => {

        if (n.id === note.id) {
          this.dataStore.notes[i].reminders.forEach((r, y) => {
            if (r.id === reminder.id) {
              this.dataStore.notes[i].reminders.splice(y, 1);
            }
          })

        }
      });
      this._notes.next(Object.assign([], this.dataStore).notes);
      observer.next(reminder);
    });
    return observable;
  }

  /**
  * Share
  * @param note 
  */
  share(note: Note, userList: Array<User>) {
    this.dataStore.notes.forEach((n, i) => {

      if (n.id === note.id) { this.dataStore.notes[i].users = this.dataStore.notes[i].users.concat(userList); }
    });
    this._notes.next(Object.assign({}, this.dataStore).notes);
  }

}

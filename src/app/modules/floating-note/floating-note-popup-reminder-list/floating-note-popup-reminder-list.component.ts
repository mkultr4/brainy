import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NoteReminder } from 'src/app/models/notes/note-reminder';
import { User } from 'src/app/models/users/user';
import { Note } from 'src/app/models/notes/note';
import { TIMEPICKER_CONFIG, DATEPICKER_CONFIG } from 'src/app/config/app.config';
import { NoteStrategyService } from 'src/app/services/notes/note-strategy.service';
import PerfectScrollbar from 'perfect-scrollbar';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-floating-note-popup-reminder-list',
  templateUrl: './floating-note-popup-reminder-list.component.html',
  styleUrls: ['./floating-note-popup-reminder-list.component.scss']
})
export class FloatingNotePopupReminderListComponent implements OnInit {

  public noteReminder: NoteReminder = new NoteReminder();
  public addAction: boolean = false;
  public notificationTypes = [
    'minutes', 'hours', 'days'
  ]
  public isShowDeleteAlert = false;
  //Date
  public datePickerOptions: any = Object.assign({}, DATEPICKER_CONFIG);
  public timePickerOptions: any = Object.assign({}, TIMEPICKER_CONFIG);
  // Services
  private _noteService;
  // Inputs
  @Input() note: Note;
  @Input() currentUser: User;
  @Input() reminderToDelete: NoteReminder;
  //Event on reminders is empty go to edit note
  @Output() onRemindersEmpty = new EventEmitter();
  //Event when edit note reminder
  @Output() onEditNoteReminder = new EventEmitter();
  // Viewchild
  @ViewChild('scroll', { read: PerfectScrollbarDirective }) scroll: PerfectScrollbarDirective;
  // Constructor
  constructor(
    private _noteStrategyService: NoteStrategyService) {
    // Services
    this._noteService = this._noteStrategyService.getService();
    // Pickers
    this.timePickerOptions.twelvehour = false;
    this.timePickerOptions.ampmclickable = true;
    this.datePickerOptions.min = new Date();
    this.timePickerOptions.min = new Date();

  }

  ngOnInit() {
  }
  //Delete init workflow
  delete(reminder: NoteReminder) {
    this.isShowDeleteAlert = true;
    this.reminderToDelete = reminder;
  }
  //Accept Delete
  acceptDelete() {
    this._noteService.removeReminder(this.note, this.reminderToDelete).subscribe(note => {
      const index = this.note.reminders.findIndex(r => r.id === this.reminderToDelete.id);
      this.note.reminders.splice(index, 1);
      this.isShowDeleteAlert = false;
      setTimeout(() => {

        this.scroll.update();

        if (this.note.reminders.length === 0) {
          this.onRemindersEmpty.emit(this.note);
        }
      });
    });

  }

  //Cancel delete
  cancelDelete() {
    this.isShowDeleteAlert = false;
  }

  //Edit note reminder
  editReminder(noteReminder: NoteReminder) {
    this.onEditNoteReminder.emit(noteReminder);
  }
  //Add new reminder
  newReminder() {
    this.noteReminder = new NoteReminder();
    this.addAction = true;
    setTimeout(() => {
      this.scroll.update();
      this.scroll.scrollToBottom();
    })

  }
  onChangeHour($event) {

  }
  /**
 * Set notification type
 * @param type 
 */
  setNotificationType(type: string) {
    this.noteReminder.notificationType = type;
  }
  /**
   * Save new reminder 
   * @param save 
   */
  saveReminder(save: boolean) {
    if (save) {
      this._noteService.addReminder(this.note, Object.assign(new NoteReminder(), this.noteReminder)).subscribe(resp => {
        setTimeout(() => {
          this.scroll.update();
        })
      });
      this.noteReminder = new NoteReminder();
    }
    this.addAction = false;

  }
}

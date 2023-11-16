import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { TIMEPICKER_CONFIG, DATEPICKER_CONFIG } from 'src/app/config/app.config';
import { NoteReminder } from 'src/app/models/notes/note-reminder';
import { User } from 'src/app/models/users/user';
import { Note } from 'src/app/models/notes/note';
import { NoteStrategyService } from 'src/app/services/notes/note-strategy.service';

@Component({
  selector: 'app-floating-note-popup-reminder',
  templateUrl: './floating-note-popup-reminder.component.html',
  styleUrls: ['./floating-note-popup-reminder.component.scss']
})
export class FloatingNotePopupReminderComponent implements OnInit {
  // Public vars

  public notificationTypes = [
    'minutes', 'hours', 'days'
  ];
  //Services
  private _noteService;
  // Inputs
  @Input() noteReminder: NoteReminder = new NoteReminder();
  @Input() currentUser: User;
  @Input() note: Note;
  // Outputs
  @Output() onUpdate = new EventEmitter();
  //Date
  public datePickerOptions: any = Object.assign({}, DATEPICKER_CONFIG);
  public timePickerOptions: any = Object.assign({}, TIMEPICKER_CONFIG);


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
   * Save a reminder
   */
  createReminder() {
    this._noteService.addReminder(this.note, this.noteReminder).subscribe();
    this.onUpdate.emit();
  }
  /**
   * On update reminder
   * @param isUpdate 
   */
  updateReminder(isUpdate: boolean) {
    if (isUpdate) {
      this._noteService.updateReminder(this.note, this.noteReminder).subscribe();
    }
    this.onUpdate.emit();
  }

}

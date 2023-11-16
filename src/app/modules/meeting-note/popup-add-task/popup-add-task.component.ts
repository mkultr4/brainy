import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/models/meeting-note/task';
import { TIMEPICKER_CONFIG, DATEPICKER_CONFIG } from 'src/app/config/app.config';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { ModalFloatingComponent } from '../../shared/modal-floating/modal-floating.component';
import { MeetingNote } from 'src/app/models/meeting-note/meeting-note';
import { Topic } from 'src/app/models/meeting-note/topic';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';
import * as uuid from 'uuid/v4';

@Component({
  selector: 'app-popup-add-task',
  templateUrl: './popup-add-task.component.html',
  styleUrls: ['./popup-add-task.component.scss']
})
export class PopupAddTaskComponent implements OnInit, OnChanges {
  // Public vars
  public task: Task = new Task();
  public datePickerOptions: any = Object.assign({}, DATEPICKER_CONFIG);
  public timePickerOptions: any = Object.assign({}, TIMEPICKER_CONFIG);
  public disableClosePicker = true;

  // Inputs
  @Input() meetingNote: MeetingNote;
  @Input() topicShow: Topic;
  @Input() popupId;
  @Input() popupBtnId;
  @Input() workspaceAccess: WorkspaceAccess;
  // Output
  @Output() popupOnAddTask = new EventEmitter();
  // View childs
  @ViewChild('popupAddTask') popupAddTask: ModalFloatingComponent;
  @ViewChild('addTaskForm') addTaskForm: NgForm;

  constructor(

  ) {

    // Date picker
    this.datePickerOptions.container = 'body';
    this.datePickerOptions.format = 'dd/mm/yy';
    this.datePickerOptions.min = new Date();

    // Time picker
    this.timePickerOptions.container = 'body';
    this.timePickerOptions.twelvehour = true;


  }
  // Init
  ngOnInit() {
  }
  // On change
  ngOnChanges(changes: SimpleChanges) {
    if (changes.meetingNote && changes.meetingNote.currentValue) {
      if (this.meetingNote.meetingNoteType.key === 'scheduled') {
        const dateMax= moment(this.meetingNote.date).toDate();
        this.datePickerOptions.max = dateMax;
      }
    }
  }
  // Change hour
  changeHour(hourA) {
    // console.log(hour);
    let hour = hourA.substring(0, 5)
    var amPm = hourA.substring(5, 7);
    setTimeout(() => {
      this.task.hour = hour + ' ' + amPm.toLowerCase();
    });
  }
  // On hide popup
  onHide() {
    this.task = new Task();
    this.task.hour = '';
    this.task.date = '';
  }
  // Cancel
  cancel() {
    this.popupAddTask.hideModal();
  }
  isValid() {
    return this.addTaskForm.valid && this.task.responsible;
  }
  // Create
  create() {
    // this.task.reference = this.meetingNote.meetingNoteType.key;
    this.task.id = uuid();
    this.task.idTopic = this.topicShow.id;
    this.task.type = this.meetingNote.meetingNoteType.key;
    this.task.timestamp = moment(this.task.date + ' ' + this.task.hour).toDate();
    this.popupOnAddTask.emit(Object.assign({}, this.task));
    this.popupAddTask.hideModal();
  }


}

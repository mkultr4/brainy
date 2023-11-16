import { Component, OnInit, ViewChild, OnDestroy, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { MzModalComponent } from 'ngx-materialize';
import { TIMEPICKER_CONFIG, DATEPICKER_CONFIG } from 'src/app/config/app.config';
import { MeetingNoteStrategyService } from 'src/app/services/meeting-note/meeting-note-strategy.service';
import { MeetingNoteWorkflowService } from '../services/meeting-note-workflow.service';
import { ISubscription } from 'rxjs/Subscription';
import { NgForm } from '@angular/forms';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { ToastrService } from 'ngx-toastr';
import { TopicLineItem } from 'src/app/models/meeting-note/topic-line-item';
import * as moment from 'moment';
import { MeetingNote } from 'src/app/models/meeting-note/meeting-note';
@Component({
  selector: 'app-modal-task-edit',
  templateUrl: './modal-task-edit.component.html',
  styleUrls: ['./modal-task-edit.component.scss']
})
export class ModalTaskEditComponent implements OnInit,OnChanges, OnDestroy {
  public topicLineItem = undefined;
  public task = undefined;
  public datePickerOptions: any = Object.assign({}, DATEPICKER_CONFIG);
  public timePickerOptions: any = Object.assign({}, TIMEPICKER_CONFIG);
  public btnDisabled = false;
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: true,
    ready: () => {

    },
    complete: () => {
      this.topicLineItem = undefined;
      this.task = undefined;
      this.btnDisabled = false;
    }
  };
  // Services 
  private _meetingNoteService;
  // Subscriptions
  public subscriptionShow: ISubscription;
  // Input
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() meetingNote: MeetingNote;
  // Output 
  @Output() modalTaskOnUpdate = new EventEmitter();
  // View child
  @ViewChild('modal') public modal: MzModalComponent;
  @ViewChild('addTaskForm') addTaskForm: NgForm;
  constructor(
    private _meetingNoteStrategyService: MeetingNoteStrategyService,
    private _meetingNoteWorkflowService: MeetingNoteWorkflowService,
    private _toastrService: ToastrService
  ) {
    // Services
    this._meetingNoteService = this._meetingNoteStrategyService.getService();
    // Date picker
    this.datePickerOptions.container = 'body';
    this.datePickerOptions.format = 'dd/mm/yy';
    this.datePickerOptions.min = new Date();
    // Time picker
    this.timePickerOptions.container = 'body';
    this.timePickerOptions.twelvehour = true;
  }

  ngOnInit() {
    this._meetingNoteWorkflowService.editTask.subscribe((topicLineItem: TopicLineItem) => {
      console.log(topicLineItem);
      this.topicLineItem = Object.assign({}, topicLineItem);
      this.task = Object.assign({}, topicLineItem.content.task);
      if (topicLineItem) {
        this.openModal();
      }
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.meetingNote && changes.meetingNote.currentValue){
      if (this.meetingNote.meetingNoteType.key === 'scheduled') {
        const dateMax= moment(this.meetingNote.date).toDate();
        this.datePickerOptions.max = dateMax;
      }
    }
  }
  openModal() {
    this.modal.openModal();
  }
  changeHour(hourA) {
    // console.log(hour);
    let hour = hourA.substring(0, 5)
    var amPm = hourA.substring(5, 7);
    setTimeout(() => {
      this.task.hour = hour + ' ' + amPm.toLowerCase();
    });
  }

  // Cancel
  cancel() {
    this.modal.closeModal();
  }

  updateTask() {
    this.btnDisabled = true;
    this.task.timestamp = moment(this.task.date + ' ' + this.task.hour).toDate();
    this.topicLineItem.content.task = this.task;
    this._meetingNoteService.updateTopicTask(this.topicLineItem.idTopic, this.topicLineItem).subscribe(response => {
      this.btnDisabled = false;
      this.modal.closeModal();
      this._toastrService.info('Tarea actualizada correctamente');
      this.modalTaskOnUpdate.emit(response);
    })
  }
  ngOnDestroy() {
    if (this.subscriptionShow) {
      this.subscriptionShow.unsubscribe();
    }
  }

}

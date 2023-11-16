import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { MzModalComponent } from 'ngx-materialize';
import { CoreStrategyService } from 'src/app/services/cores/core-strategy.service';
import { MeetingNote } from 'src/app/models/meeting-note/meeting-note';
import { TIMEPICKER_CONFIG, DATEPICKER_CONFIG } from 'src/app/config/app.config';
import { UtilService } from 'src/app/services/utils/util.service';
import { NgForm } from '@angular/forms';
import { MeetingNoteStrategyService } from 'src/app/services/meeting-note/meeting-note-strategy.service';

@Component({
  selector: 'app-modal-approve-topics-pending',
  templateUrl: './modal-approve-topics-pending.component.html',
  styleUrls: ['./modal-approve-topics-pending.component.scss']
})
export class ModalApproveTopicsPendingComponent implements OnInit {
  public nextMeeting: MeetingNote = new MeetingNote();
  public topicsPending = [];
  public durationTimes = []
  public approving = false;
  public scheduled = false;
  public scheduling = false;
  public datePickerOptions: any = Object.assign({}, DATEPICKER_CONFIG);
  public timePickerOptions: any = Object.assign({}, TIMEPICKER_CONFIG);
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: false,
    complete: () => {
      this.topicsPending = [];
      this.nextMeeting = new MeetingNote();
      this.scheduled = false;
      this.scheduling = true;
    }
  };
  // Services
  private _coreService;
  private _meetingNoteService;
  // Input
  @Input() core;
  // Output
  @Output() modalOnApprove = new EventEmitter();
  @Output() modalOnScheduled = new EventEmitter();
  // View childs
  @ViewChild('modal') public modal: MzModalComponent;
  @ViewChild('programMeetingNoteForm') programMeetingNoteForm: NgForm;
  // Construcyot
  constructor(
    private _coreStrategyService: CoreStrategyService,
    private _meetingNoteStrategyService: MeetingNoteStrategyService,
    private _utilService: UtilService
    ) {
    // Services
    this._coreService = this._coreStrategyService.getService();
    this._meetingNoteService = this._meetingNoteStrategyService.getService();
    // Times
    this.datePickerOptions.container = 'body';
    this.datePickerOptions.format= 'dd/mm/yy';
    this.datePickerOptions.min = new Date();
    this.durationTimes = this._utilService.getTimeArray(30);
  }

  openModal(topicsPending) {
    this.topicsPending = topicsPending;
    this.modal.openModal();
  }
  ngOnInit() {
  }
  showSchedule() {
    this.scheduled = true;
   //  console.log(this.scheduled);
  }
  // Schedule next meeting
  scheduledNextMeeting() {
    this._meetingNoteService.scheduleNextMeeting(this.topicsPending,[]).subscribe(resp => {
      this.modal.closeModal();
      this.modalOnScheduled.emit()
    });
  }
  approve() {
    this.approving = true;
    this._coreService.approveCore(this.core).subscribe(core => {
      this.approving = false;
      this.modalOnApprove.emit();
      this.modal.closeModal();
    });
  }



}

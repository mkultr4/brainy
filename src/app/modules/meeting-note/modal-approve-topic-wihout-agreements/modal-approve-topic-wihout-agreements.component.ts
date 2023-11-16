import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { MeetingNote } from 'src/app/models/meeting-note/meeting-note';
import { TIMEPICKER_CONFIG, DATEPICKER_CONFIG } from 'src/app/config/app.config';
import { MzModalComponent } from 'ngx-materialize';
import { NgForm } from '@angular/forms';
import { CoreStrategyService } from 'src/app/services/cores/core-strategy.service';
import { MeetingNoteStrategyService } from 'src/app/services/meeting-note/meeting-note-strategy.service';
import { UtilService } from 'src/app/services/utils/util.service';

@Component({
  selector: 'app-modal-approve-topic-wihout-agreements',
  templateUrl: './modal-approve-topic-wihout-agreements.component.html',
  styleUrls: ['./modal-approve-topic-wihout-agreements.component.scss']
})
export class ModalApproveTopicWihoutAgreementsComponent implements OnInit {
  public nextMeeting: MeetingNote = new MeetingNote();
  public option = '';
  public topicsWithoutAgreements = [];
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
      this.topicsWithoutAgreements = [];
      this.nextMeeting = new MeetingNote();
      this.scheduled = false;
      this.scheduling = true;
      this.option = '';
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
    this.datePickerOptions.format = 'dd/mm/yy';
    this.datePickerOptions.min = new Date();
    this.durationTimes = this._utilService.getTimeArray(30);
  }

  openModal(topicsWithoutAgreements) {
    this.topicsWithoutAgreements = topicsWithoutAgreements;
    console.log(this.topicsWithoutAgreements);
    this.modal.openModal();
  }
  closeModal(){
    this.modal.closeModal();
  }
  ngOnInit() {
  }
  // Select option
  onChangeOption(option, $event){
    console.log(option,$event);
    if($event.target.checked){
      this.option = option;
    }else{
      this.option = '';
    }
  }
  showSchedule() {
    this.scheduled = true;
    //  console.log(this.scheduled);
  }
  continue(){
    if(this.option === 'scheduled'){
      this.showSchedule();
    }
    else if(this.option === 'approve'){
      this.approve();
    }
  }
  // Schedule next meeting
  scheduledNextMeeting() {
    this._meetingNoteService.scheduleNextMeeting([], this.topicsWithoutAgreements).subscribe(resp => {
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

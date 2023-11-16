import { Component, OnInit, Output, Input, ViewChild, EventEmitter } from '@angular/core';
import { Core } from '../../../models/cores/core';
import { MzModalComponent } from 'ngx-materialize';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';
import { TIMEPICKER_CONFIG, DATEPICKER_CONFIG } from '../../../config/app.config';
import { UtilService } from '../../../services/utils/util.service';
import { MeetingNoteStrategyService } from '../../../services/meeting-note/meeting-note-strategy.service';
import { MeetingNote } from '../../../models/meeting-note/meeting-note';

@Component({
  selector: 'app-modal-cancel-meeting-note',
  templateUrl: './modal-cancel-meeting-note.component.html',
  styleUrls: ['./modal-cancel-meeting-note.component.scss']
})
export class ModalCancelMeetingNoteComponent implements OnInit {
  // Publics
  public canceling = false;
  public programming = false;
  public view = 'cancel';
  public durationTimes = [];
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: false,
    ready: (modal, trigger) => { },
    complete: () => {
      this.view = 'cancel';
      this.canceling = false;
      this.programming = false;
    }
  };
  public datePickerOptions: any = Object.assign({}, DATEPICKER_CONFIG);
  public timePickerOptions: any = Object.assign({}, TIMEPICKER_CONFIG);
  // Services
  private _coreService;
  private _meetingNoteService;
  // Inputs
  @Input() meetingNote: MeetingNote;
  // Output
  @Output() modalOnCancel = new EventEmitter();
  @Output() modalOnProgram = new EventEmitter();
  // View childs
  @ViewChild('modal') public modal: MzModalComponent;
  constructor(
    private _coreStrategyService: CoreStrategyService,
    private _utilService: UtilService,
    private _meetingNoteStrategyService: MeetingNoteStrategyService
  ) {
    this._coreService = this._coreStrategyService.getService();
    this.datePickerOptions.container = 'body';
    this.datePickerOptions.format= 'dd/mm/yy';
    this.datePickerOptions.min = new Date();
    this.durationTimes = this._utilService.getTimeArray(30);
    this._meetingNoteService = this._meetingNoteStrategyService.getService();
  }

  ngOnInit() {
  }
  // Open modal
  openModal(meetingNote?: Core) {
    if (meetingNote) {
      this.meetingNote = Object.assign({},<MeetingNote>meetingNote);
      this.meetingNote.date = undefined;
      this.meetingNote.hour = undefined;
      this.meetingNote.duration = undefined;
      this.meetingNote.place = '';
    }
    this.modal.openModal();
  }
  // change view
  setView(view) {
    this.view = view;
  }
  // Cancel meeting note
  cancel() {
    this.canceling = true;
    this._coreService.cancelCore(this.meetingNote).subscribe(core => {
      this.canceling = false;
      this.modalOnCancel.emit();
      this.modal.closeModal();
    });
  }
  // Program meeting note
  program() {
    this.programming = true;
    this._meetingNoteService.program(this.meetingNote).subscribe(() => {
      this.programming = false;
      this.modalOnProgram.emit(this.meetingNote);
      this.modal.closeModal();
    });
  }

}

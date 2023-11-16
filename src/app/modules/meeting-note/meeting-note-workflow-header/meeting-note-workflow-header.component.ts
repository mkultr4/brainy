import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter, HostListener } from '@angular/core';
import { Core } from 'src/app/models/cores/core';
import { CoreStatus } from 'src/app/models/cores/core-status';
import { CoreStrategyService } from 'src/app/services/cores/core-strategy.service';
import { TIMEPICKER_CONFIG, DATEPICKER_CONFIG } from 'src/app/config/app.config';
import { MeetingNote } from 'src/app/models/meeting-note/meeting-note';
import { MeetingNoteStrategyService } from 'src/app/services/meeting-note/meeting-note-strategy.service';

@Component({
  selector: 'app-meeting-note-workflow-header',
  templateUrl: './meeting-note-workflow-header.component.html',
  styleUrls: ['./meeting-note-workflow-header.component.scss']
})
export class MeetingNoteWorkflowHeaderComponent implements OnInit {
  // Public vars
  public headerEditable = false;
  public editingTitle = false;
  public editingDate = false;
  public editingHour = false;
  public editingPlace = false;
  public datePickerOptions: any = Object.assign({}, DATEPICKER_CONFIG);
  public timePickerOptions: any = Object.assign({}, TIMEPICKER_CONFIG);
  // Services
  private _coreService;
  private _meetingNoteService;
  // Inputs
  @Input() core: MeetingNote;
  @Input() coreInfo: string;
  @Input() coreStatuses: CoreStatus[];
  @Input() editable = false;
  @Input() canApprove = false;
  @Input() shareAndApprove = false;
  // View childs
  @ViewChild('workflowTitle') workflowTitle: ElementRef;
  @ViewChild('inputDate') inputDate: ElementRef;
  @ViewChild('inputHour') inputHour: ElementRef;
  @ViewChild('inputPlace') inputPlace: ElementRef;
  // Outputs
  @Output() workflowOnApprove = new EventEmitter();
  @Output() workflowOnDisapprove = new EventEmitter();
  @Output() workflowOnChangeStatus = new EventEmitter();
  constructor(
    private _coreStrategyService: CoreStrategyService,
    private _meetingNoteStrategyService: MeetingNoteStrategyService
  ) {
    // Services
    this._coreService = this._coreStrategyService.getService();
    this._meetingNoteService = this._meetingNoteStrategyService.getService();
    // Date
    this.datePickerOptions.container = 'body';
    this.datePickerOptions.format = 'dd/mm/yyyy';
    this.datePickerOptions.min = new Date();
    this.datePickerOptions.onClose = () => {
      this.editingDate = false;
    };
    // Time
    this.timePickerOptions.twelvehour = true;
  
    this.timePickerOptions.afterHide = () => {
      this.editingHour = false;
    }
  }

  ngOnInit() {
  }
  // edit title
  editTitle() {
    this.editingTitle = true;
    setTimeout(() => {
      this.workflowTitle.nativeElement.focus();
    }, 0);
  }
  // Focus text last character
  onTextFocus($event) {
    if (!this.headerEditable) {
      const $el = $($event.target),
        el = $event.target;

      // Only focus if input isn't already
      if (!$el.is(':focus')) {
        $el.focus();
      }

      // If this function exists... (IE 9+)
      if (el.setSelectionRange) {

        // Double the length because Opera is inconsistent about whether a carriage return is one character or two.
        const len = el.value.length * 2;

        // Timeout seems to be required for Blink
        setTimeout(function () {
          el.setSelectionRange(len, len);
        }, 1);

      } else {

        // As a fallback, replace the contents with itself
        // Doesn't work in Chrome, but Chrome supports setSelectionRange
        $el.val($el.val());

      }
    }
  }
  // On blur title
  onBlurTitle(title) {
    console.log(event);
    this.editingTitle = false;
    console.log(title);
    this._coreService.updateTitle(this.core.id, title).subscribe((object) => {
    });
  }
  // set status
  setStatus(status) {
    if (status.key !== this.core.status.key) {
      if (status.key === 'approved') {
        this.workflowOnApprove.emit();

      } else if (status.key === 'disapproved') {
        this.workflowOnDisapprove.emit();
      } else {
        this.workflowOnChangeStatus.emit(status);
        this.core.status = status;
        this._coreService.updateStatus(this.core.id, status).subscribe();
      }
    }
  }


  // Workflow header editable
  makeHeaderEditable() {
    this.headerEditable = true;
    this.editTitle();
  }
  // #region Date
  // Edit date
  editDate() {
    this.editingDate = true;
    setTimeout(() => {
      this.inputDate.nativeElement.click();
    });

  }
  changeDate(date) {
    this.editingDate = false;
    this._meetingNoteService.updateScheduledDate(this.core).subscribe((object) => {
    });
  }
  // #endregion

  // #region Hour

  // Edit hour
  editHour() {
    this.editingHour = true;
    setTimeout(() => {
      this.inputHour.nativeElement.click();
    });

  }


  // Change hour
  changeHour(hourA) {
    console.log(hourA);
    let hour = hourA.substring(0, 5)
    var amPm = hourA.substring(5, 7);
    setTimeout(() => {
     //  this.core.hour = hour + ' ' + amPm.toLowerCase();
      this.editingHour = false;
      this._meetingNoteService.updateScheduledDate(this.core).subscribe((object) => {
      });
    });
  }
  // #endregion
  // #region Place
  // Edit place
  editPlace() {
    this.editingPlace = true;
    setTimeout(() => {
      this.inputPlace.nativeElement.focus();
    }, 0);
  }
  // On blur place
  onBlurPlace(place) {
    this.editingPlace = false;
    this._meetingNoteService.updateScheduledDate(this.core).subscribe((object) => {
    });
  }
  // #endregion 
  @HostListener('window:click', ['$event']) onWindowClick(event) {
    const target = $(event.target);

    if (
      target.closest('#make-editable-header').length === 0 &&
      target.closest('.workflow-header-title').length === 0 &&
      target.closest('.workflow-header-info').length === 0 &&
      target.closest('.picker').length === 0 &&
      target.closest('.clockpicker').length === 0
    ) {
      this.headerEditable = false;

    }
  }



}

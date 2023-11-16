import { Component, OnInit, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Core } from '../../../models/cores/core';
import { CoreStatus } from '../../../models/cores/core-status';
import { CoreService } from '../../../services/cores/core.service';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';

@Component({
  selector: 'app-workflow-header',
  templateUrl: './workflow-header.component.html',
  styleUrls: ['./workflow-header.component.scss']
})
export class WorkflowHeaderComponent implements OnInit {
  public editingTitle = false;
  private _coreService;
  // Inputs
  @Input() core: Core;
  @Input() coreInfo: string;
  @Input() coreStatuses: CoreStatus[];
  @Input() editable = false;
  @Input() canApprove = false;
  @Input() shareAndApprove = false;
  // View childs
  @ViewChild('workflowTitle') workflowTitle: ElementRef;
  // Outputs
  @Output() workflowOnApprove = new EventEmitter();
  @Output() workflowOnDisapprove = new EventEmitter();
  @Output() workflowOnChangeStatus = new EventEmitter();
  constructor(
    private _coreStrategyService: CoreStrategyService
  ) {
    this._coreService = _coreStrategyService.getService();
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
  // On focus title
  onTitleFocus($event) {
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
  // On blur title
  onBlurTitle(title) {
    console.log(event);
    this.editingTitle = false;
    console.log(title);
    this._coreService.updateTitle(this.core.id, title).subscribe((object) => {
      console.log(object);
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
}

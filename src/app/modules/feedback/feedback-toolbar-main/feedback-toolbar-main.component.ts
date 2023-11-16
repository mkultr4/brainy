import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';

@Component({
  selector: 'app-feedback-toolbar-main',
  templateUrl: './feedback-toolbar-main.component.html',
  styleUrls: ['./feedback-toolbar-main.component.scss']
})
export class FeedbackToolbarMainComponent implements OnInit {
  // Inputs
  @Input() isAdmin = false;
  @Input() editable = false;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() dropdownId: string;
  @Input() btnId: string;
  @Input() dropdownClass: string;
  @Input() gutter = 0;
  @Input() belowOrigin = false;
  // Outputs
  @Output() toolbarOnEdit = new EventEmitter();
  @Output() toolbarOnDelete = new EventEmitter();
  @Output() toolbarOnCancel = new EventEmitter();
  @Output() toolbarOnDownload = new EventEmitter();
  @Output() toolbarOnSearchComments = new EventEmitter();
  @Output() toolbarOnShowVersions = new EventEmitter();
  @Output() toolbarOnCompare = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  edit() {
    this.toolbarOnEdit.emit();
  }
  delete() {
    this.toolbarOnDelete.emit();
  }
  download() {
    this.toolbarOnDownload.emit();
  }
  searchComments() {
    this.toolbarOnSearchComments.emit();
  }
  compare() {
    this.toolbarOnCompare.emit();
  }
  showVersions() {
    this.toolbarOnShowVersions.emit();
  }
  cancel() {
    this.toolbarOnCancel.emit();
  }
}

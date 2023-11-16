import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';


@Component({
  selector: 'app-brief-toolbar-main',
  templateUrl: './brief-toolbar-main.component.html',
  styleUrls: ['./brief-toolbar-main.component.scss']
})
export class BriefToolbarMainComponent implements OnInit {
  // Inputs
  @Input() isAdmin = false;
  @Input() editable = false;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() dropdownId: string;
  @Input() btnId: string;
  @Input() dropdownClass: string;
  @Input() gutter = 0;
  @Input() belowOrigin = false;
  @Input() template = false;

  // Outputs
  @Output() toolbarOnEdit = new EventEmitter();
  @Output() toolbarOnDelete = new EventEmitter();
  @Output() toolbarOnCancel = new EventEmitter();
  @Output() toolbarOnDownload = new EventEmitter();
  @Output() toolbarOnSearchComments = new EventEmitter();
  

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
  

  cancel() {
    this.toolbarOnCancel.emit();
  }

}

import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';

@Component({
  selector: 'app-brief-presentation-toolbar-main',
  templateUrl: './brief-presentation-toolbar-main.component.html',
  styleUrls: ['./brief-presentation-toolbar-main.component.scss']
})
export class BriefPresentationToolbarMainComponent implements OnInit {
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
  @Output() toolbarOnDownload = new EventEmitter();
  // Constructor
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
}

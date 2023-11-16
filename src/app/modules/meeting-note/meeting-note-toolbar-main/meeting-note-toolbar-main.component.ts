import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { MeetingNote } from '../../../models/meeting-note/meeting-note';

@Component({
  selector: 'app-meeting-note-toolbar-main',
  templateUrl: './meeting-note-toolbar-main.component.html',
  styleUrls: ['./meeting-note-toolbar-main.component.scss']
})
export class MeetingNoteToolbarMainComponent implements OnInit {
  @Input() meetingNote: MeetingNote;
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
  @Output() toolbarOnResume = new EventEmitter();

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

  resume(){
    this.toolbarOnResume.emit();
  }
}

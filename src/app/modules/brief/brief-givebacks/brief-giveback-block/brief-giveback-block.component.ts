import { Component, OnInit, Input, Output, EventEmitter, Host, HostListener } from '@angular/core';
import { Giveback } from 'src/app/models/brief/giveback';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';


@Component({
  selector: 'app-brief-giveback-block',
  templateUrl: './brief-giveback-block.component.html',
  styleUrls: ['./brief-giveback-block.component.scss'],
  host: {
    'class': 'brief-giveback-block'
  }
})
export class BriefGivebackBlockComponent implements OnInit {
  // Inputs
  @Input() giveback: Giveback;
  @Input() workspaceAccess: WorkspaceAccess;
  // Outputs
  @Output() onDeleteGiveback = new EventEmitter();
  @Output() onEditGiveback = new EventEmitter();
  @Output() onReplyGiveback = new EventEmitter();
  @Output() onDeleteReplyGiveback = new EventEmitter();
  @Output() onGoToQuestion = new EventEmitter();
  // Contructor
  constructor() { }
  // Init
  ngOnInit() {
  }
  // Delete
  delete() {
    this.onDeleteGiveback.emit(this.giveback);
  }
  // Edut
  edit() {
    this.onEditGiveback.emit(this.giveback);
  }

  replyGiveback() {
    this.onReplyGiveback.emit(this.giveback);
  }
  editReply() {
    this.onEditGiveback.emit(this.giveback);
  }
  deleteReply() {
    this.onDeleteReplyGiveback.emit(this.giveback);
  }

  goToQuestion() {
    this.onGoToQuestion.emit(this.giveback);
  }

}

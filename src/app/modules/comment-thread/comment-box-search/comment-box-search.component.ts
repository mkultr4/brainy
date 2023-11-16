import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { CommentThreadMessage } from '../../../models/comments/comment-thread-message';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';

@Component({
  selector: 'app-comment-box-search,[app-comment-box-search]',
  templateUrl: './comment-box-search.component.html',
  styleUrls: ['./comment-box-search.component.scss']
})
export class CommentBoxSearchComponent implements OnInit {
  // Output
  public today;
  public yesterday;
  public dateFormat;
  // Input
  @Input() comment: CommentThreadMessage = new CommentThreadMessage();
  @Input() currentUser;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() index;
  @Input() filter: string;
  // Output
  @Output() commentOnGo = new EventEmitter();
  constructor() {

    const today = moment().format('YYYY-M-DD')
    this.today = today;

    const yesterday = moment().subtract(1, 'days').format('YYYY-M-DD');
    this.yesterday = yesterday;




  }

  ngOnInit() {
    this.dateFormat = moment(this.comment.timestamp).format('YYYY-M-DD');
  }
  goTomeComment(){
    this.commentOnGo.emit(this.comment.commentThread);
  }
}

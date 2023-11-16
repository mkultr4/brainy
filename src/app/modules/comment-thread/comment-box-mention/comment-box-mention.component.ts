import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommentThreadMessage } from '../../../models/comments/comment-thread-message';


@Component({
  selector: 'app-comment-box-mention,[app-comment-box-mention]',
  templateUrl: './comment-box-mention.component.html',
  styleUrls: ['./comment-box-mention.component.scss']
})
export class CommentBoxMentionComponent implements OnInit {
  // Inputs
  public fileText = 'file-text';
  public file = 'file';
  @Input() showClose = false;
  @Input() enabledHover = false;
  @Input() comment: CommentThreadMessage;
  // Outputs
  @Output() mentionOnRemove = new EventEmitter();
  @Output() mentionOnScrollToComment = new EventEmitter();
  constructor() {
  }

  ngOnInit() {
  }
  remove($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.mentionOnRemove.emit();
  }
  goToComment() {
    this.mentionOnScrollToComment.emit(this.comment);
  }
}

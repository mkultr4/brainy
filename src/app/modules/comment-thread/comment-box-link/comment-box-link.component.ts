import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CommentLink } from '../../../models/comments/comment-link';

@Component({
  selector: 'app-comment-box-link',
  templateUrl: './comment-box-link.component.html',
  styleUrls: ['./comment-box-link.component.scss']
})
export class CommentBoxLinkComponent implements OnInit {
  // Inputs
  @Input() commentLink: CommentLink;
  @Input() showClose = false;
  // Outputs
  @Output() linkOnRemove = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  remove($event) {
    console.log('remove link');
    $event.preventDefault();
    $event.stopPropagation();
    this.linkOnRemove.emit();
  }
}

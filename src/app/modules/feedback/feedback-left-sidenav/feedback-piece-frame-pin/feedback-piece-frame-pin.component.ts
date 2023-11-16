import { Component, OnInit, Input } from '@angular/core';
import { CommentThread } from '../../../../models/comments/comment-thread';


@Component({
  selector: 'app-feedback-piece-frame-pin,[app-feedback-piece-frame-pin]',
  templateUrl: './feedback-piece-frame-pin.component.html',
  styleUrls: ['./feedback-piece-frame-pin.component.scss']
})
export class FeedbackPieceFramePinComponent implements OnInit {
  @Input() commentThread: CommentThread;
  constructor() { }

  ngOnInit() {
  }

}

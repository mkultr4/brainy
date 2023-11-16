import { Component, OnInit, Input } from '@angular/core';
import { CommentThread } from '../../../../models/comments/comment-thread';

@Component({
  selector: 'app-feedback-piece-frame-shape,[app-feedback-piece-frame-shape]',
  templateUrl: './feedback-piece-frame-shape.component.html',
  styleUrls: ['./feedback-piece-frame-shape.component.scss']
})
export class FeedbackPieceFrameShapeComponent implements OnInit {
  @Input() commentThread: CommentThread;
  constructor() { }

  ngOnInit() {
  }

}

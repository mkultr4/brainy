import { Component, OnInit, Input } from '@angular/core';
import { FeedbackWorkflowService } from '../../services/feedback-workflow.service';

@Component({
  selector: 'app-feedback-piece-frame,[app-feedback-piece-frame]',
  templateUrl: './feedback-piece-frame.component.html',
  styleUrls: ['./feedback-piece-frame.component.scss']
})
export class FeedbackPieceFrameComponent implements OnInit {
  @Input() commentThreads: any;
  constructor(private _feedbackWorkflowService: FeedbackWorkflowService) { }

  ngOnInit() {
  }

  seekVideoTo() {
    this._feedbackWorkflowService.setSeekVideo(this.commentThreads[0].timeStart);
  }

}

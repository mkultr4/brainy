import { Component, OnInit, Input } from '@angular/core';
import { Piece } from '../../../../models/feedback/piece';
import { ComparedVersion } from '../../services/feedback-version-comunication.service';
import { FeedbackWorkflowService } from '../../services/feedback-workflow.service';


@Component({
  selector: 'app-feedback-versions-left,[app-feedback-versions-left]',
  templateUrl: './feedback-versions-left.component.html',
  styleUrls: ['./feedback-versions-left.component.scss']
})
export class FeedbackVersionsLeftComponent implements OnInit {
  // Inputs
  @Input() pieceShow: Piece;
  @Input() comparedVersions: Array<ComparedVersion> = new Array<ComparedVersion>();
  @Input() pieces: Array<Piece>;
  @Input() isFeedbackVideo: boolean;
  @Input() compressed: boolean;
  constructor(
    private _feedbackWorkflowService: FeedbackWorkflowService
  ) { }

  ngOnInit() {
  }

  selectPiece(feedbackPiece: Piece) {
    this._feedbackWorkflowService.showPiece(feedbackPiece);
  }

}

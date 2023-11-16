import { Component, OnInit, Input } from '@angular/core';
import { Piece } from '../../../../models/feedback/piece';
import { CommentThread } from '../../../../models/comments/comment-thread';
import { CommentThreadStatus } from '../../../../models/comments/comment-thread-status';
import { ParticipantType } from '../../../../models/participants/participant-type';
import { FeedbackStrategyService } from '../../../../services/feedback/feedback-strategy.service';


@Component({
  selector: 'app-feedback-version-compare-preview,[app-feedback-version-compare-preview]',
  templateUrl: './feedback-version-compare-preview.component.html',
  styleUrls: ['./feedback-version-compare-preview.component.scss']
})
export class FeedbackVersionComparePreviewComponent implements OnInit {
  public _piece: Piece;
  public calculatedWidth = 0;
  public calculatedHeight = 0;
  public boxHeightPreview = 0;
  public boxWidthPreview = 0;
  public commentThreads = new Array<CommentThread>();
  public overflowHidden = false;
  // Services
  private _feedbackService;
  // Input
  @Input() set size(size: any) {
    this.boxHeightPreview = size.boxHeightPreview;
    this.boxWidthPreview = size.boxWidthPreview;
    setTimeout(() => {
      this.calculatePieceRatio();
    });
  }
  @Input() set piece(piece: Piece) {
    this._piece = piece;
    // this.calculatePieceRatio();
    this._feedbackService.findAllCommentThread(this._piece.id).subscribe(commentThreads => {
      this.commentThreads = Object.assign([], commentThreads);
    });
  }
  @Input() filterStatuses: Array<CommentThreadStatus> = new Array<CommentThreadStatus>();
  @Input() filterParticipantTypes: Array<ParticipantType> = new Array<ParticipantType>();
  constructor(
    private _feedbackStrategyService: FeedbackStrategyService
  ) { 
    this._feedbackService = this._feedbackStrategyService.getService();
  }

  ngOnInit() {
  }

  private calculatePieceRatio() {

    const widthRatio = this._piece.setting.naturalWidth / this.boxWidthPreview;
    const heightRatio = this._piece.setting.naturalHeight / this.boxHeightPreview;
    let bestRatio = widthRatio;

    if (heightRatio <= widthRatio) {
      bestRatio = heightRatio;
    }
    this.calculatedWidth = this._piece.setting.naturalWidth / bestRatio;
    this.calculatedHeight = this._piece.setting.naturalHeight / bestRatio;
    


  }

}

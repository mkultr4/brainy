import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ComparedVersion, FeedbackVersionComunicationService } from '../../services/feedback-version-comunication.service';
import { ParticipantType } from '../../../../models/participants/participant-type';
import { CommentThreadStatus } from '../../../../models/comments/comment-thread-status';
import { Piece } from '../../../../models/feedback/piece';


@Component({
  selector: 'app-feedback-versions-compare-chooser-main,[app-feedback-versions-compare-chooser-main]',
  templateUrl: './feedback-versions-compare-chooser-main.component.html',
  styleUrls: ['./feedback-versions-compare-chooser-main.component.scss']
})
export class FeedbackVersionsCompareChooserMainComponent implements OnInit {
  @Input() leftSidenavCompressed: boolean;
  @Input() comparedVersions: ComparedVersion[];
  @Input() boxHeight: number;
  @Input() boxWidth: number;
  @Input() filterStatuses = new Array<CommentThreadStatus>();
  @Input() filterParticipantTypes = new Array<ParticipantType>();

  @Output() onCompare = new EventEmitter();
  constructor(private _feedbackVersionComunicationService: FeedbackVersionComunicationService) { }

  ngOnInit() {
  }

  onDropPiece($event) {
    const piece = <Piece>$event.piece;
    const compare = <ComparedVersion>$event.compare;
    this._feedbackVersionComunicationService.replaceCompareVersion(piece, compare);
  }
  onRemoveCompare(piece: Piece) {
    this._feedbackVersionComunicationService.removeCompareVersion(piece.id);
  }
  compare() {
    this.onCompare.emit();
  }
}

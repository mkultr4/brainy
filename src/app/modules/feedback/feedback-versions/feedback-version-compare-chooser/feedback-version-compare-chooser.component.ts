import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DndDropEvent } from 'ngx-drag-drop';
import { ComparedVersion } from '../../services/feedback-version-comunication.service';
import { CommentThreadStatus } from '../../../../models/comments/comment-thread-status';
import { ParticipantType } from '../../../../models/participants/participant-type';
import { Piece } from '../../../../models/feedback/piece';



@Component({
  selector: 'app-feedback-version-compare-chooser,[app-feedback-version-compare-chooser]',
  templateUrl: './feedback-version-compare-chooser.component.html',
  styleUrls: ['./feedback-version-compare-chooser.component.scss']
})
export class FeedbackVersionCompareChooserComponent implements OnInit {
  // Input
  @Input() invested = false;
  @Input() compare: ComparedVersion;
  @Input() boxHeight: number;
  @Input() boxWidth: number;
  @Input() filterStatuses: Array<CommentThreadStatus> = new Array<CommentThreadStatus>();
  @Input() filterParticipantTypes: Array<ParticipantType> = new Array<ParticipantType>();
  // Outputs
  @Output() onDropPiece = new EventEmitter();
  @Output() onRemoveCompare = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  onDrop($event: DndDropEvent) {
    const feedbackPiece = <Piece>$event.data;
    feedbackPiece.compared = true;
    this.onDropPiece.emit({ compare: this.compare, piece: feedbackPiece });
  }
  removeCompare() {
    this.onRemoveCompare.emit(this.compare.piece);
  }
  onDragover($event) {

  }
}

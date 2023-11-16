import { Component, OnInit, Input } from '@angular/core';
import { Piece } from '../../../../models/feedback/piece';
import { ParticipantType } from '../../../../models/participants/participant-type';
import { CommentThreadStatus } from '../../../../models/comments/comment-thread-status';


@Component({
  selector: 'app-compare-version-box,[app-compare-version-box]',
  templateUrl: './compare-version-box.component.html',
  styleUrls: ['./compare-version-box.component.scss']
})
export class CompareVersionBoxComponent implements OnInit {
  @Input() piece: Piece;
  @Input() compareBoxHeight: number;
  @Input() compareBoxWidth: number;
  @Input() filterStatuses: Array<CommentThreadStatus> = new Array<CommentThreadStatus>();
  @Input() filterParticipantTypes: Array<ParticipantType> = new Array<ParticipantType>();
  @Input() invested = false;
  constructor() { }

  ngOnInit() {
  }

}


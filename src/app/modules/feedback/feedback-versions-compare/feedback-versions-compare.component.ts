import { Component, OnInit, Input } from '@angular/core';
import { ComparedVersion } from '../services/feedback-version-comunication.service';
import { CommentThreadStatus } from '../../../models/comments/comment-thread-status';
import { ParticipantType } from '../../../models/participants/participant-type';


@Component({
  selector: 'app-feedback-versions-compare,[app-feedback-versions-compare]',
  templateUrl: './feedback-versions-compare.component.html',
  styleUrls: ['./feedback-versions-compare.component.scss']
})
export class FeedbackVersionsCompareComponent implements OnInit {
  @Input() comparedVersions: ComparedVersion[];
  @Input() compareBoxHeight: number;
  @Input() compareBoxWidth: number;
  @Input() filterStatuses: Array<CommentThreadStatus> = new Array<CommentThreadStatus>();
  @Input() filterParticipantTypes: Array<ParticipantType> = new Array<ParticipantType>();
  constructor() { }

  ngOnInit() {
  }
  dragEnd($event) {
    console.log('end', $event);
  }
}

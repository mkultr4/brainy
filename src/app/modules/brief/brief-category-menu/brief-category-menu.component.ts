import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { ParticipantType } from 'src/app/models/participants/participant-type';
import { CommentThreadStatus } from 'src/app/models/comments/comment-thread-status';
import { ISubscription } from 'rxjs/Subscription';
import { CoreWorkflowService } from '../../shared-core/services/core-workflow.service';
@Component({
  selector: 'app-brief-category-menu',
  templateUrl: './brief-category-menu.component.html',
  styleUrls: ['./brief-category-menu.component.scss']
})
export class BriefCategoryMenuComponent implements OnInit, AfterContentInit {
  // Public vars
  public isShowMeetingNote = false;
  public isShowFeedback = false;
  // Inputs
  @Input() commentThreadStatuses: CommentThreadStatus[];
  @Input() participantTypes: ParticipantType[];
  // Subscriptions
  public subcriptionListMeetingNote: ISubscription;
  public subcriptionListFeedback: ISubscription;
  constructor(
    private _coreWorkflowService: CoreWorkflowService
  ) { }

  ngOnInit() {
  }
  ngAfterContentInit() {
    this.subcriptionListMeetingNote = this._coreWorkflowService.sidenavListBrief.subscribe(show => {
      this.isShowMeetingNote = show;
    });
    this.subcriptionListFeedback = this._coreWorkflowService.sidenavListFeedback.subscribe(show => {
      this.isShowFeedback = show;
    })

  }
  showListMeetingNote() {
    this._coreWorkflowService.showSidenavListMeetingNote(true);
  }
  showListFeedback() {
    this._coreWorkflowService.showSidenavListFeedback(true);
  }

}

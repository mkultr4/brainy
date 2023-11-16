import { Component, OnInit, Input, OnDestroy, AfterContentInit } from '@angular/core';
import * as uuid from 'uuid/v4';
import { ISubscription } from 'rxjs/Subscription';
import { CommentThreadStatus } from '../../../models/comments/comment-thread-status';
import { CommentComunicationService, CommentThreadFilter } from '../services/comment-comunication.service';
import { ParticipantType } from '../../../models/participants/participant-type';
@Component({
  selector: 'app-modal-comment-thread-filter, [app-modal-comment-thread-filter]',
  templateUrl: './modal-comment-thread-filter.component.html',
  styleUrls: ['./modal-comment-thread-filter.component.scss']
})
export class ModalCommentThreadFilterComponent implements OnInit, AfterContentInit, OnDestroy {
  public id = uuid();
  
  public statusAll = <CommentThreadStatus>{id:'all',key:'all'};
  public subscriptionCommentThreadFilter: ISubscription;
  // Filter
  @Input() commentThreadStatuses: Array<CommentThreadStatus>;
  @Input() participantTypes: Array<ParticipantType>;
  @Input() statusesFilter = [];
  @Input() participantsTypesFilter = [];
  @Input() modalId = 'main-modal-floating-filter';
  @Input() modalBtnId = '#trigger-filter-comments';
  constructor(
    private _commentComunicationService: CommentComunicationService
  ) {


  }

  ngOnInit() {
  }
  ngAfterContentInit() {
    
    this.subscriptionCommentThreadFilter = this._commentComunicationService.commentThreadFilterObs.subscribe(
      (filter: CommentThreadFilter) => {

        this.statusesFilter = Object.assign([], filter.statuses);
        this.participantsTypesFilter = Object.assign([], filter.praticipantTypes);
      });

  }
  // Change Status
  onChangeStatus(option, event) {

    if (event.target.checked) {
      if (option.key === 'all') {
        this.statusesFilter = [];
        this.statusesFilter.push(option);
      } else {
        const all = this.statusesFilter.filter(status => status.key === 'all');
        if (all.length > 0) {
          const indexAll = this.statusesFilter.indexOf(all[0]);
          this.statusesFilter.splice(indexAll, 1);
        }
        this.statusesFilter.push(option);
      }
    } else {
      const index = this.statusesFilter.indexOf(option);
      this.statusesFilter.splice(index, 1);
    }

    const commentThreadFilter: CommentThreadFilter = new CommentThreadFilter();

    commentThreadFilter.statuses = this.statusesFilter;
    commentThreadFilter.praticipantTypes = this.participantsTypesFilter;

    this._commentComunicationService.setCommentThreadFilter(commentThreadFilter);
  }
  // Change Participant
  onChangeParticipant(option, event) {

    if (event.target.checked) {

      if (option.key === 'all') {
        this.participantsTypesFilter = [];
        this.participantsTypesFilter.push(option);
      } else {
        const all = this.participantsTypesFilter.filter(status => status.key === 'all');
        if (all.length > 0) {
          const indexAll = this.participantsTypesFilter.indexOf(all[0]);
          this.participantsTypesFilter.splice(indexAll, 1);
        }
        this.participantsTypesFilter.push(option);
      }

    } else {
      const index = this.participantsTypesFilter.indexOf(option);
      this.participantsTypesFilter.splice(index, 1);
    }

    const commentThreadFilter: CommentThreadFilter = new CommentThreadFilter();

    commentThreadFilter.statuses = this.statusesFilter;
    commentThreadFilter.praticipantTypes = this.participantsTypesFilter;

    this._commentComunicationService.setCommentThreadFilter(commentThreadFilter);
  }
  onHide() {
    const commentThreadFilter: CommentThreadFilter = new CommentThreadFilter();
    commentThreadFilter.statuses = this.statusesFilter;
    commentThreadFilter.praticipantTypes = this.participantsTypesFilter;

    // this._commentComunicationService.setCommentThreadFilter(commentThreadFilter);
  }
  ngOnDestroy() {
    if (this.subscriptionCommentThreadFilter) {
      this.subscriptionCommentThreadFilter.unsubscribe();
    }
  }
}

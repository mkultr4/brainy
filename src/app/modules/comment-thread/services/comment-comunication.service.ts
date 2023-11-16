import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Subject } from 'rxjs/Subject';
import { CommentThread, POINT_SIZE } from '../../../models/comments/comment-thread';
import { User } from '../../../models/users/user';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { CommentThreadStatus } from '../../../models/comments/comment-thread-status';
import { ParticipantType } from '../../../models/participants/participant-type';

export class CommentThreadComunicationInfo {
  commentThread: CommentThread;
  show = false;
  commentsEnabled = true;
  constructor() {
    this.commentThread = new CommentThread();
  }
}
export class CommentThreadPosition {

  public left: number;
  public top: number;

  constructor() {

  }
}
export class CommentThreadPointHover {

  hover = false;
  element: HTMLElement;
  edge: string;
  commentThread: CommentThread;
  // @deprecated
  user: User;
  workspaceAccess: WorkspaceAccess;
  constructor() {

  }
}

export class CommentThreadFilter {
  constructor() { }
  statuses: Array<CommentThreadStatus> = new Array<CommentThreadStatus>();
  praticipantTypes: Array<ParticipantType> = new Array<ParticipantType>();
}
@Injectable()
export class CommentComunicationService {
  // Comunication with point and popup
  private showPopupBehavior$: Subject<CommentThreadComunicationInfo>;
  public showPopupObs: Observable<CommentThreadComunicationInfo>;
  // Update sizing
  private updateCommentThreadSubject: Subject<CommentThread>;
  public updateCommentThreadObs: Observable<CommentThread>;
  // Comunication with point and sidenav
  private showSidenavBehavior$: BehaviorSubject<CommentThreadComunicationInfo>;
  public showSidenavObs: Observable<CommentThreadComunicationInfo>;
  // Hover point
  private hoverCommentThreadPointBehavior$: BehaviorSubject<CommentThreadPointHover>;
  public onHoverCommentThreadPoint: Observable<CommentThreadPointHover>;
  // Delete comment Thread
  private showDeleteModalBehavior$: BehaviorSubject<CommentThreadComunicationInfo>;
  public showDeleteModalObs: Observable<CommentThreadComunicationInfo>;

  // Download comment Thread
  private showDownloadModalBehavior$: BehaviorSubject<CommentThreadComunicationInfo>;
  public showDownloadModalObs: Observable<CommentThreadComunicationInfo>;

  // Filter Comment Thread
  private commentThreadFilterBehavior$: BehaviorSubject<CommentThreadFilter>;
  public commentThreadFilterObs: Observable<CommentThreadFilter>;

  // Got to comment thread
  private _commentGoTo = new Subject<CommentThread>();
  public commentToGo: Observable<CommentThread>;

  constructor() {
    // Popup
    this.showPopupBehavior$ = new BehaviorSubject(new CommentThreadComunicationInfo());
    this.showPopupObs = this.showPopupBehavior$.asObservable();
    // Update sizing
    this.updateCommentThreadSubject = new Subject<CommentThread>();
    this.updateCommentThreadObs = this.updateCommentThreadSubject.asObservable();
    // Sidenav
    this.showSidenavBehavior$ = new BehaviorSubject(new CommentThreadComunicationInfo());
    this.showSidenavObs = this.showSidenavBehavior$.asObservable();
    // Hover
    this.hoverCommentThreadPointBehavior$ = new BehaviorSubject(new CommentThreadPointHover());
    this.onHoverCommentThreadPoint = this.hoverCommentThreadPointBehavior$.asObservable();
    // Delete comment thread
    this.showDeleteModalBehavior$ = new BehaviorSubject(new CommentThreadComunicationInfo());
    this.showDeleteModalObs = this.showDeleteModalBehavior$.asObservable();
    // Delete comment thread
    this.showDownloadModalBehavior$ = new BehaviorSubject(new CommentThreadComunicationInfo());
    this.showDownloadModalObs = this.showDownloadModalBehavior$.asObservable();
    // Filter
    this.commentThreadFilterBehavior$ = new BehaviorSubject(new CommentThreadFilter());
    this.commentThreadFilterObs = this.commentThreadFilterBehavior$.asObservable();
    // Comment to go
    this._commentGoTo = new Subject<CommentThread>();
    this.commentToGo = this._commentGoTo.asObservable();

  }

  showPopup(popupInformation: CommentThreadComunicationInfo) {
    this.showPopupBehavior$.next(Object.assign({}, popupInformation));
  }
  updateCommentThreadSizes(commentThread: CommentThread) {
    this.updateCommentThreadSubject.next(commentThread);
  }
  showSidenav(popupInformation: CommentThreadComunicationInfo) {
    this.showSidenavBehavior$.next(Object.assign({}, popupInformation));
  }
  // User
  hoverCommentThreadPoint(hover: boolean, element?: HTMLElement, edge?: string, commentThread?: CommentThread) {
    const commentThreadPointHover = new CommentThreadPointHover();
    commentThreadPointHover.hover = hover;
    commentThreadPointHover.element = element;
    commentThreadPointHover.edge = edge;
    commentThreadPointHover.commentThread = commentThread;
    this.hoverCommentThreadPointBehavior$.next(commentThreadPointHover);
  }
  // Modal delete
  showModalDelete(popupInformation: CommentThreadComunicationInfo) {
    this.showDeleteModalBehavior$.next(popupInformation);
  }
  // show modal download
  showModalDownload(popupInformation: CommentThreadComunicationInfo) {
    this.showDownloadModalBehavior$.next(popupInformation);
  }
  // Draft
  // Get the position of commenthread of selection draft core
  getPositionDraftDescriptionSelection(commetThreadId: string) {
    // Get the wrapper element selection
    const offsetParent = $('.topic-description-editable').offset();
    const wrapperEl = $('.comment-thread-selection-' + commetThreadId + ':last');
    const wrapperElementOffset = wrapperEl.offset();

    // Point size
    let top = 0;
    let left = 0;

    const textNode = wrapperEl.get(0).firstChild;
    const range = document.createRange();
    range.selectNodeContents(textNode);
    const rects = range.getClientRects();

    if (rects.length > 0) {

      top = rects[rects.length - 1].top - offsetParent.top - (POINT_SIZE.height / 2);
      left = rects[rects.length - 1].right - offsetParent.left - (POINT_SIZE.width / 2);
    } else {
      top = wrapperElementOffset.top - offsetParent.top - (POINT_SIZE.height / 2);
      left = (wrapperElementOffset.left - offsetParent.left) + wrapperEl.width() - (POINT_SIZE.width / 2);
    }
    const commentThreadPosition = new CommentThreadPosition();
    commentThreadPosition.left = left;
    commentThreadPosition.top = top;

    return commentThreadPosition;
  }
  getPositionDraftAgreementSelection(commetThreadId: string) {
    // Get the wrapper element selection
    const offsetParent = $('.agreements-text').offset();
    console.log(offsetParent);
    const wrapperEl = $('.comment-thread-selection-' + commetThreadId + ':last');

    const wrapperElementOffset = wrapperEl.offset();

    // Point size
    let top = 0;
    let left = 0;

    const textNode = wrapperEl.get(0).firstChild;
    const range = document.createRange();
    range.selectNodeContents(textNode);
    const rects = range.getClientRects();
    console.log(rects);
    if (rects.length > 0) {

      top = rects[rects.length - 1].top - offsetParent.top - (POINT_SIZE.height / 2);
      left = rects[rects.length - 1].right - offsetParent.left - (POINT_SIZE.width / 2);
    } else {
      top = wrapperElementOffset.top - offsetParent.top - (POINT_SIZE.height / 2);
      left = (wrapperElementOffset.left - offsetParent.left) + wrapperEl.width() - (POINT_SIZE.width / 2);
    }
    const commentThreadPosition = new CommentThreadPosition();
    commentThreadPosition.left = left;
    commentThreadPosition.top = top;

    return commentThreadPosition;
  }


  setCommentThreadFilter(filter: CommentThreadFilter) {
    this.commentThreadFilterBehavior$.next(Object.assign({}, filter));
  }

  setCommentToGo(commentThread: CommentThread) {
    this._commentGoTo.next(Object.assign({}, commentThread));
  }
}

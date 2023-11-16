import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { CommentThread } from '../../../models/comments/comment-thread';
export class FeedbackToolbarAction {
  type: string;
  args: any;
  constructor();
  constructor(
    type: string,
    args: any);
  constructor(
    type?: string,
    args?: any) {
    this.type = type;
    if (args) {
      this.args = args;
    }
  }
}
export class FeedbackFocusShape {
  focus = false;
  commentThread: CommentThread;
  constructor();
  constructor(
    focus: boolean,
    commentThread: any);
  constructor(
    focus?: boolean,
    args?: any) {
    this.focus = focus;
    if (args) {
      this.commentThread = args;
    }
  }
}

@Injectable()
export class FeedbackToolbarService {

  // Observable string sources
  private focusShape: Subject<FeedbackFocusShape>;
  public focusShape$: Observable<FeedbackFocusShape>;
  // Toolbar action
  private toolbarAction: Subject<FeedbackToolbarAction>;
  public toolbarAction$: Observable<FeedbackToolbarAction>;
  // Piece bigger
  private pieceBigger: Subject<boolean>;
  public pieceBigger$: Observable<boolean>;

  // Constructor
  constructor() {
    // Focus shape
    this.focusShape = new Subject<FeedbackFocusShape>();
    this.focusShape$ = this.focusShape.asObservable();
    // Toolbar action
    this.toolbarAction = new Subject<FeedbackToolbarAction>();
    this.toolbarAction$ = this.toolbarAction.asObservable();
    // Piece bigger
    this.pieceBigger = new Subject<boolean>();
    this.pieceBigger$ = this.pieceBigger.asObservable();

  }
  // On focus Shape
  onFocusShape(focus: FeedbackFocusShape) {
    // console.log('focus', focus);
    this.focusShape.next( focus );
  }
  // Trigger toolbar action
  triggerToolbarAction(feedbackToolbarAction: FeedbackToolbarAction) {
    this.toolbarAction.next(feedbackToolbarAction);
  }

  setPieceBigger(isBigger: boolean) {
    this.pieceBigger.next(isBigger);
  }


}

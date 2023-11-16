import { Component,  OnDestroy, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { User } from '../../../models/users/user';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { CommentThread } from '../../../models/comments/comment-thread';
import { CommentComunicationService, CommentThreadPointHover } from '../services/comment-comunication.service';



@Component({
  selector: 'app-comment-thread-point-popup-user,[app-comment-thread-point-popup-user]',
  templateUrl: './comment-thread-point-popup-user.component.html',
  styleUrls: ['./comment-thread-point-popup-user.component.scss']
})
export class CommentThreadPointPopupUserComponent implements AfterContentInit,OnDestroy {
  // Public vars
  public show = true;
  public left = 0;
  public top = 0;
  public edge = '';
  // @deprecated
  public user: User = undefined;
  public workspaceAccess: WorkspaceAccess = undefined;
  public commentThread: CommentThread = undefined;
  // Subscription
  public subscriptionHoverPoint: ISubscription;
  @ViewChild('popup') popup: ElementRef;
  constructor(private _commentComunicationService: CommentComunicationService) { }

  ngAfterContentInit() {
    this.subscriptionHoverPoint = this._commentComunicationService.
      onHoverCommentThreadPoint.subscribe((commentThreadPointHover: CommentThreadPointHover) => {

        if (commentThreadPointHover.hover) {
          this.showPopup(commentThreadPointHover);
        } else {
          this.hidePopup(commentThreadPointHover);
        }
      });
  }

  posisionated(commentThreadPointHover: CommentThreadPointHover) {
    const rect = commentThreadPointHover.element.getBoundingClientRect();
    const $point = $(commentThreadPointHover.element);
    const $popup = $(this.popup.nativeElement);
    const arrowWidth = 15;
    const top = rect.top + ($point.outerHeight() / 2) - ($popup.outerHeight() / 2);
    let left = 0;
    if (commentThreadPointHover.edge === 'left') {
      left = rect.left - $popup.outerWidth() - arrowWidth;
    } else {
      left = rect.left + $point.outerWidth() + arrowWidth;
    }
    this.left = left; this.top = top;
  }

  showPopup(commentThreadPointHover: CommentThreadPointHover) {

    this.posisionated(commentThreadPointHover);
    this.edge = commentThreadPointHover.edge;
    this.commentThread = commentThreadPointHover.commentThread;
    this.show = true;
  }
  hidePopup(commentThreadPointHover: CommentThreadPointHover) {
    this.show = false;
    this.user = undefined;

  }
  ngOnDestroy() {
    if (this.subscriptionHoverPoint) {
      this.subscriptionHoverPoint.unsubscribe();
    }
  }

}

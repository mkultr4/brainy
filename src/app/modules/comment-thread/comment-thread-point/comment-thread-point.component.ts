import { Component, OnInit, Input, HostListener, ViewChild, ElementRef, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { CommentThread, POINT_SIZE } from '../../../models/comments/comment-thread';
import { CommentThreadStatus } from '../../../models/comments/comment-thread-status';
import { CommentComunicationService, CommentThreadComunicationInfo } from '../services/comment-comunication.service';




@Component({
  selector: 'app-comment-thread-point, [app-comment-thread-point]',
  templateUrl: './comment-thread-point.component.html',
  styleUrls: ['./comment-thread-point.component.scss']
})
export class CommentThreadPointComponent implements OnInit, OnChanges, OnDestroy {

  @Input() commentThread: CommentThread;
  @Input() commentThreadStatus: CommentThreadStatus;
  @Input() hidden = false;
  public closestContainer = '.closest-comment-thread-container';
  @ViewChild('commentThreadPoint') commentThreadPointElement: ElementRef;
  constructor(
    public elementRef: ElementRef,
    private _commentComunicationService: CommentComunicationService
  ) { }

  ngOnInit() {
    if (!this.commentThread.saved) {
      const popupInfo: CommentThreadComunicationInfo = new CommentThreadComunicationInfo();
      popupInfo.commentThread = this.commentThread;
      popupInfo.show = true;
      this._commentComunicationService.showPopup(popupInfo);
    }else{
      const statusToRemove = 'status-in-process status-resolved status-disapproved status-urgent';
      $('.comment-thread-selection-' + this.commentThread.id).removeClass(statusToRemove);
      $('.comment-thread-selection-' + this.commentThread.id).addClass('status-' + this.commentThread.status.key);
    }
  }

  // Change status
  ngOnChanges(changes: SimpleChanges) {
    // console.log(changes);

    if (this.commentThread.event === 'selection') {
      const statusToRemove = 'status-in-process status-resolved status-disapproved status-urgent';
      $('.comment-thread-selection-' + this.commentThread.id).removeClass(statusToRemove);
      $('.comment-thread-selection-' + this.commentThread.id).addClass('status-' + this.commentThread.status.key);
    }

  }
  ngOnDestroy() {
    const selection = $('.comment-thread-selection-' + this.commentThread.id);
    selection.removeClass('active');
    if (!this.commentThread.saved) {
      selection.contents().unwrap();
    }

  }


  showCommentSidebarThread($event) {
    $event.preventDefault();
    $event.stopPropagation();

    const sidenavInformation: CommentThreadComunicationInfo = new CommentThreadComunicationInfo();
    sidenavInformation.commentThread = this.commentThread;
    sidenavInformation.show = true;
    this._commentComunicationService.showSidenav(sidenavInformation);
  }


  @HostListener('mouseover', ['$event']) onMouseOver($event) {
    if (this.commentThread.saved) {
      let edge = 'left';
      const $container = $(this.commentThreadPointElement.nativeElement).closest(this.closestContainer);
      // Define edge
      const widthRight = $container.outerWidth() - this.commentThread.left - POINT_SIZE.width;
      const widthLeft = this.commentThread.left;
      if (widthRight > widthLeft) {
        edge = 'right';
      }

      this._commentComunicationService.
        hoverCommentThreadPoint(true, this.commentThreadPointElement.nativeElement, edge, this.commentThread);
      const selection = $('.comment-thread-selection-' + this.commentThread.id);
      selection.addClass('active');
    }
  }
  @HostListener('mouseout', ['$event']) onMouseOut($event) {
    this._commentComunicationService.hoverCommentThreadPoint(false);
    const selection = $('.comment-thread-selection-' + this.commentThread.id);
    selection.removeClass('active');
  }

}

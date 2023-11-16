import { Component, OnInit, ElementRef, Input, HostListener } from '@angular/core';
import { CommentThreadPointComponent } from 'src/app/modules/comment-thread/comment-thread-point/comment-thread-point.component';
import { MeetingNoteCommentsService } from '../../services/meeting-note-comments.service';
import { CommentThreadStrategyService } from 'src/app/services/comments/comment-thread-strategy.service';
import { CommentComunicationService } from 'src/app/modules/comment-thread/services/comment-comunication.service';
import { POINT_SIZE } from 'src/app/models/comments/comment-thread';

@Component({
  selector: 'app-comment-thread-meeting-note-title',
  templateUrl: './comment-thread-meeting-note-title.component.html',
  styleUrls: ['./comment-thread-meeting-note-title.component.scss']
})
export class CommentThreadMeetingNoteTitleComponent 
extends CommentThreadPointComponent{
  @Input() left = 0;
  @Input() top = 0;
  // Services
  private _commentThreadService;
  private commentComunicationService;
  constructor(
    private _meetingNoteCommentsService: MeetingNoteCommentsService,
    private _commentThreadStrategyService: CommentThreadStrategyService,
    elementRef: ElementRef,
    _commentCosmunicationService: CommentComunicationService
  ) {
    super(elementRef, _commentCosmunicationService);
    this._commentThreadService = this._commentThreadStrategyService.getService();
    this.commentComunicationService = _commentCosmunicationService;
  }

  @HostListener('mouseover', ['$event']) onMouseOver($event) {
    if (this.commentThread.saved) {
      let edge = 'right';
      /*const $container = $(this.commentThreadPointElement.nativeElement).closest(this.closestContainer);
      // Define edge
      const widthRight = $container.outerWidth() - this.commentThread.left - POINT_SIZE.width;
      const widthLeft = this.commentThread.left;
      if (widthRight > widthLeft) {
        edge = 'right';
      }*/

      this.commentComunicationService.
        hoverCommentThreadPoint(true, this.commentThreadPointElement.nativeElement, edge, this.commentThread);
      const selection = $('.comment-thread-selection-' + this.commentThread.id);
      selection.addClass('active');
    }
  }
}

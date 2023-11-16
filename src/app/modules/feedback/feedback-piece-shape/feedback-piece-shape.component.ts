import { Component, OnInit, Input, HostListener, ElementRef, ViewChild } from '@angular/core';
import { CommentThread, POINT_SIZE } from '../../../models/comments/comment-thread';
import { Piece } from '../../../models/feedback/piece';
import { CommentThreadStatus } from '../../../models/comments/comment-thread-status';
import { CommentComunicationService, CommentThreadComunicationInfo } from '../../comment-thread/services/comment-comunication.service';


@Component({
  selector: 'app-feedback-piece-shape,[app-feedback-piece-shape]',
  templateUrl: './feedback-piece-shape.component.html',
  styleUrls: ['./feedback-piece-shape.component.scss']
})
export class FeedbackPieceShapeComponent implements OnInit {
  private calculatedWidth: number;
  private calculatedHeight: number;
  private sizes: any;
  public closestContainer = '.closest-comment-thread-container';
  public left = 0;
  public top = 0;
  public width = 0;
  public height = 0;
  @Input() commentThread: CommentThread;
  @Input() piece: Piece;
  @Input() commentsEnabled = true;
  @Input() set pieceSize(sizes) {
    this.sizes = sizes;
    this.calculatedHeight = sizes.calculatedHeight;
    this.calculatedWidth = sizes.calculatedWidth;
    this.resize();

  }
  @Input() commentThreadStatus: CommentThreadStatus;
  // View child
  @ViewChild('commentThreadPoint') commentThreadPointElement: ElementRef;
  constructor(
    private _commentComunicationService: CommentComunicationService
  ) { }

  ngOnInit() {
  }
  showCommentSidebarThread($event) {
    $event.preventDefault();
    $event.stopPropagation();
    const sidenavInformation: CommentThreadComunicationInfo = new CommentThreadComunicationInfo();
    sidenavInformation.commentThread = this.commentThread;
    sidenavInformation.show = true;
    sidenavInformation.commentsEnabled = false;
    this._commentComunicationService.showSidenav(sidenavInformation);
  }
  resize() {
    const currentWidth = this.calculatedWidth;
    const currentHeight = this.calculatedHeight;
    const newLeft = this.commentThread.originalLeft * (currentWidth / this.piece.setting.naturalWidth);
    const newTop = this.commentThread.originalTop * (currentHeight / this.piece.setting.naturalHeight);
    this.width = this.commentThread.originalWidth * (currentHeight / this.piece.setting.naturalHeight);
    this.height = this.commentThread.originalHeight * (currentHeight / this.piece.setting.naturalHeight);
    this.left = newLeft;
    this.top = newTop;
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

    }


  }
  @HostListener('mouseout', ['$event']) onMouseOut($event) {
    this._commentComunicationService.hoverCommentThreadPoint(false);
  }


}

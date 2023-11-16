import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommentThread, POINT_SIZE } from '../../../models/comments/comment-thread';
import { CommentComunicationService, CommentThreadComunicationInfo } from '../../comment-thread/services/comment-comunication.service';
import { Piece } from '../../../models/feedback/piece';


@Component({
  selector: 'app-feedback-piece-pin,[app-feedback-piece-pin]',
  templateUrl: './feedback-piece-pin.component.html',
  styleUrls: ['./feedback-piece-pin.component.scss']
})
export class FeedbackPiecePinComponent implements OnInit {
  public calculatedWidth: number;
  public calculatedHeight: number;
  public closestContainer = '.closest-comment-thread-container';
  public left = 0;
  public top = 0;
  @Input() commentThread: CommentThread;
  @Input() commentsEnabled = true;
  @Input() piece: Piece;
  @Input() set pieceSize(sizes) {
    this.calculatedHeight = sizes.calculatedHeight;
    this.calculatedWidth = sizes.calculatedWidth;

    this.resize();

  }
  // View childs
  @ViewChild('commentThreadPoint') commentThreadPointElement: ElementRef;
  constructor(private _commentComunicationService: CommentComunicationService) { }

  ngOnInit() {
  }
  showCommentSidebarThread($event) {
    $event.preventDefault();
    $event.stopPropagation();
    const sidenavInformation: CommentThreadComunicationInfo = new CommentThreadComunicationInfo();
    sidenavInformation.commentThread = this.commentThread;
    sidenavInformation.show = true;
    sidenavInformation.commentsEnabled = this.commentsEnabled;
    this._commentComunicationService.showSidenav(sidenavInformation);
  }
  resize() {
    // console.log(this.piece.naturalWidth, this.zoom);
    const currentWidth = this.calculatedWidth;
    const currentHeight = this.calculatedHeight;
    const newLeft = this.commentThread.originalLeft * (currentWidth / this.piece.setting.naturalWidth);
    const newTop = this.commentThread.originalTop * (currentHeight / this.piece.setting.naturalHeight);
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

import { Component, OnInit, ElementRef, Renderer2, Input,
  OnDestroy, HostListener, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { CommentThreadPointComponent } from '../../../comment-thread/comment-thread-point/comment-thread-point.component';
import { CommentComunicationService, CommentThreadComunicationInfo } from '../../../comment-thread/services/comment-comunication.service';
import { Piece } from '../../../../models/feedback/piece';
import { FeedbackWorkflowService } from '../../services/feedback-workflow.service';
import { CommentThreadStrategyService } from '../../../../services/comments/comment-thread-strategy.service';
import { POINT_SIZE } from '../../../../models/comments/comment-thread';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-comment-thread-feedback-point,[app-comment-thread-feedback-point]',
  templateUrl: './comment-thread-feedback-point.component.html',
  styleUrls: ['./comment-thread-feedback-point.component.scss']
})
export class CommentThreadFeedbackPointComponent extends
  CommentThreadPointComponent implements OnInit, OnDestroy, AfterViewInit {
  public subscriptionZoom: ISubscription;
  public isWorking = false;
  public imageMutation: MutationObserver;
  public calculatedWidth: number;
  public calculatedHeight: number;
  // Services
  private _commentThreadService;

  private commentComunicationService: CommentComunicationService;
  // Inputs
  @Input() piece: Piece;
  @Input() set pieceSize(sizes) {
    this.calculatedHeight = sizes.calculatedHeight;
    this.calculatedWidth = sizes.calculatedWidth;
     this.resize();

  }
  @Input() enabled = true;
  @Input() show = true;
  @Input() opacity = 1;
  // Ouputs
  @Output() commentOnWorking = new EventEmitter();
  constructor(
    private _commentThreadStrategyService: CommentThreadStrategyService,
    elementRef: ElementRef,
    _commentComunicationService: CommentComunicationService,
  ) {
    super(elementRef, _commentComunicationService);
    // Services
    this._commentThreadService = this._commentThreadStrategyService.getService();
    this.commentComunicationService = _commentComunicationService;
  }

  ngAfterViewInit() {

  }




  resize() {
    // console.log(this.feedbackPiece.naturalWidth, this.zoom);
    const currentWidth = this.calculatedWidth;
    const currentHeight = this.calculatedHeight;
    const newLeft = (this.piece.setting)?this.commentThread.originalLeft * (currentWidth / this.piece.setting.naturalWidth):undefined;
    const newTop = (this.piece.setting)?this.commentThread.originalTop * (currentHeight / this.piece.setting.naturalHeight):undefined;
    this.commentThread.left = newLeft;
    this.commentThread.top = newTop;
  }

  onDragging($event) {
    this.isWorking = true;
    this.commentOnWorking.emit(true);
  }
  onDragStop(event) {
    const target = event.currentTarget;
    this.commentThread.top = target.offsetTop;
    this.commentThread.left = target.offsetLeft;
    this.setOrigianlSizes();
    setTimeout(() => {
      this._commentThreadService.update(this.commentThread).subscribe();
      this.isWorking = false;
      this.commentOnWorking.emit(false);
    });
  }

  /**
   * Show comment thread re-implement
   * @param $event
   */
  showCommentSidebarThread($event) {
    $event.preventDefault();
    $event.stopPropagation();
    if (!this.isWorking) {
      if(this.commentThread.unreadMessages){
        this._commentThreadService.markRead(this.commentThread).subscribe();
      }
      const sidenavInformation: CommentThreadComunicationInfo = new CommentThreadComunicationInfo();
      sidenavInformation.commentThread = this.commentThread;
      sidenavInformation.show = true;
      sidenavInformation.commentsEnabled = this.piece.latest;
      this.commentComunicationService.showSidenav(sidenavInformation);
    }
  }

  private setOrigianlSizes() {
    // Original
    const currentWidth = this.calculatedWidth;
    const currentHeight = this.calculatedHeight;
    const originalX = (this.piece.setting)?this.commentThread.left * (this.piece.setting.naturalWidth / currentWidth):undefined;
    const originalY = (this.piece.setting)?this.commentThread.top * (this.piece.setting.naturalHeight / currentHeight):undefined;

    this.commentThread.originalLeft = originalX;
    this.commentThread.originalTop = originalY;
  }
  @HostListener('mouseover', ['$event']) onMouseOver($event) {
    if (this.isWorking) {

      $event.preventDefault();
    } else if (this.commentThread.saved) {
      let edge = 'left';
      const $container = $(this.commentThreadPointElement.nativeElement).closest(this.closestContainer);
      // Define edge
      const widthRight = $container.outerWidth() - this.commentThread.left - POINT_SIZE.width;
      const widthLeft = this.commentThread.left;
      if (widthRight > widthLeft) {
        edge = 'right';
      }

      this.commentComunicationService.hoverCommentThreadPoint(true, this.commentThreadPointElement.nativeElement, edge, this.commentThread);

    }

  }
  ngOnDestroy() {
    if (this.subscriptionZoom) {
      console.log('unsuscribe');
      this.subscriptionZoom.unsubscribe();
    }
  }
}

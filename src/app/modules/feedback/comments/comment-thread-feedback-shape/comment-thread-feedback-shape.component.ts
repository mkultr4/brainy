import {
  Component, OnInit,
  ViewChild, ElementRef, Renderer2, OnDestroy, HostListener, AfterViewInit, Input, Output, EventEmitter
} from '@angular/core';

import { ISubscription } from 'rxjs/Subscription';
import { CommentThreadPointComponent } from '../../../comment-thread/comment-thread-point/comment-thread-point.component';
import { Piece } from '../../../../models/feedback/piece';
import { CommentThread, POINT_SIZE } from '../../../../models/comments/comment-thread';
import { CommentThreadStatus } from '../../../../models/comments/comment-thread-status';
import { CommentComunicationService, CommentThreadComunicationInfo } from '../../../comment-thread/services/comment-comunication.service';
import { UtilService } from '../../../../services/utils/util.service';
import { FeedbackToolbarService, FeedbackFocusShape, FeedbackToolbarAction } from '../../services/feedback-toolbar.service';
import { CommentThreadStrategyService } from '../../../../services/comments/comment-thread-strategy.service';



@Component({
  selector: 'app-comment-thread-feedback-shape,[app-comment-thread-feedback-shape]',
  templateUrl: './comment-thread-feedback-shape.component.html',
  styleUrls: ['./comment-thread-feedback-shape.component.scss']
})
export class CommentThreadFeedbackShapeComponent
  extends CommentThreadPointComponent implements OnInit, AfterViewInit, OnDestroy {
  // Zoom
  public focused = false;
  public workingShape = false;
  // Subscriptions
  public subscriptionToolbarAction: ISubscription;
  public subscriptionZoom: ISubscription;
  // Private
  private calculatedWidth: number;
  private calculatedHeight: number;
  private sizes: any;
  // Services
  private _commentThreadService;
  // Inputs
  @Input() piece: Piece;
  @Input() set pieceSize(sizes) {
    this.sizes = sizes;
    this.calculatedHeight = sizes.calculatedHeight;
    this.calculatedWidth = sizes.calculatedWidth;
    this.resize();
  }
  @Input() commentThread: CommentThread;
  @Input() commentThreadStatus: CommentThreadStatus;
  @Input() enabled = true;
  @Input() show = true;
  // Outputs
  @Output() onWorkingShape = new EventEmitter();
  // View childs
  @ViewChild('shapeSVG') shapeSVG: ElementRef;

  private commentComunicationService: CommentComunicationService;

  constructor(
    elementRef: ElementRef,
    _commentComunicationService: CommentComunicationService,
    private _commentThreadStrategyService: CommentThreadStrategyService,
    private _feedbackToolbarService: FeedbackToolbarService,
    private _utilService: UtilService
  ) {

    super(elementRef, _commentComunicationService);
    this._commentThreadService = this._commentThreadStrategyService.getService();
    this.commentComunicationService = _commentComunicationService;
  }

  ngAfterViewInit() {
    // Toolbar action susbcription
    this.subscriptionToolbarAction =
      this._feedbackToolbarService.toolbarAction$.subscribe((toolbarAction: FeedbackToolbarAction) => {
        if (this.focused) {
          // console.log(toolbarAction.args.toString());
          if (toolbarAction.type === 'background-color') {
            if (toolbarAction.args !== 'transparent') {
              this.commentThread.backgroundColor = this._utilService.hex2rgb(toolbarAction.args, 0.5).css;
            } else {
              this.commentThread.backgroundColor = toolbarAction.args;
            }

          } else if (toolbarAction.type === 'border-color') {
            this.commentThread.borderColor = toolbarAction.args;
          } else if (toolbarAction.type === 'border-width') {
            this.commentThread.borderWidth = toolbarAction.args;
          }
          if (this.commentThread.saved) {
            this._commentThreadService.update(this.commentThread).subscribe();
          }
        }
      });


    setTimeout(() => {
      // this.setOrigianlSizes();
      if (!this.commentThread.saved) {
        // $(this.commentThreadShape.nativeElement).trigger('click');
        this.focused = true;
        this._feedbackToolbarService.onFocusShape(new FeedbackFocusShape(true, this.commentThread));
      }

    }, 300);
  }

  showCommentSidebarThread($event) {
    $event.preventDefault();
    $event.stopPropagation();
    if (!this.workingShape) {
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
  /**
   * On focus shape
   */
  focus() {
    this.focused = true;
    this._feedbackToolbarService.onFocusShape(new FeedbackFocusShape(true, this.commentThread));
  }
  // Resize
  resize() {
    const currentWidth = this.calculatedWidth;
    const currentHeight = this.calculatedHeight;
    const newLeft = (this.piece.setting)?this.commentThread.originalLeft * (currentWidth / this.piece.setting.naturalWidth):undefined;
    const newTop = (this.piece.setting)?this.commentThread.originalTop * (currentHeight / this.piece.setting.naturalHeight):undefined;
    this.commentThread.width = (this.piece.setting)?this.commentThread.originalWidth * (currentHeight / this.piece.setting.naturalHeight):undefined;
    this.commentThread.height = (this.piece.setting)?this.commentThread.originalHeight * (currentHeight / this.piece.setting.naturalHeight):undefined;
    this.commentThread.left = newLeft;
    this.commentThread.top = newTop;
  }

  onResizing(event) {
    this.onWorkingShape.emit(true);
    this.workingShape = true;
    this.shapeSVG.nativeElement.setAttribute('height', event.sizing.height + 'px');
    this.shapeSVG.nativeElement.setAttribute('width', event.sizing.width + 'px');
    if (this.commentThread.type === 'circle') {
      this.shapeSVG.nativeElement.setAttribute('cx', event.sizing.width / 2);
      this.shapeSVG.nativeElement.setAttribute('cy', event.sizing.height / 2);
      this.shapeSVG.nativeElement.setAttribute('rx', event.sizing.width / 2);
      this.shapeSVG.nativeElement.setAttribute('ry', event.sizing.height / 2);
    }
  }
  onResizeStop(event) {
    console.log(event);
    const target = event.currentTarget;
    this.commentThread.width = target.clientWidth;
    this.commentThread.height = target.clientHeight;
    this.commentThread.top = target.offsetTop;
    this.commentThread.left = target.offsetLeft;

    setTimeout(() => {
      this.setOrigianlSizes();
      this.onWorkingShape.emit(false);
      this.workingShape = false;
      if (this.commentThread.saved) {
        this._commentThreadService.update(this.commentThread).subscribe();
      }
    }, 300);
  }
  onDragging($event) {
    this.onWorkingShape.emit(true);
    this.workingShape = true;
  }
  onDragStop(event) {
    const target = event.currentTarget;
    this.commentThread.top = target.offsetTop;
    this.commentThread.left = target.offsetLeft;
    setTimeout(() => {
      this.setOrigianlSizes();
      this.onWorkingShape.emit(false);
      this.workingShape = false;
      if (this.commentThread.saved) {
        this._commentThreadService.update(this.commentThread).subscribe();
      }
    }, 300);
  }
  // Mouse over
  mouseover() {

    if (this.commentThread.saved) {
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
  mouseout() {
    this.commentComunicationService.hoverCommentThreadPoint(false);
  }

  @HostListener('window:click', ['$event']) onClick(event) {
    const target = $(event.target);
    if (!this.workingShape) {
      if (
        target.closest('.comment-thread-shape').attr('id') !== 'shape-' + this.commentThread.id
        && target.closest('.toolbar-feedback-shape').length === 0
      ) {
        this.focused = false;
      }
      if (!this.commentThread.saved) {
        // Handle click outside
        if (
          target.closest('.closest-comment-thread-container.adding-comment-thread').length === 0 &&
          target.closest('.comment-thread-shape').attr('id') !== 'shape-' + this.commentThread.id &&
          target.closest('.comment-popup-thread-content').length === 0 &&
          target.closest('.comment-input-wrapper').length === 0 &&
          target.closest('.comment-input-record-wrapper').length === 0 &&
          target.closest('.toolbar-feedback-shape').length === 0 &&
          target.closest('.alert-dialog-overlay').length === 0 &&
          target.closest('.alert-dialog').length === 0
        ) {
          // Empty popup show
          const popupInfo: CommentThreadComunicationInfo = new CommentThreadComunicationInfo();
          popupInfo.show = false;
          popupInfo.commentThread = new CommentThread();
          // Hide popup
          this.commentComunicationService.showPopup(popupInfo);
          // Remove comment
          this._commentThreadService.remove(this.commentThread.id).subscribe();
          // Emit
          this.onWorkingShape.emit(false);
          // Emit
          this._feedbackToolbarService.onFocusShape(new FeedbackFocusShape(false, null));
        }
      }
    }
  }

  private setOrigianlSizes() {

    // Original
    const currentWidth = this.calculatedWidth;
    const currentHeight = this.calculatedHeight;
    const originalX = (this.piece.setting)?this.commentThread.left * (this.piece.setting.naturalWidth / currentWidth):undefined;
    const originalY = (this.piece.setting)?this.commentThread.top * (this.piece.setting.naturalHeight / currentHeight):undefined;
    const originalWidth = (this.piece.setting)?this.commentThread.width * (this.piece.setting.naturalWidth / currentWidth):undefined;
    const originalHeight = (this.piece.setting)?this.commentThread.height * (this.piece.setting.naturalHeight / currentHeight):undefined;
    // Setting originales sizes to resizing
    this.commentThread.originalLeft = originalX;
    this.commentThread.originalTop = originalY;
    this.commentThread.originalWidth = originalWidth;
    this.commentThread.originalHeight = originalHeight;

  }


  @HostListener('mouseover', ['$event']) onMouseOver($event) {
    $event.preventDefault();

  }
  @HostListener('mouseout', ['$event']) onMouseOut($event) {
    // this.commentComunicationService.hoverCommentThreadPoint(false);
  }
  ngOnDestroy() {
    console.log('destroy shape');
    if (this.focused) {
      //  console.log(this.commentThread);
      // this._feedbackToolbarService.onFocusShape(false);
    }
    if (this.subscriptionZoom) {
      this.subscriptionZoom.unsubscribe();
    }
    if (this.subscriptionToolbarAction) {
      this.subscriptionToolbarAction.unsubscribe();
    }

  }
}

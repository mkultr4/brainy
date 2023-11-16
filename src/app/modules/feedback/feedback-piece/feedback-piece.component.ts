import { Component, OnInit, Input,  ElementRef, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommentThreadStatus } from '../../../models/comments/comment-thread-status';
import { ParticipantType } from '../../../models/participants/participant-type';
import { Piece } from '../../../models/feedback/piece';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { FeedbackWorkflowService } from '../services/feedback-workflow.service';
import { FeedbackStrategyService } from '../../../services/feedback/feedback-strategy.service';
import { CommentThreadStrategyService } from '../../../services/comments/comment-thread-strategy.service';
import { ISubscription } from 'rxjs/Subscription';
import {  CommentThreadComunicationInfo } from '../../comment-thread/services/comment-comunication.service';
import { CommentThread, POINT_SIZE } from '../../../models/comments/comment-thread';
import { Observable } from 'rxjs';
import * as uuid from 'uuid/v4';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-feedback-piece',
  templateUrl: './feedback-piece.component.html',
  styleUrls: ['./feedback-piece.component.scss']
})
export class FeedbackPieceComponent implements OnInit, OnDestroy {
  // Public
  public _zoom = 100;
  public addingCommentThread = false;
  public calculatedWidth;
  public calculatedHeight;
  public containerWidth = 0;
  public containerHeight = 0;
  public pieceBigger = false;
  public _leftSidenavCompressed;
  public _rightSidenavCompressed;
  public commentObs: Observable<CommentThread[]>;
  public pointIsWorking = false;
  public zooming = false;
  // Services
  private _commentThreadService;
  private _feedbackService;
  // Subscriptions
  public subscriptionComments: ISubscription;
  // Inputs
  @Input() popupInformation: CommentThreadComunicationInfo;
  @Input() commentThreadStatuses: Array<CommentThreadStatus>;
  @Input() participantTypes: Array<ParticipantType>;
  @Input() filterStatuses: Array<CommentThreadStatus> = new Array<CommentThreadStatus>();
  @Input() filterParticipantTypes: Array<ParticipantType> = new Array<ParticipantType>();
  @Input() piece: Piece;
  @Input() feedbackAction: string;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() hasTour = false;
  @Input() enableComments = true;
  @Input() leftSidenavCompressed = false;
  @Input() rightSidenavCompressed = false;
  @Input() set zoom(zoom) {
    this._zoom = zoom;
    // console.log(this.scroll);
    // this.scroll.update();
    // this.adjustFeedbackPieceName();
     this.zooming = true;
    setTimeout(() => {
      this.zooming = false;
    }, 400);
  }
  // Output
  @Output() pieceOnWorkingPoint = new EventEmitter();
  // View child
  @ViewChild('scroll', { read: PerfectScrollbarDirective }) scroll: PerfectScrollbarDirective;
  constructor(
    private elementRef: ElementRef,
    private _commentThreadStrategyService: CommentThreadStrategyService,
    private _feedbackWorkflowService: FeedbackWorkflowService,
    private _feedbackStrategyService: FeedbackStrategyService,
  ) {
    // Services
    this._commentThreadService = this._commentThreadStrategyService.getService();
    this._feedbackService = this._feedbackStrategyService.getService();
  }

  ngOnInit() {
  }
  /**
 * How display piece
 */
  calculateRatioPiece() {

    let rightSidenav = 350;
    let leftSidenav = 240;
    if (this._rightSidenavCompressed) {
      rightSidenav = 80;
    }
    if (window.innerWidth < 992) {
      leftSidenav = 0;
      rightSidenav = 80;
    }
    if (this._leftSidenavCompressed) {
      leftSidenav = 0;
    }

    this.containerWidth = window.innerWidth - leftSidenav - rightSidenav;
    this.containerHeight = window.innerHeight - 140;
    const containerWidth = this.containerWidth - 80;
    const containerHeight = this.containerHeight - 80;
    // const containerWidth20 = containerWidth * 0.3;
    const containerWidth30 = containerWidth * 0.3;
    const containerHeight30 = containerWidth * 0.3;
    // const mediaquery = window.matchMedia('(max-width: 600px)');
    // Ration natural
    const widthRatio = (this.piece.setting)?(this.piece.setting.naturalWidth / containerWidth):undefined;
    const heightRatio = (this.piece.setting)?(this.piece.setting.naturalHeight / containerHeight):undefined;
    const bestRatio = widthRatio;

    /*if (heightRatio <= widthRatio) {
      bestRatio = heightRatio;
    }*/
    // Ratio thin
    const widthRatioThin = (this.piece.setting)?(this.piece.setting.naturalWidth / containerWidth30):undefined;
    const heightRatioThin = (this.piece.setting)?(this.piece.setting.naturalHeight / containerHeight30):undefined;
    let bestRatioThin = widthRatio;
    if (widthRatioThin >= heightRatioThin) {
      bestRatioThin = heightRatioThin;
    }

    const calculatedWidthNatural = (this.piece.setting)?(this.piece.setting.naturalWidth / bestRatio):undefined;
    const calculatedHeightNatural = (this.piece.setting)?(this.piece.setting.naturalHeight / bestRatio):undefined;

    const calculatedWidthThin = (this.piece.setting)?(this.piece.setting.naturalWidth / bestRatioThin):undefined;
    const calculatedHeightThin = (this.piece.setting)?(this.piece.setting.naturalHeight / bestRatioThin):undefined;

    if (window.innerWidth > 992) {
      if (this.piece.setting && this.piece.setting.naturalWidth < containerWidth30) {
        this.calculatedWidth = calculatedWidthThin;
        this.calculatedHeight = calculatedHeightThin;
      } else {
        this.calculatedWidth = calculatedWidthNatural;
        this.calculatedHeight = calculatedHeightNatural;
      }
    } else {
      if (this.piece.setting && this.piece.setting.naturalWidth > containerWidth
        || this.piece.setting.naturalHeight > containerHeight) {
        this.calculatedWidth = this.piece.setting.naturalWidth / 2;
        this.calculatedHeight = this.piece.setting.naturalHeight / 2;
      } else {
        if (this.piece.setting && this.piece.setting.naturalWidth < containerWidth30) {
          this.calculatedWidth = calculatedWidthThin;
          this.calculatedHeight = calculatedHeightThin;
        } else {
          this.calculatedWidth = calculatedWidthNatural;
          this.calculatedHeight = calculatedHeightNatural;
        }
      }
    }
    setTimeout(() => {
      this._feedbackWorkflowService.setPieceWidth(this.calculatedWidth);
      this._feedbackWorkflowService.setZoom(100);
    });
  }
  // Comments
  loadCommentThreads() {
   
    this._commentThreadService.loadAll('PIECE', this.piece.id, this.piece.commentThreads).subscribe();

    this.subscriptionComments = this._commentThreadService.
      commentThreads.subscribe((commentThreads) => {
        console.log(commentThreads);
        this.piece.commentThreads = Object.assign([], commentThreads);
        // To update local storage
        this._feedbackService.updatePieceStoreCommentThread(this.piece);
        // check if comments unsaved
        const unsaved = this.piece.commentThreads.filter(c => !c.saved).length > 0;
        if (!unsaved) {
          this._feedbackWorkflowService.checkStatus(commentThreads[commentThreads.length - 1]);
        }
      });
  }
  // On shape resize/move
  onWorkingPoint(isWorking: boolean) {
    this.pointIsWorking = isWorking;
    this.pieceOnWorkingPoint.emit(this.pointIsWorking);
  }

  // Actions
  pieceActionClick($event) {
    if (this.enableComments) {
      const target = $($event.target);
      if (!this.pointIsWorking) {
        if (!this.popupInformation.commentThread.id) {
          this.addingCommentThread = true;
          if (this.feedbackAction === 'pin') {
            this.addPin($event, this.feedbackAction);
            this.addingCommentThread = false;
          }

          if (this.feedbackAction === 'rectangle' || this.feedbackAction === 'circle') {
            if ($($event.target).closest('.comment-thread-shape').length === 0) {
              this.addShape($event, this.feedbackAction);
              setTimeout(() => {
                this.addingCommentThread = false;
              }, 100);
            }
          }
        }
      }
    }
  }
  private setCommentThreadNumber(commentThread: CommentThread) {

    if (this.piece.commentThreads.length > 0) {
      const arrayLength = this.piece.commentThreads.length;
      const lastComment = this.piece.commentThreads[arrayLength - 1];
      const number = Math.max(lastComment.number + 1, this.piece.commentThreads.length + 1);
      commentThread.number = number;
    } else {
      commentThread.number = this.piece.commentThreads.length + 1;
    }

  }
  private addPin($event, type) {
    console.log('add pin');
    const closestContainer = $(this.elementRef.nativeElement).find('.closest-comment-thread-container');
    const commentThread = new CommentThread();
    commentThread.id = uuid();
    commentThread.event = 'click';
    commentThread.type = type;
    commentThread.workspaceAccess = this.workspaceAccess;
    this.setCommentThreadNumber(commentThread);
    commentThread.originalContainerHeight = this.piece.setting.naturalHeight;
    commentThread.originalContainerWidth = this.piece.setting.naturalWidth;
    commentThread.levelId = 'PIECE';
    commentThread.referenceId = this.piece.id;
    commentThread.left = $event.clientX - closestContainer.offset().left - POINT_SIZE.height / 2;
    commentThread.top = $event.clientY - closestContainer.offset().top - POINT_SIZE.height / 2;
    commentThread.status = this.commentThreadStatuses.filter(c => c.key === 'in-process')[0];
    commentThread.participantType = this.participantTypes.filter(p => p.key === 'all')[0];

    this.setOrigianlSizes(commentThread);
    this._commentThreadService.create(commentThread).subscribe();
  }

  private addShape($event, type) {
    const closestContainer = $(this.elementRef.nativeElement).find('.closest-comment-thread-container');
    const commentThread = new CommentThread();
    commentThread.id = uuid();
    commentThread.event = 'click';
    commentThread.type = type;
    commentThread.workspaceAccess = this.workspaceAccess;
    this.setCommentThreadNumber(commentThread);
    commentThread.originalContainerHeight = this.piece.setting.naturalHeight;
    commentThread.originalContainerWidth = this.piece.setting.naturalWidth;
    commentThread.levelId = 'PIECE';
    commentThread.referenceId = this.piece.id;
    commentThread.left = $event.clientX - closestContainer.offset().left;
    commentThread.top = $event.clientY - closestContainer.offset().top;
    commentThread.status = this.commentThreadStatuses.filter(c => c.key === 'in-process')[0];
    commentThread.participantType = this.participantTypes.filter(p => p.key === 'all')[0];
    this.processShapePosition(commentThread);
    this.setOrigianlSizes(commentThread);
    this._commentThreadService.create(commentThread).subscribe();
  }
  private processShapePosition(commentThread: CommentThread) {
    const leftWithWidth = commentThread.left + commentThread.width;
    const topWithHeight = commentThread.top + commentThread.height;
    if (this.calculatedWidth < leftWithWidth) {
      const diffWidth = leftWithWidth - this.calculatedWidth;
      commentThread.left = commentThread.left - diffWidth;
    }
    if (this.calculatedHeight < topWithHeight) {
      const diffHeight = topWithHeight - this.calculatedHeight;
      commentThread.top = commentThread.top - diffHeight;
    }
  }
  private setOrigianlSizes(commentThread: CommentThread) {
    // Original
    const currentWidth = this.calculatedWidth * (this._zoom / 100);
    const currentHeight = this.calculatedHeight * (this._zoom / 100);
    const originalX = commentThread.left * (this.piece.setting.naturalWidth / currentWidth);
    const originalY = commentThread.top * (this.piece.setting.naturalHeight / currentHeight);
    if (commentThread.width) {
      const originalWidth = commentThread.width * (this.piece.setting.naturalWidth / currentWidth);
      commentThread.originalWidth = originalWidth;
    }
    if (commentThread.height) {
      const originaHeight = commentThread.width * (this.piece.setting.naturalHeight / currentHeight);
      commentThread.originalHeight = originaHeight;
    }

    commentThread.originalLeft = originalX;
    commentThread.originalTop = originalY;
  }


  // On destroy
  ngOnDestroy() {
    if (this.subscriptionComments) {
      this.subscriptionComments.unsubscribe();
    }
  }
}

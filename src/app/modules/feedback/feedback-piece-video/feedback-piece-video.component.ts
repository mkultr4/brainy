import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit, HostListener, OnDestroy, EventEmitter, Output } from '@angular/core';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { Piece } from '../../../models/feedback/piece';
import { ParticipantType } from '../../../models/participants/participant-type';
import { CommentThreadStatus } from '../../../models/comments/comment-thread-status';
import { ISubscription } from 'rxjs/Subscription';
import { FeedbackWorkflowService } from '../services/feedback-workflow.service';
import * as screenfull from 'screenfull';
import { CommentThreadComunicationInfo } from '../../comment-thread/services/comment-comunication.service';
import { CommentThread, POINT_SIZE } from '../../../models/comments/comment-thread';
import * as uuid from 'uuid/v4';
import { CommentThreadStrategyService } from '../../../services/comments/comment-thread-strategy.service';
import { FeedbackStrategyService } from '../../../services/feedback/feedback-strategy.service';
@Component({
  selector: 'app-feedback-piece-video',
  templateUrl: './feedback-piece-video.component.html',
  styleUrls: ['./feedback-piece-video.component.scss']
})
export class FeedbackPieceVideoComponent implements OnInit, AfterViewInit, OnDestroy {
  // Publics
  public calculatedWidth;
  public calculatedHeight;
  public containerWidth = 0;
  public containerHeight = 0;
  public pointIsWorking = false;
  public addingCommentThread = false;
  public scaleFactorW = 1;
  public scaleFactorH = 1;
  public scaleFactor = 1;
  // Player public vars
  public currentTime = 0;
  public videoAction = 'pause';
  public isLoadVideo = false;
  public muted = false;
  public isSeeking = false;
  // Services
  private _commentThreadService;
  private _feedbackService;
  // Subscriptions
  public subscriptionComments: ISubscription;
  public subscriptionSeekTo: ISubscription;
  // Inputs
  @Input() popupInformation: CommentThreadComunicationInfo;
  @Input() commentThreadStatuses: Array<CommentThreadStatus>;
  @Input() participantTypes: Array<ParticipantType>;
  @Input() piece: Piece;
  @Input() hasTour = false;
  @Input() filterStatuses: Array<CommentThreadStatus> = new Array<CommentThreadStatus>();
  @Input() filterParticipantTypes: Array<ParticipantType> = new Array<ParticipantType>();
  @Input() leftSidenavCompressed: boolean;
  @Input() rightSidenavCompressed: boolean;
  @Input() feedbackAction: string;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() enableComments = true;
  // Output
  @Output() pieceOnWorkingPoint = new EventEmitter();
  // View child
  @ViewChild('pieceVideo') video: ElementRef;
  @ViewChild('slider') slider: ElementRef;
  @ViewChild('sliderPin') sliderPin: ElementRef;
  @ViewChild('workflowPrimaryContent') workflowPrimaryContent: ElementRef;
  constructor(
    private elementRef: ElementRef,
    private _feedbackWorkflowService: FeedbackWorkflowService,
    private _commentThreadStrategyService: CommentThreadStrategyService,
    private _feedbackStrategyService: FeedbackStrategyService,
  ) { 
    this._feedbackService = this._feedbackStrategyService.getService();
    this._commentThreadService = this._commentThreadStrategyService.getService();
  }

  ngOnInit() {
  }
  ngAfterViewInit() {

    this.subscriptionSeekTo = this._feedbackWorkflowService.seekVideo.subscribe(time => {
      this.seekTo(null, time);
    });
    // Scale to caption
    this.scaleFactorW = (this.piece.setting)? 120 / this.piece.setting.naturalWidth:undefined;
    this.scaleFactorH = (this.piece.setting)?60 / this.piece.setting.naturalHeight:undefined;
    this.scaleFactor = Math.min(this.scaleFactorW, this.scaleFactorH);
  }
  // #region Piece
  calculateRatio() {
    let rightSidenav = 350;
    let leftSidenav = 240;
    if (this.rightSidenavCompressed) {
      rightSidenav = 80;
    }
    if (window.innerWidth < 992) {
      leftSidenav = 0;
      rightSidenav = 80;
    }
    if (this.leftSidenavCompressed) {
      leftSidenav = 0;
    }

    this.containerWidth = window.innerWidth - leftSidenav - rightSidenav;
    this.containerHeight = window.innerHeight - 140;
    const containerWidth = this.containerWidth - 120;
    const containerHeight = this.containerHeight - 172;

    // Ration natural
    const widthRatio = (this.piece.setting)?this.piece.setting.naturalWidth / containerWidth:undefined;
    const heightRatio = (this.piece.setting)?this.piece.setting.naturalHeight / containerHeight:undefined;
    console.log(widthRatio, heightRatio);
    let bestRatio = widthRatio;
    if (heightRatio >= widthRatio) {
      bestRatio = heightRatio;
    }
    this.calculatedWidth = (this.piece.setting)?this.piece.setting.naturalWidth / bestRatio:undefined;
    this.calculatedHeight =(this.piece.setting)?this.piece.setting.naturalHeight / bestRatio:undefined;
    setTimeout(() => {
      this._feedbackWorkflowService.setPieceWidth(this.calculatedWidth);
      this._feedbackWorkflowService.setZoom(100);
    });
  }
  // #endregion

  // #region Video

  // Restart video
  restartVideoPlayer() {
    this.currentTime = 0;
    this.videoAction = 'pause';
    this.isLoadVideo = false;
    this.muted = false;
    this.isSeeking = false;
    this.video.nativeElement.src = this.piece.url;
    this.video.nativeElement.load();
  }
  // On video load
  onLoadVideo($event) {
    this.isLoadVideo = true;
  }
  // Play video
  playVideo() {
    if (this.isLoadVideo) {
      if (this.video.nativeElement.paused) {
        this.video.nativeElement.play();
        this.videoAction = 'play';
      } else {
        this.video.nativeElement.pause();
        this.videoAction = 'pause';
      }
    }
  }
  // Muted video
  setMuted() {
    this.muted = !this.muted;
  }
  // On mouse down video
  onMouseDown($event) {
    const target = $(event.target);
    if (target[0] === this.sliderPin.nativeElement) {
      this.isSeeking = true;
      this.seek($event);
    } else {
      this.isSeeking = false;
    }
  }
  // On mouse move video
  onMouseMove($event) {
    if (this.isSeeking) {
      this.seek($event);
    }
  }

  // Get Time
  getCoefficient($event) {
    const sliderEl = this.slider.nativeElement;
    const rect = sliderEl.getBoundingClientRect();
    let K = 0;
    if (sliderEl.dataset.direction === 'horizontal') {

      const offsetX = $event.clientX - rect.left;
      const width = sliderEl.clientWidth;
      K = offsetX / width;
    } else if (sliderEl.dataset.direction === 'vertical') {

      const height = sliderEl.clientHeight;
      const offsetY = $event.clientY - rect.top;
      K = 1 - offsetY / height;
    }
    return K;
  }
  // Go to..
  seek($event) {
    this.video.nativeElement.currentTime = this.video.nativeElement.duration * this.getCoefficient($event);
    this.currentTime = this.video.nativeElement.currentTime;
  }
  // seek to
  seekTo($event, time) {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    this.video.nativeElement.currentTime = time;
    this.currentTime = time;
    // console.log(this.video.nativeElement.currentTime);
  }
  // On video end
  onended($event) {
    this.videoAction = 'play';
    this.currentTime = 0;
  }
  // On time update
  timeupdate($event) {
    this.currentTime = Number(this.video.nativeElement.currentTime.toFixed(1)) / 1;
  }
  // Full screen
  toggleFullScreen() {
    if (screenfull.enabled) {
      screenfull.toggle();
    }
  }
  // #endregion

  // #region Comments
   // Comments
   loadCommentThreads() {
    this._commentThreadService.loadAll('PIECE', this.piece.id, this.piece.commentThreads).subscribe();

    this.subscriptionComments = this._commentThreadService.
      commentThreads.subscribe((commentThreads) => {
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
  // Actions
  pieceActionClick($event) {
    if (this.enableComments) {
      const target = $($event.target);
      if (!this.pointIsWorking) {
        if (!this.popupInformation.commentThread.id) {
          if (!this.video.nativeElement.paused) {
            this.playVideo();
          }
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
  // Add pin
  private addPin($event, type) {

    const closestContainer = $(this.elementRef.nativeElement).find('.closest-comment-thread-container');
    const commentThread = new CommentThread();
    commentThread.id = uuid();
    // Time to show
    commentThread.timeStart = this.currentTime;
    commentThread.timeEnd = this.currentTime + 0.5;
    commentThread.event = 'click';
    commentThread.type = type;
    commentThread.workspaceAccess = this.workspaceAccess;
    this.setCommentThreadNumber(commentThread);
    commentThread.originalContainerHeight = (this.piece.setting)?this.piece.setting.naturalHeight:undefined;
    commentThread.originalContainerWidth = (this.piece.setting)?this.piece.setting.naturalWidth:undefined;
    commentThread.levelId = 'PIECE';
    commentThread.referenceId = this.piece.id;
    commentThread.left = $event.clientX - closestContainer.offset().left - POINT_SIZE.height / 2;
    commentThread.top = $event.clientY - closestContainer.offset().top - POINT_SIZE.height / 2;
    commentThread.status = this.commentThreadStatuses.filter(c => c.key === 'in-process')[0];
    commentThread.participantType = this.participantTypes.filter(p => p.key === 'all')[0];
    this.captureCaption(this.video.nativeElement, commentThread);
    this.setOrigianlSizes(commentThread);
    this._commentThreadService.create(commentThread).subscribe();
  }
  // Add shape
  private addShape($event, type) {
    const closestContainer = $(this.elementRef.nativeElement).find('.closest-comment-thread-container');
    const commentThread = new CommentThread();
    commentThread.id = uuid();
    commentThread.timeStart = this.currentTime;
    commentThread.timeEnd = this.currentTime + 0.5;
    commentThread.event = 'click';
    commentThread.type = type;
    commentThread.workspaceAccess = this.workspaceAccess;
    this.setCommentThreadNumber(commentThread);
    commentThread.originalContainerHeight = (this.piece.setting)?this.piece.setting.naturalHeight:undefined;
    commentThread.originalContainerWidth = (this.piece.setting)?this.piece.setting.naturalWidth:undefined;
    commentThread.referenceId = 'PIECE';
    commentThread.levelId = this.piece.id;
    commentThread.left = $event.clientX - closestContainer.offset().left;
    commentThread.top = $event.clientY - closestContainer.offset().top;
    commentThread.status = this.commentThreadStatuses.filter(c => c.key === 'in-process')[0];
    commentThread.participantType = this.participantTypes.filter(p => p.key === 'all')[0];
    this.captureCaption(this.video.nativeElement, commentThread);
    this.processShapePosition(commentThread);
    this.setOrigianlSizes(commentThread);
    this._commentThreadService.create(commentThread).subscribe();
  }
  // Proccess shape position
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
  // Set original sizes
  private setOrigianlSizes(commentThread: CommentThread) {
    // Original
    const currentWidth = this.calculatedWidth;
    const currentHeight = this.calculatedHeight;
    const originalX = (this.piece.setting)?commentThread.left * (this.piece.setting.naturalWidth / currentWidth):undefined;
    const originalY = (this.piece.setting)?commentThread.top * (this.piece.setting.naturalHeight / currentHeight):undefined;
    if (commentThread.width) {
      const originalWidth = (this.piece.setting)?commentThread.width * (this.piece.setting.naturalWidth / currentWidth):undefined;
      commentThread.originalWidth = originalWidth;
    }
    if (commentThread.height) {
      const originaHeight = (this.piece.setting)?commentThread.width * (this.piece.setting.naturalHeight / currentHeight):undefined;
      commentThread.originalHeight = originaHeight;
    }

    commentThread.originalLeft = originalX;
    commentThread.originalTop = originalY;
  }
  private captureCaption(video, commentThread: CommentThread) {

    const w = (this.piece.setting)?this.piece.setting.naturalWidth * this.scaleFactor:undefined;
    const h = (this.piece.setting)?this.piece.setting.naturalHeight * this.scaleFactor:undefined;
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, w, h);
    // Set frame
    commentThread.frameImage = canvas.toDataURL('image/jpeg');
    commentThread.frameScale = this.scaleFactor;
    commentThread.frameWidth = w;
    commentThread.frameHeight = h;
    canvas.remove();

  }
  // On shape resize/move
  onWorkingPoint(isWorking: boolean) {
    this.pointIsWorking = isWorking;
    this.pieceOnWorkingPoint.emit(this.pointIsWorking);
  }

  // #endregion

  @HostListener('window:mouseup', ['$event']) onMouseUp(event) {
    this.isSeeking = false;
  }




  ngOnDestroy() {
    if (this.subscriptionComments) {
      this.subscriptionComments.unsubscribe();
    }

    if (this.subscriptionSeekTo) {
      this.subscriptionSeekTo.unsubscribe();
    }
  }
}

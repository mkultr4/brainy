import { Component, OnInit, Input, ViewChild, AfterContentInit, OnDestroy, HostListener } from '@angular/core';
import { Piece } from '../../../models/feedback/piece';
import { ISubscription } from 'rxjs/Subscription';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { FeedbackPieceComponent } from '../feedback-piece/feedback-piece.component';
import { FeedbackPieceVideoComponent } from '../feedback-piece-video/feedback-piece-video.component';
import { FeedbackTutorialComponent } from '../feedback-tutorial/feedback-tutorial.component';
import { FeedbackStrategyService } from '../../../services/feedback/feedback-strategy.service';
import { FeedbackWorkflowService } from '../services/feedback-workflow.service';
import { ModalWarningFormatComponent } from '../modal-warning-format/modal-warning-format.component';
import { ParticipantType } from '../../../models/participants/participant-type';
import { CommentThreadStatus } from '../../../models/comments/comment-thread-status';
import {
  CommentComunicationService,
  CommentThreadComunicationInfo, CommentThreadFilter
} from '../../comment-thread/services/comment-comunication.service';
import { FeedbackFocusShape, FeedbackToolbarService } from '../services/feedback-toolbar.service';

@Component({
  selector: 'app-feedback-piece-wrapper',
  templateUrl: './feedback-piece-wrapper.component.html',
  styleUrls: ['./feedback-piece-wrapper.component.scss']
})
export class FeedbackPieceWrapperComponent implements OnInit, AfterContentInit, OnDestroy {
  public piece: Piece;
  public _pieceShow: Piece;
  public popupInformation: CommentThreadComunicationInfo;
  public filterStatuses: Array<CommentThreadStatus> = new Array<CommentThreadStatus>();
  public filterParticipantTypes: Array<ParticipantType> = new Array<ParticipantType>();
  public pointIsWorking = false;
  // Subscriptions
  public subscriptionPopup: ISubscription;
  public subscriptionCommentThreadFilter: ISubscription;
  // Private
  private _feedbackService;
  // Inputs
  @Input() commentThreadStatuses: Array<CommentThreadStatus>;
  @Input() participantTypes: Array<ParticipantType>;
  @Input() set pieceShow(pieceShow: Piece) {
    this._pieceShow = Object.assign({}, pieceShow);
    this.findPiece();
  }
  @Input() forceError = true;
  @Input() zoom = 100;
  @Input() leftSidenavCompressed: boolean;
  @Input() rightSidenavCompressed: boolean;
  @Input() feedbackAction: string;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() editable: boolean;
  @Input() enableComments = true;
  @Input() hasTour: boolean;
  @Input() canAddVideo: boolean;
  // View child
  @ViewChild(FeedbackPieceComponent) pieceComponent: FeedbackPieceComponent;
  @ViewChild(FeedbackPieceVideoComponent) pieceVideoComponent: FeedbackPieceVideoComponent;
  @ViewChild(FeedbackTutorialComponent) tutorialComponent: FeedbackTutorialComponent;
  @ViewChild('modalWarning') modalWarning: ModalWarningFormatComponent;
  constructor(
    private _feedbackStrategyService: FeedbackStrategyService,
    private _feedbackWorkflowService: FeedbackWorkflowService,
    private _commentComunicationService: CommentComunicationService,
    private _feedbackToolbarService: FeedbackToolbarService
  ) {
    this._feedbackService = this._feedbackStrategyService.getService();
  }

  ngOnInit() {
  }
  ngAfterContentInit() {
    this.subscriptionPopup = this._commentComunicationService.showPopupObs.subscribe(
      (popupInfo: CommentThreadComunicationInfo) => {
        this.popupInformation = popupInfo;
      });

    this.subscriptionCommentThreadFilter = this._commentComunicationService.commentThreadFilterObs.subscribe(
      (filter: CommentThreadFilter) => {

        this.filterStatuses = Object.assign([], filter.statuses);
        this.filterParticipantTypes = Object.assign([], filter.praticipantTypes);
      });
    
  }
  public findPiece() {
    if (!this._pieceShow.empty) {
      this._feedbackService.getFeedbackPieceById(this._pieceShow.id).subscribe((piece: Piece) => {
        this.zoom = 100;
        this.piece = Object.assign(new Piece(), piece);
        setTimeout(() => {
          if (!this.piece.empty) {
            if (this.piece.type === 'image') {
              console.log('show image');
              this.pieceComponent.calculateRatioPiece();
              this.pieceComponent.loadCommentThreads();
            }
            if (this.piece.type === 'video') {
              this.pieceVideoComponent.restartVideoPlayer();
              this.pieceVideoComponent.calculateRatio();
              this.pieceVideoComponent.loadCommentThreads();
            }
            if (this.hasTour) {
              setTimeout(() => {
                this.tutorialComponent.tourComp.startTour();
              }, 200);

            }
          }
        });
      });
    } else {
      this.piece = this._pieceShow;
      this._feedbackWorkflowService.setPieceWidth(0);
    }
  }

  onUpload(pieceId: string) {
    this._pieceShow.id = pieceId;
    this._pieceShow.empty = false;
    this.findPiece();
  }

  onChangeFeedbackAction(action: string) {
    this.feedbackAction = action;
  }

  showModalWarning(data) {
    this.modalWarning.openModal(data.title, data.description);
  }
  // On click toastr dont show tutorial again
  onDontShowAgain() {
    console.log('dont show tutorial again implementation');
  }
  onTutorialEnd() {
    this.hasTour = false;
  }
  /**
   * Emit on pin/shape is working
   * @param isWorkingPoint
   */
  pieceOnWorkingPoint(isWorkingPoint) {
    this.pointIsWorking = isWorkingPoint;
  }
  /**
   * On window resize calculate ration and hide toolbar shape
   * @param event
   */
  @HostListener('window:resize', ['$event']) onResize(event) {
    // Fix if not comments

    if (!this.piece.empty) {
      if (this.piece.type === 'image') {
        this.pieceComponent.calculateRatioPiece();
        this.pieceComponent.loadCommentThreads();
      }
      if (this.piece.type === 'video') {
        this.pieceVideoComponent.restartVideoPlayer();
        this.pieceVideoComponent.calculateRatio();
        // this.pieceVideo.loadCommentThreads();
      }
    }
    setTimeout(() => {
      this._feedbackToolbarService.onFocusShape(new FeedbackFocusShape(false, null));
    });
  }

  /**
   * On click window
   * @param event
   */
  @HostListener('window:click', ['$event']) onClick(event) {
    const target = $(event.target);
    if (!this.pointIsWorking) {
      if (target.closest('.comment-thread-shape').length === 0 &&
        target.closest('.toolbar-feedback-shape').length === 0
      ) {
        this._feedbackToolbarService.onFocusShape(new FeedbackFocusShape(false, null));
      }
    }
  }
  // On destroy
  ngOnDestroy() {
    if (this.subscriptionCommentThreadFilter) {
      this.subscriptionCommentThreadFilter.unsubscribe();
    }
    if (this.subscriptionPopup) {
      this.subscriptionPopup.unsubscribe();
    }
 
  }
}

import { Component, OnInit, ViewChild, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Piece } from '../../../models/feedback/piece';
import { CommentThreadStatus } from '../../../models/comments/comment-thread-status';
import { ParticipantType } from '../../../models/participants/participant-type';
import { AsidenavComponent } from '../../shared-sidenav/asidenav/asidenav.component';
import { FeedbackStrategyService } from '../../../services/feedback/feedback-strategy.service';
import { FeedbackWorkflowService } from '../services/feedback-workflow.service';
import { CommentComunicationService, CommentThreadFilter } from '../../comment-thread/services/comment-comunication.service';
import { ComparedVersion, FeedbackVersionComunicationService } from '../services/feedback-version-comunication.service';


@Component({
  selector: 'app-feedback-versions-sidenav,[app-feedback-versions-sidenav]',
  templateUrl: './feedback-versions-sidenav.component.html',
  styleUrls: ['./feedback-versions-sidenav.component.scss'],
  providers: [FeedbackVersionComunicationService]
})
export class FeedbackVersionsSidenavComponent implements OnInit, AfterViewInit, OnDestroy {
  public view = 'chooser';
  public maintainComments = true;
  public uploading = false;
  public isShowSidenav = false;
  public selectedFile;
  public preview;
  public piece: Piece;
  public comparedVersions: Array<ComparedVersion> = new Array<ComparedVersion>();
  public filterStatuses: Array<CommentThreadStatus> = new Array<CommentThreadStatus>();
  public filterParticipantTypes: Array<ParticipantType> = new Array<ParticipantType>();
  // Subscriptions
  public subscriptionShowSidenav: ISubscription;
  public subscriptionShowPieceLeftSidenav: ISubscription;
  public subscriptionComparedVersions: ISubscription;
  public subscriptionCommentThreadFilter: ISubscription;
  // Services
  private _feedbackService;
  // Input
  @Input() pieceShow: Piece;
  @Input() isFeedbackVideo: boolean;
  @Input() versions: Array<Piece>;
  @Input() pieces: Array<Piece>;
  @Input() leftSidenavCompressed: boolean;
  @Input() commentThreadStatuses: Array<CommentThreadStatus>;
  @Input() participantTypes: Array<ParticipantType>;
  // View child
  @ViewChild('feedbackVersionsSidenav') versionsSidenav: AsidenavComponent;
  constructor(
    private _feedbackServiceStrategy: FeedbackStrategyService,
    private _feedbackWorkflowService: FeedbackWorkflowService,
    private _feedbackVersionComunicationService: FeedbackVersionComunicationService,
    private _commentComunicationService: CommentComunicationService
  ) {
    // this._feedbackVersionComunicationService.loadCompareVersions();
    this._feedbackService = this._feedbackServiceStrategy.getService();
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.subscriptionShowSidenav = this._feedbackWorkflowService.sidenavVersions.subscribe(data => {
      // console.log(data);
      if (data.show) {
        this.showSidenav();
        this.view = 'chooser';
        if (data.piece.latest) {
          
          this._feedbackService.findVersions(data.piece.id).subscribe((versions) => {
            this.versions = versions;
          });
        }
        if (!data.piece.latest) {
          this._feedbackService.findVersions(data.piece.parentId).subscribe((versions) => {
            this.versions = versions;
          });
        }
      } else {
        if (this.isShowSidenav) {
          this.hideSidenav();
        }
      }
    });
    this.subscriptionShowPieceLeftSidenav = this._feedbackWorkflowService.pieceShow.subscribe(piece => {
      if (this.isShowSidenav) {
        // Because in versions sidenav show with this observable
        if (piece.latest) {
          this._feedbackService.findVersions(piece.id).subscribe((versions) => {
            this.versions = versions;
          });
        }
      }
    });
    this.subscriptionComparedVersions =
      this._feedbackVersionComunicationService.compareVersionsObs.subscribe((comparedVersions: Array<ComparedVersion>) => {
        this.comparedVersions = Object.assign([], comparedVersions);
        console.log(comparedVersions);
      });
    this.subscriptionCommentThreadFilter = this._commentComunicationService.commentThreadFilterObs.subscribe(
      (filter: CommentThreadFilter) => {

        this.filterStatuses = Object.assign([], filter.statuses);
        this.filterParticipantTypes = Object.assign([], filter.praticipantTypes);
      });

  }
  showSidenav() {
    this.versionsSidenav.showSidenav();
  }

  onShow() {
    this.isShowSidenav = true;
    // this.feedbackPiece = Object.assign({}, this.feedbackPieces.filter(piece => piece.show)[0]);

  }
  onHide() {
    this.isShowSidenav = false;
  }

  onShowVersion(feedbackPiece: Piece) {
    this._feedbackWorkflowService.showPiece(feedbackPiece);
  }
  hideSidenav() {
    this._feedbackVersionComunicationService.loadCompareVersions([]);
    this.versionsSidenav.hideSidenav();
  }



  onCompareVersion(feedbackPiece: Piece) {
    this._feedbackVersionComunicationService.addCompareVersion(feedbackPiece);
  }
  onRemoveCompare(feedbackPiece: Piece) {
    this._feedbackVersionComunicationService.removeCompareVersion(feedbackPiece.id);
  }
  ngOnDestroy() {
    if (this.subscriptionShowSidenav) {
      this.subscriptionShowSidenav.unsubscribe();
    }
    if (this.subscriptionShowPieceLeftSidenav) {
      this.subscriptionShowPieceLeftSidenav.unsubscribe();
    }
    if (this.subscriptionComparedVersions) {
      this.subscriptionComparedVersions.unsubscribe();
    }
    if (this.subscriptionCommentThreadFilter) {
      this.subscriptionCommentThreadFilter.unsubscribe();
    }
  }


}

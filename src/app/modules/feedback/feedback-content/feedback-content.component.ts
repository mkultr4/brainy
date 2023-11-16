import { Component, OnInit, HostListener, AfterContentInit, OnDestroy, ViewChild, AfterViewInit, Renderer } from '@angular/core';
import { FeedbackStrategyService } from '../../../services/feedback/feedback-strategy.service';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { RolService } from '../../../services/roles/rol.service';
import { ISubscription } from 'rxjs/Subscription';
import { WorkflowService } from '../../../services/workflow/workflow.service';
import { Feedback } from '../../../models/feedback/feedback';
import { Router, ActivatedRoute } from '@angular/router';
import { CoreStatus } from '../../../models/cores/core-status';
import { Piece } from '../../../models/feedback/piece';
import { FeedbackWorkflowService } from '../services/feedback-workflow.service';
import { ModalApproveCoreComponent } from '../../shared-core/modal-approve-core/modal-approve-core.component';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';
import { InvitationStrategyService } from '../../../services/invitations/invitation-strategy.service';
import { InvitationLevel } from '../../../models/invitations/invitation-level';
import { Rol } from '../../../models/workspace/rol';
import { Category } from '../../../models/categories/category';
import { ParticipantType } from '../../../models/participants/participant-type';
import { CommentThreadStatus } from '../../../models/comments/comment-thread-status';
import { RolStrategyService } from '../../../services/roles/rol-strategy.service';
import { CategoryStrategyService } from '../../../services/categories/category-strategy.service';
import { CommentThreadStrategyService } from '../../../services/comments/comment-thread-strategy.service';
import { CommentComunicationService } from '../../comment-thread/services/comment-comunication.service';
import { CommentThreadType } from '../../../models/comments/comment-thread-type';
import { IframelyStrategyService } from '../../../services/iframely/iframely-strategy.service';
import { ModalCommentsPendingComponent } from '../../shared-core/modal-comments-pending/modal-comments-pending.component';
import { CommentThread } from '../../../models/comments/comment-thread';
import { subscribeOn } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { ModalAlertApproveCoreComponent } from '../../shared-core/modal-alert-approve-core/modal-alert-approve-core.component';
import { FeedbackPieceWrapperComponent } from '../feedback-piece-wrapper/feedback-piece-wrapper.component';
import { MeetingNoteStrategyService } from '../../../services/meeting-note/meeting-note-strategy.service';

@Component({
  selector: 'app-feedback-content',
  templateUrl: './feedback-content.component.html',
  styleUrls: ['./feedback-content.component.scss'],
  providers: [
    FeedbackStrategyService,
    CommentThreadStrategyService,
    CommentComunicationService,
    IframelyStrategyService,
    MeetingNoteStrategyService
  ]
})
export class FeedbackContentComponent implements OnInit, AfterContentInit,
  AfterViewInit, OnDestroy {
  // Public
  public id;
  public workspaceAccess: WorkspaceAccess;
  public feedback: Feedback = new Feedback();
  public pieces = [];
  public pieceShow: Piece;
  public coreStatuses: CoreStatus[];
  public rightSidenavCompressed = false;
  public leftSidenavCompressed = false;
  // Workflow
  public feedbackAction = 'pin';
  public isFeedbackVideo = false;
  public candAddVideo = false;
  public hasTour = false;
  public forceError = false;
  public zoom = 100;
  public create = false;
  public showModalWarning = true;
  public unreadMessages = false;
  public simulateEdition = false;
  public showIsReadyToApproveCount = 0;
  // Permissions
  public isAdmin = false;
  public editable = false;
  public canShare = false;
  public canApprove = false;
  public isApprover = false;
  public showPendingInvitations = false;
  public withoutInvitations = false;
  // Comments
  public commentThreadStatuses: Array<CommentThreadStatus>;
  public commentThreadTypes: Array<CommentThreadType>;
  public participantTypes: Array<ParticipantType>;
  public categories: Array<Category>;
  public roles: Array<Rol>;
  // Subscriptions
  public subscriptionRouterParmas: ISubscription;
  public subscriptionCore: ISubscription;
  public subscriptionPieces: ISubscription;
  public subscriptionRightSidenav: ISubscription;
  public subscriptionLeftSidenav: ISubscription;
  public subscriptionPieceShow: ISubscription;
  public subscriptionZoom: ISubscription;
  public subscriptionQueryParams: ISubscription;
  public subscriptionCommentToGo: ISubscription;
  public subscriptionCheckFeedbackStatus: ISubscription;
  // Private
  private _coreService;
  private _feedbackService;
  private _invitationService;
  private _rolService;
  private _categoryService;
  private _commentThreadService;
  // View Childs
  @ViewChild('modalApprove') modalApprove: ModalApproveCoreComponent;
  @ViewChild('modalCommentsPending') modalCommentsPending: ModalCommentsPendingComponent;
  @ViewChild('modalAlertApprove') modalAlertApprove: ModalAlertApproveCoreComponent;
  @ViewChild('pieceWrapper') pieceWrapper: FeedbackPieceWrapperComponent;
  constructor(
    private _router: Router,
    private _renderer: Renderer,
    private _coreStategyService: CoreStrategyService,
    private _activatedRoute: ActivatedRoute,
    private _feedbackStrategyService: FeedbackStrategyService,
    private _workflowService: WorkflowService,
    private _authService: AuthenticationService,
    private _feedbackWorkflowService: FeedbackWorkflowService,
    private _invitationStartegyService: InvitationStrategyService,
    private _rolStrategyService: RolStrategyService,
    private _categoryStrategyService: CategoryStrategyService,
    private _commentThreadStrategyService: CommentThreadStrategyService,
    private _commentComunicationService: CommentComunicationService,
    private _toastrService: ToastrService
  ) {
    // Strategy service
    this._feedbackService = this._feedbackStrategyService.getService();
    this._coreService = this._coreStategyService.getService();
    this._invitationService = this._invitationStartegyService.getService();
    this._rolService = this._rolStrategyService.getService();
    this._categoryService = this._categoryStrategyService.getService();
    this._commentThreadService = this._commentThreadStrategyService.getService();
    // Workspace
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
    // Permissions
    this.isAdmin = RolService.isAdminRol(this.workspaceAccess.rol.key);
    this.editable = RolService.isAdminRol(this.workspaceAccess.rol.key) ||
      RolService.isManagerRol(this.workspaceAccess.rol.key)
      || this.workspaceAccess.groupReference === 'editor';
    this.canShare = RolService.isAdminRol(this.workspaceAccess.rol.key) ||
      RolService.isManagerRol(this.workspaceAccess.rol.key);
    this.isApprover = this.workspaceAccess.groupReference === 'approver';
    this.canApprove = RolService.isAdminRol(this.workspaceAccess.rol.key)
      || RolService.isManagerRol(this.workspaceAccess.rol.key)
      || this.workspaceAccess.groupReference === 'approver';
    this.showPendingInvitations = RolService.isAdminRol(this.workspaceAccess.rol.key) ||
      RolService.isManagerRol(this.workspaceAccess.rol.key);

      this.subscriptionRouterParmas = this._activatedRoute.params.subscribe(params => {
        this.id = (params['id']);
      });
  }

  ngOnInit() {
    // Query params
    this.subscriptionQueryParams = this._activatedRoute.queryParams.subscribe(params => {
      this.create = Boolean(params['create']);
      this.forceError = Boolean(params['forceError']);
      this.hasTour = Boolean(params['tour']);
      this.unreadMessages = Boolean(params['unreadMessages']);
      this.showModalWarning = Boolean(params['showModalWarning']);
      this.withoutInvitations = Boolean(params['withoutInvitations']);
      // Show to approver when the feedback has change
      this.simulateEdition = Boolean(params['simulateEdition']);
    });

    // Core subscription
    this.subscriptionCore = this._coreService.core.subscribe(core => {
      console.log(core);
      this.feedback = Object.assign(new Feedback(), <Feedback>core);
    });
    // Pieces
    this.subscriptionPieces = this._feedbackService.pieces.subscribe(pieces => {
      this.pieces = Object.assign([], pieces);
      // If not have selected select first
      if (!this.pieceShow && this.pieces[0]) {
        this.pieceShow = Object.assign({}, this.pieces[0]);
      }

      this.isFeedbackVideo = this.pieces && this.pieces.filter(p => p.empty === false && p.type === 'video').length > 0;

      this.candAddVideo = this.pieces && this.pieces.filter(p => p.empty === false && p.type === 'image').length === 0;
    });

  }

  ngAfterContentInit() {
    this._renderer.setElementClass(document.body, 'overflow-hidden', true);
    // Get data
    this._rolService.getAllRoles().subscribe(roles => {
      this.roles = roles.filter(r => r.key !== 'admin' && r.key !== 'super-admin');
    });
    this._categoryService.getAllCategories().subscribe(categories => {
      this.categories = categories;
    });
    
    this._commentThreadService.getCommentThreadStatuses().subscribe(statuses => {
      this.commentThreadStatuses = statuses;
    });
    this._commentThreadService.getCommentThreadTypes().subscribe(types => {
      this.commentThreadTypes = types;
    })
    this._commentThreadService.getParticipantTypes().subscribe(participantTypes => {
      this.participantTypes = participantTypes;
    });
    this._coreService.getAllStatus().subscribe(statuses => {
      this.coreStatuses = statuses.filter(s => s.key !== 'archived' && s.key !== 'canceled');
    });
    if (this.id) {
      this._coreService.loadById(this.id,'feedback','edit').subscribe(core => {
        if (core && core.id) {
          // Load invitations
          this._invitationService.loadAll(InvitationLevel.CORE, this.id, this.withoutInvitations).subscribe((invitations) => {

          });
          // Load pieces
          this._feedbackService.loadPiecesById(this.id, this.create, this.unreadMessages).subscribe(pieces => {
          });
        } else {
          this._router.navigate(['dashboard']);
        }
      });


    } else {
      this._router.navigate(['dashboard']);
    }


    // Subscription Piece show
    this.subscriptionPieceShow = this._feedbackWorkflowService.pieceShow.subscribe(pieceToShow => {
      this.pieceShow = pieceToShow;
    });
    // Subscription zoom
    this.subscriptionZoom = this._feedbackWorkflowService.zoom.subscribe((zoom) => {
      this.zoom = zoom;
    });
  }

  ngAfterViewInit() {

    setTimeout(() => {
         // Subscription sidenav show or hide
         this.subscriptionRightSidenav = this._workflowService.sidenavRightCompressed.subscribe(compress => {
          this.rightSidenavCompressed = compress;
        });
        // Subscription sidenav show or hide
        this.subscriptionLeftSidenav = this._workflowService.sidenavLeftCompressed
          .subscribe(compressed => {
            this.leftSidenavCompressed = compressed;
          });
      // Resize first time
      this.resize();
   
      this.subscriptionCheckFeedbackStatus = this._feedbackWorkflowService
        .checkFeedabckStatus
        .subscribe((commentThread: CommentThread) => {
          // Only if ready to apporve change the status
          this._feedbackService.checkIsReadyToApprove().subscribe(readyToApprove => {
            if (!readyToApprove && this.feedback.status.key === 'to-be-approved') {
              // const statusLastComment = commentThread.status.key;
              const inProcessStatus = this.coreStatuses.filter(s => s.key === 'process')[0];
              this.feedback.status = inProcessStatus;
              this._coreService.updateStatus(inProcessStatus).subscribe();
            } else if (readyToApprove) {

              if (this.workspaceAccess.groupReference === 'approver') {
                this._toastrService.info('El feedback esta listo para aprobar.');
              }
              const toBeApprovedStatus = this.coreStatuses.filter(s => s.key === 'to-be-approved')[0];
              this.feedback.status = toBeApprovedStatus;
              this._coreService.updateStatus(toBeApprovedStatus).subscribe();
            }
          })
        });
      if (this.simulateEdition) {
        this.simulateEditionFn();
      }
    });
  }

  // Simulate edition only Frony
  simulateEditionFn() {
    setTimeout(() => {
      if (this.pieceWrapper && this.pieceWrapper.piece) {
        this.pieceWrapper.piece.edited = true;
        setTimeout(() => {
          if (this.workspaceAccess.groupReference === 'approver') {
            this.modalAlertApprove.openModal();
          }
        }, 1500);
      }
    }, 2000);

  }
  /**
    * Resize layout
    */
  resize() {
    console.log('resize',window.innerWidth);
    // If window is minor to 1200px
    if (window.innerWidth < 1200) {
      this._workflowService.compressRightSidenav(true);
    } else {
      this._workflowService.compressRightSidenav(false);
    }
    if (window.innerWidth < 992) {
      this._workflowService.compressLeftSidenav(true);

    } else {
      this._workflowService.compressLeftSidenav(false);
    }
  }


  // Rezise
  @HostListener('window:resize', ['$event']) onResize(event) {
    this.resize();
  }

  // On change to approved
  onApprove() {
    if (this.canApprove) {
      this._feedbackService.getCommentsUnresolved().subscribe(commentPendings => {
        if (commentPendings.length > 0) {
          this.modalCommentsPending.openModal(commentPendings);
        } else {
          this.modalApprove.openModal();
        }
      });

    }
  }

  onApproveAccept() {

    this._router.navigate(['/feedback/close/', this.id]);
  }
  // On destroy
  ngOnDestroy() {
    if (this.subscriptionCore) {
      this.subscriptionCore.unsubscribe();
    }
    if (this.subscriptionPieces) {
      this.subscriptionPieces.unsubscribe();
    }
    if (this.subscriptionLeftSidenav) {
      this.subscriptionLeftSidenav.unsubscribe();
    }
    if (this.subscriptionRightSidenav) {
      this.subscriptionRightSidenav.unsubscribe();
    }
    if (this.subscriptionRouterParmas) {
      this.subscriptionRouterParmas.unsubscribe();
    }
    if (this.subscriptionPieceShow) {
      this.subscriptionPieceShow.unsubscribe();
    }
    if (this.subscriptionZoom) {
      this.subscriptionZoom.unsubscribe();
    }
    if (this.subscriptionCommentToGo) {
      this.subscriptionCommentToGo.unsubscribe();
    }
    if (this.subscriptionCheckFeedbackStatus) {
      this.subscriptionCheckFeedbackStatus.unsubscribe();
    }

    this._renderer.setElementClass(document.body, 'overflow-hidden', false);
  }

}

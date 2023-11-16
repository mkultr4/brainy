import { Component, OnInit, HostListener, ViewChild, AfterContentInit, AfterViewInit } from '@angular/core';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { Feedback } from '../../../models/feedback/feedback';
import { Piece } from '../../../models/feedback/piece';
import { Invitation } from '../../../models/invitations/invitation';
import { PaginationInstance } from 'ngx-pagination';
import { ISubscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { RoutingStateService } from '../../../services/routing-state.service';
import { RolService } from '../../../services/roles/rol.service';
import { FeedbackClosePieceComponent } from '../feedback-close-piece/feedback-close-piece.component';
import { InvitationLevel } from '../../../models/invitations/invitation-level';
import { FeedbackStrategyService } from '../../../services/feedback/feedback-strategy.service';
import { NotificationStrategyService } from '../../../services/notifications/notification-strategy.service';
import { WorkflowService } from '../../../services/workflow/workflow.service';
import { InvitationStrategyService } from '../../../services/invitations/invitation-strategy.service';
import { CommentThreadStrategyService } from '../../../services/comments/comment-thread-strategy.service';
import { CommentComunicationService } from '../../comment-thread/services/comment-comunication.service';
import { Notification } from '../../../models/notifications/notification';
import { ModalNotificationCoreComponent } from '../../shared-core/modal-notification-core/modal-notification-core.component';
import { ModalRequestPermissionAcceptComponent } from '../../shared-core/modal-request-permission-accept/modal-request-permission-accept.component';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';
import { CoreStatus } from '../../../models/cores/core-status';

@Component({
  selector: 'app-feedback-close-content',
  templateUrl: './feedback-close-content.component.html',
  styleUrls: ['./feedback-close-content.component.scss'],
  providers: [
    WorkflowService,
    FeedbackStrategyService,
    CommentThreadStrategyService,
    CommentComunicationService
  ]
})
export class FeedbackCloseContentComponent implements OnInit, AfterContentInit, AfterViewInit {

  public id: any;
  public workspaceAccess: WorkspaceAccess;
  public feedback: Feedback;
  public pieces: Piece[];
  public pieceShow: Piece;
  public rightSidenavCompressed = false;
  public leftSidenavCompressed = false;
  public invitations: Invitation[];
  public notifications = Array<Notification>();
  public notificationCount = 0;
  public paginationMaxWidth = '100%';
  public coreStatuses: CoreStatus[];
  // Pagination
  public paginationConfig: PaginationInstance = {
    id: 'custom',
    itemsPerPage: 1,
    currentPage: 1,
    totalItems: 0
  };
  // Permission
  public canShare = false;
  public canRequestModification = false;
  public canRequestOpen = false;
  public canRequestOpenDirect = true;
  // Subscriptions
  public subscriptionParams: ISubscription;
  public subscriptionQueryParams: ISubscription;
  public subscriptionLeftSidenav: ISubscription;
  // Worksflow edition
  public notificationEditon = false;
  public notificationRequestPermission = false;
  // Services
  private _notificationService;
  private _feedbackService;
  private _invitationService;
  private _coreService;
  // View childs
  @ViewChild('pieceShowEl') piceCloseComp: FeedbackClosePieceComponent;
  @ViewChild('modalNotificationCore') modalNotificationCore: ModalNotificationCoreComponent;
  @ViewChild('modalRequestPermissionAccept') modalRequestPermissionAccept: ModalRequestPermissionAcceptComponent;
  constructor(
    private _router: Router,
    private _authService: AuthenticationService,
    private _activatedRoute: ActivatedRoute,
    private _routingState: RoutingStateService,
    private _workflowService: WorkflowService,
    private _feedbackStrategyService: FeedbackStrategyService,
    private _notificationStrategyService: NotificationStrategyService,
    private _invitationStrategyService: InvitationStrategyService,
    private _coreStrategyService: CoreStrategyService


  ) {
    // Strategy
    this._coreService = this._coreStrategyService.getService();
    this._feedbackService = this._feedbackStrategyService.getService();
    this._notificationService = this._notificationStrategyService.getService();
    this._invitationService = this._invitationStrategyService.getService();
    // Current workspace access
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
    // Permissions
    this.canShare = RolService.isAdminRol(this.workspaceAccess.rol.key) ||
      RolService.isManagerRol(this.workspaceAccess.rol.key)
    this.canRequestModification = RolService.isAdminRol(this.workspaceAccess.rol.key) ||
      RolService.isManagerRol(this.workspaceAccess.rol.key);
    this.canRequestOpen = this.workspaceAccess.groupReference === 'editor';
    this.canRequestOpenDirect = this.workspaceAccess.groupReference === 'approver';

    this.subscriptionParams = this._activatedRoute.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.id = id;
      } else {
        const redirect = this._routingState.getPreviousUrl();
        this._router.navigate([redirect]);
      }
    });
    this.subscriptionQueryParams = this._activatedRoute.queryParams.subscribe(params => {
      this.notificationEditon = Boolean(params['notificationRequestModification']);
      this.notificationRequestPermission = Boolean(params['notificationRequestPermission']);

    });
  }

  ngOnInit() {
    
  }
  // After content init
  ngAfterContentInit() {
    // Feedback
    this._coreService.loadById(this.id,'feedback','approved').subscribe(feedback => {
      if (feedback && feedback.status.key === 'approved') {
        console.log(feedback);
        this.feedback = feedback;
        // Piece
        this._feedbackService.findPiecesFeedbackClose(this.id).subscribe(pieces => {
          this.pieces = pieces;
          this.paginationConfig.totalItems = this.pieces.length;
        });
        this._invitationService
          .loadAllCloseCore(InvitationLevel.CORE, this.id)
          .subscribe(invitations => {
            console.log(invitations);
            this.invitations = invitations;
          });
      } else {
        // const redirect = this._routingState.getPreviousUrl();
        this._router.navigate(['dashboard']);
      }
    });

    this._coreService.getAllStatus().subscribe(statuses => {
      this.coreStatuses = statuses.filter(s => s.key !== 'archived' && s.key !== 'canceled');
    });
    // Subscription sidenav show or hide
    this.subscriptionLeftSidenav = this._workflowService.sidenavLeftCompressed
      .subscribe(compressed => {
        this.leftSidenavCompressed = compressed;
      });

    this.resize();
  }
  ngAfterViewInit() {
    // Notifications
    setTimeout(() => {
      this._notificationService.getNotifications(this.workspaceAccess.user.id, this.id,
        'feedback', this.notificationEditon, this.notificationRequestPermission)
        .subscribe(notifications => {
          console.log('proccessNotifications');
          this.notifications = notifications;
          if (this.notifications.length > 0) {
            this.proccessNotifications();
          }
        });
    })
  }

  /**
   * On page change
   * @param page
   */
  onPageChange(page) {
    this.paginationConfig.currentPage = page;
  }
  /**
   * On select piece
   * @param show
   */
  onSelectPiece(show: Piece) {
    const index = this.pieces.indexOf(show);
    this.paginationConfig.currentPage = index + 1;
  }
  /**
   * On change ration piece
   * @param sizes
   */
  onChangeRatio(sizes) {
    console.log(sizes);
    this.paginationMaxWidth = sizes.width + 'px';
  }
  resize() {
    if (window.innerWidth < 1200) {
      this._workflowService.compressLeftSidenav(true);

    } else {
      this._workflowService.compressLeftSidenav(false);
    }
  }
  private proccessNotifications() {
    if (this.notificationCount < this.notifications.length) {

      const notification = this.notifications[this.notificationCount];
      if (notification.type.key === 'modal-request-permission') {
        this.showNotificationRequestModification(notification);
      } else {
        this.showNotification(notification);
      }
    }
  }
  private showNotification(notification: Notification) {
    this.modalNotificationCore.openModal(notification);
  }
  private showNotificationRequestModification(notification: Notification) {
     this.modalRequestPermissionAccept.openModal(this.workspaceAccess, notification, this.feedback);
  }
  /**
   * On close modal notification
   * @param notification
   */
  modalNotificationOnClose(notification: Notification) {
    // Mark read on close
    this._notificationService.markReadAlertNotification(notification.id).subscribe();
    // Workflow
    this.notificationCount = this.notificationCount + 1;
    setTimeout(() => {
      this.proccessNotifications();
    });
  }

  modalOnAcceptPermission() {
    this._router.navigate(['/feedback', this.feedback.id]);
  }

  // Rezise
  @HostListener('window:resize', ['$event']) onResize(event) {
    this.resize();
    setTimeout(() => {
      this.piceCloseComp.calculateRatioPiece();
    });

  }

  ngOnDestroy() {
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
    if (this.subscriptionLeftSidenav) {
      this.subscriptionLeftSidenav.unsubscribe();
    }
    if (this.subscriptionQueryParams) {
      this.subscriptionQueryParams.unsubscribe();
    }
  }

}

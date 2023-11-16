import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { InvitationLevel } from 'src/app/models/invitations/invitation-level';
import { BriefCategory } from 'src/app/models/brief/brief-category';
import { Invitation } from 'src/app/models/invitations/invitation';
import { CoreStatus } from 'src/app/models/cores/core-status';
import { Notification } from 'src/app/models/notifications/notification';
import { ISubscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { RoutingStateService } from 'src/app/services/routing-state.service';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { NotificationStrategyService } from 'src/app/services/notifications/notification-strategy.service';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';
import { CoreStrategyService } from 'src/app/services/cores/core-strategy.service';
import { FileUtilService } from 'src/app/services/utils/file-util.service';
import { ToastrService } from 'ngx-toastr';
import { RolService } from 'src/app/services/roles/rol.service';
import { ModalRequestPermissionAcceptComponent } from '../../shared-core/modal-request-permission-accept/modal-request-permission-accept.component';
import { ModalNotificationCoreComponent } from '../../shared-core/modal-notification-core/modal-notification-core.component';
import { Brief } from 'src/app/models/brief/brief';
import { CommentThreadStrategyService } from 'src/app/services/comments/comment-thread-strategy.service';
import { CommentComunicationService } from '../../comment-thread/services/comment-comunication.service';
@Component({
  selector: 'app-brief-close-content',
  templateUrl: './brief-close-content.component.html',
  styleUrls: ['./brief-close-content.component.scss'],
  providers: [
    BriefStrategyService,
    CommentThreadStrategyService,
    CommentComunicationService
  ]
})
export class BriefCloseContentComponent implements OnInit, OnDestroy {
  public id: any;
  public workspaceAccess: WorkspaceAccess;
  public brief: Brief;
  public categories: BriefCategory[];
  public invitations: Invitation[];
  public notifications = Array<Notification>();
  public notificationCount = 0;
  public coreStatuses: CoreStatus[];
  public templateType = 'brief';
  public givebacks = [];
  public finalists = [];
  public showBrand = false;
  // Permission
  public canShare = false;
  public canRequestModification = false;
  public canRequestOpen = false;
  public canRequestOpenDirect = true;
  // Subscriptions
  public subscriptionParams: ISubscription;
  public subscriptionQueryParams: ISubscription;
  // Worksflow edition
  public notificationEditon = false;
  public notificationRequestPermission = false;
  // Services
  private _notificationService;
  private _briefService;
  private _invitationService;
  private _coreService;
  // View childs
  @ViewChild('modalNotificationCore') modalNotificationCore: ModalNotificationCoreComponent;
  @ViewChild('modalRequestPermissionAccept') modalRequestPermissionAccept: ModalRequestPermissionAcceptComponent;
  constructor(
    private _router: Router,
    private _authService: AuthenticationService,
    private _activatedRoute: ActivatedRoute,
    private _routingState: RoutingStateService,
    private _briefStrategyService: BriefStrategyService,
    private _notificationStrategyService: NotificationStrategyService,
    private _invitationStrategyService: InvitationStrategyService,
    private _coreStrategyService: CoreStrategyService,
    private _filteUtilService: FileUtilService,
    private _toastrService: ToastrService


  ) {
    // Strategy
    this._coreService = this._coreStrategyService.getService();
    this._briefService = this._briefStrategyService.getService();
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
      this.notificationEditon = params['notificationRequestModification'] === 'true' ? true : false;
      this.notificationRequestPermission = params['notificationRequestPermission'] === 'true' ? true : false;
      if (params['templateType']) {
        this.templateType = params['templateType'];
      }

    });
  }

  ngOnInit() {

  }
  // After content init
  ngAfterContentInit() {
    // Meeting note
    this._briefService.getBriefCloseById(this.id, this.templateType).subscribe(brief => {
      console.log(brief);
      if (brief && brief.status.key === 'approved') {
        this.brief = brief;
        if (this.brief.template.typeTemplate.key === 'pitch') {
          this.showBrand = true;
        }
        // Topics
        this._briefService.findCategoriesClose(this.id).subscribe(categories => {
          this.categories = categories;
        });
        if (this.brief.template.typeTemplate.key === 'pitch') {
          this._briefService.findGivebacksClose(this.id).subscribe(givebacks => {
            this.givebacks = givebacks;
          });
          this._briefService.findProposalsWinnersClose(this.id).subscribe(finalists => {
            this.finalists = finalists;
          })
        }

        this._invitationService.loadAllCloseCore(InvitationLevel.CORE, this.id, this.showBrand)
          .subscribe(invitations => {
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


  }
  ngAfterViewInit() {
    // Notifications
    setTimeout(() => {
      this._notificationService.getNotifications(this.workspaceAccess.user.id, this.id,
        'brief', this.notificationEditon, this.notificationRequestPermission)
        .subscribe(notifications => {
          this.notifications = notifications;
          if (this.notifications.length > 0) {
            this.proccessNotifications();
          }
        });
    })
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
    this.modalRequestPermissionAccept.openModal(this.workspaceAccess, notification, this.brief);
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
    this._router.navigate(['/meeting-note', this.brief.id]);
  }

  // Change cover imgage

  chooseFile(readFile: File) {

    if (readFile) {
      let valid = true;
      const file = readFile;
      if (!this._filteUtilService.validateFileExtension(file, 'image')) {
        valid = false;
        this._toastrService.info('Solo puedes subir archivos SVG, JPG, PNG y TIFF.');
      }
      if (!this._filteUtilService.validateFileSize(file, 'image', '30')) {
        valid = false;
        this._toastrService.info('El tamaño maximo de imagen es de ' + this._filteUtilService.maxFileSizeImage + 'MB');
      }
      if (valid) {
        this._coreService.changeCoverImage(this.brief.id, readFile).subscribe(url => {
          this.brief.coverImage = url;
        });
      }

    }

  }
  ngOnDestroy() {
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
    if (this.subscriptionQueryParams) {
      this.subscriptionQueryParams.unsubscribe();
    }
  }
}

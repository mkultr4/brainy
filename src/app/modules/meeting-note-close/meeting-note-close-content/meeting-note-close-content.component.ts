import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { MeetingNote } from 'src/app/models/meeting-note/meeting-note';
import { Topic } from 'src/app/models/meeting-note/topic';
import { Invitation } from 'src/app/models/invitations/invitation';
import { ModalRequestPermissionAcceptComponent } from '../../shared-core/modal-request-permission-accept/modal-request-permission-accept.component';
import { ModalNotificationCoreComponent } from '../../shared-core/modal-notification-core/modal-notification-core.component';
import { CoreStatus } from 'src/app/models/cores/core-status';
import { ISubscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { RoutingStateService } from 'src/app/services/routing-state.service';
import { MeetingNoteStrategyService } from 'src/app/services/meeting-note/meeting-note-strategy.service';
import { NotificationStrategyService } from 'src/app/services/notifications/notification-strategy.service';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';
import { CoreStrategyService } from 'src/app/services/cores/core-strategy.service';
import { RolService } from 'src/app/services/roles/rol.service';
import { Notification } from 'src/app/models/notifications/notification';
import { InvitationLevel } from 'src/app/models/invitations/invitation-level';
import { FileUtilService } from 'src/app/services/utils/file-util.service';
import { ToastrService } from 'ngx-toastr';
import { CommentThreadStrategyService } from 'src/app/services/comments/comment-thread-strategy.service';
import { CommentComunicationService } from '../../comment-thread/services/comment-comunication.service';
import { Task } from 'src/app/models/meeting-note/task';
@Component({
  selector: 'app-meeting-note-close-content',
  templateUrl: './meeting-note-close-content.component.html',
  styleUrls: ['./meeting-note-close-content.component.scss'],
  providers: [
    MeetingNoteStrategyService,
    CommentThreadStrategyService,
    CommentComunicationService
  ]
})
export class MeetingNoteCloseContentComponent implements OnInit, OnDestroy {
  public id: any;
  public workspaceAccess: WorkspaceAccess;
  public meetingNote: MeetingNote;
  public topics: Topic[];
  public tasks: Task[];
  public invitations: Invitation[];
  public notifications = Array<Notification>();
  public notificationCount = 0;
  public paginationMaxWidth = '100%';
  public coreStatuses: CoreStatus[];

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
  private _meetingNoteService;
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
    private _meetingNoteStrategyService: MeetingNoteStrategyService,
    private _notificationStrategyService: NotificationStrategyService,
    private _invitationStrategyService: InvitationStrategyService,
    private _coreStrategyService: CoreStrategyService,
    private _filteUtilService: FileUtilService,
    private _toastrService: ToastrService


  ) {
    // Strategy
    this._coreService = this._coreStrategyService.getService();
    this._meetingNoteService = this._meetingNoteStrategyService.getService();
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
    // Meeting note
    this._meetingNoteService.getMeetingNoteCloseById(this.id).subscribe(meetingNote => {
      if (meetingNote && meetingNote.status.key === 'approved') {
        this.meetingNote = meetingNote;
        // Topics
        this._meetingNoteService.findTopicsMeetingNoteClose(this.id).subscribe(topics => {
          this.topics = topics;
        });
        this._meetingNoteService.findTasksMeetingNoteClose(this.id).subscribe(tasks => {
          this.tasks = tasks;
        });
        this._invitationService.loadAllCloseCore(InvitationLevel.CORE, this.id)
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


  }
  ngAfterViewInit() {
    // Notifications
    setTimeout(() => {
      this._notificationService.getNotifications(this.workspaceAccess.user.id, this.id,
        'meeting-note', this.notificationEditon, this.notificationRequestPermission)
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
    this.modalRequestPermissionAccept.openModal(this.workspaceAccess, notification, this.meetingNote);
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
    this._router.navigate(['/meeting-note', this.meetingNote.id]);
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
        this._coreService.changeCoverImage(this.meetingNote.id, readFile).subscribe(url => {
          this.meetingNote.coverImage = url;
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

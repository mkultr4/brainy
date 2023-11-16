import { Component, OnInit, ViewChild, AfterContentInit, HostListener, OnDestroy } from '@angular/core';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { MeetingNote } from '../../../models/meeting-note/meeting-note';
import { ISubscription } from 'rxjs/Subscription';
import { ModalNewMeetingNoteComponent } from '../modal-new-meeting-note/modal-new-meeting-note.component';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { WorkflowService } from '../../../services/workflow/workflow.service';
import { RolService } from '../../../services/roles/rol.service';
import { MeetingNoteStrategyService } from '../../../services/meeting-note/meeting-note-strategy.service';
import { MeetingNoteType } from '../../../models/meeting-note/meeting-note-type';

@Component({
  selector: 'app-meeting-note-create',
  templateUrl: './meeting-note-create.component.html',
  styleUrls: ['./meeting-note-create.component.scss'],
  providers: [MeetingNoteStrategyService]
})
export class MeetingNoteCreateComponent implements OnInit, AfterContentInit, OnDestroy {
  public workspaceAccess: WorkspaceAccess;
  public meetingNote: MeetingNote = new MeetingNote();
  public meetingNoteTypes: MeetingNoteType[];
  // Workflow vars
  public rightSidenavCompressed = false;
  public leftSidenavCompressed = false;
  public feedbackAction = 'pin';
  // Permissions
  public headerEditable = false;
  public canShare = false;
  public canApprove = false;
  public isApprover = false;
  // Subscriptions
  public subscriptionRightSidenav: ISubscription;
  public subscriptionLeftSidenav: ISubscription;
  // Services
  private _meetingNoteService;
  // View child
  @ViewChild('modalNew') modalNew: ModalNewMeetingNoteComponent;
  constructor(
    private _authService: AuthenticationService,
    private _workflowService: WorkflowService,
    private _meetingNoteStrategyService: MeetingNoteStrategyService
  ) {
    // Services
    this._meetingNoteService = this._meetingNoteStrategyService.getService();
    // Auth
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
    // Permissions
    this.headerEditable = RolService.isAdminRol(this.workspaceAccess.rol.key) ||
      RolService.isManagerRol(this.workspaceAccess.rol.key);
    this.canShare = RolService.isAdminRol(this.workspaceAccess.rol.key) ||
      RolService.isManagerRol(this.workspaceAccess.rol.key);
    this.isApprover = this.workspaceAccess.groupReference === 'approver';
    this.canApprove = RolService.isAdminRol(this.workspaceAccess.rol.key)
      || RolService.isManagerRol(this.workspaceAccess.rol.key)
      || this.workspaceAccess.groupReference === 'approver';
  }

  ngOnInit() {
    this._meetingNoteService.getMeetingNoteTypes().subscribe(types => {
      this.meetingNoteTypes = types;
    })
  }
  ngAfterContentInit() {
        // Subscription sidenav show or hide
        this.subscriptionRightSidenav = this._workflowService.sidenavRightCompressed.subscribe(compress => {
          this.rightSidenavCompressed = compress;
        });
        // Subscription sidenav show or hide
        this.subscriptionLeftSidenav = this._workflowService.sidenavLeftCompressed
          .subscribe(compressed => {
            this.leftSidenavCompressed = compressed;
          });
    
    this.resize();

    setTimeout(() => {
      this.modalNew.openModal();
    });

  }
  /**
    * Resize layout
    */
  resize() {
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
  // On destroy
  ngOnDestroy() {
    if (this.subscriptionLeftSidenav) {
      this.subscriptionLeftSidenav.unsubscribe();
    }
    if (this.subscriptionRightSidenav) {
      this.subscriptionRightSidenav.unsubscribe();
    }
  }
}

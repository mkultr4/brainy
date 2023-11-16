import { Component, OnInit, HostListener, AfterContentInit, OnDestroy, ViewChild } from '@angular/core';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { RolService } from '../../../services/roles/rol.service';
import { Feedback } from '../../../models/feedback/feedback';
import { WorkflowService } from '../../../services/workflow/workflow.service';
import { Subscription } from 'rxjs';
import { ModalNewFeedbackComponent } from '../modal-new-feedback/modal-new-feedback.component';

@Component({
  selector: 'app-feedback-create',
  templateUrl: './feedback-create.component.html',
  styleUrls: ['./feedback-create.component.scss']
})
export class FeedbackCreateComponent implements OnInit, AfterContentInit, OnDestroy {
  public workspaceAccess: WorkspaceAccess;
  public feedback: Feedback = new Feedback();
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
  public subscriptionRightSidenav: Subscription;
  public subscriptionLeftSidenav: Subscription;
  // View child
  @ViewChild('modalNew') modalNew: ModalNewFeedbackComponent;
  constructor(
    private _authService: AuthenticationService,
    private _workflowService: WorkflowService
  ) {
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

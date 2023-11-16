import { Component, OnInit, Input, AfterContentInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { WorkflowService } from '../../../services/workflow/workflow.service';
import { Workspace } from '../../../models/workspace/workspace';
import { ISubscription } from 'rxjs/Subscription';
import { InvitationStrategyService } from '../../../services/invitations/invitation-strategy.service';
import { ignoreElements } from 'rxjs/operators';
import { Invitation } from 'src/app/models/invitations/invitation';
@Component({
  selector: 'app-sidenav-participants',
  templateUrl: './sidenav-participants.component.html',
  styleUrls: ['./sidenav-participants.component.scss']
})
export class SidenavParticipantsComponent implements OnInit, AfterContentInit, OnDestroy {
  // Public
  public invitations = [];
  // Services
  private _invitationService;
  // Subscriptions
  subscriptionInvitations: ISubscription;
  // Inputs
  @Input() compressed = false;
  @Input() owner;
  @Input() coreKey = 'share';
  @Input() workspace: Workspace;
  @Input() emptySidenav = true;
  @Input() showPendingInvitations = false;
  // Outputs
  @Output() onCompress = new EventEmitter();
  // Constructor
  constructor(
    private _workflowService: WorkflowService,
    private _invitationStrategyService: InvitationStrategyService
  ) {
    this._invitationService = this._invitationStrategyService.getService();
  }

  ngOnInit() {
  }
  ngAfterContentInit() {
    if (!this.emptySidenav) {
      this.subscriptionInvitations = this._invitationService.invitations.subscribe(invitations => {
        console.log(invitations);
        this.invitations = Object.assign([], invitations);
      });
    }
  }
  // Remove invitation
  removeInvitation(invitation: Invitation){
    this._invitationService.deleteInvitation(invitation.id).subscribe();
  }
  // Edit permission
  editPermissionInvitation(invitation: Invitation){
    this._invitationService.updateInvitation(invitation).subscribe();
  }
  compress() {
    
    this._workflowService.compressRightSidenav(!this.compressed);
    this.onCompress.emit()
  }
  ngOnDestroy() {
    if (this.subscriptionInvitations) {
      this.subscriptionInvitations.unsubscribe();
    }
  }
}

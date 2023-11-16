import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Invitation } from 'src/app/models/invitations/invitation';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';
import { Core } from 'src/app/models/cores/core';

@Component({
  selector: 'app-brand-profile-core-particpants-table',
  templateUrl: './brand-profile-core-particpants-table.component.html',
  styleUrls: ['./brand-profile-core-particpants-table.component.scss']
})
export class BrandProfileCoreParticpantsTableComponent implements OnInit {
  public showPendingInvitations = false;
  // Services
  private _invitationService;
  // Inputs
  @Input() core: Core;
  @Input() coreKey = 'share'
  // Outputs
  @Output() onDeleteInvitation = new EventEmitter();
  constructor(
    private _invitationStrategyService: InvitationStrategyService
  ) { 
    this._invitationService = this._invitationStrategyService.getService();
  }

  ngOnInit(
    
  ) {
  }

    // Remove invitation
    removeInvitation(invitation: Invitation){
      this._invitationService.deleteInvitation(invitation.id).subscribe(resp => {
          console.log(invitation);
          const index = this.core.invitations.findIndex(i => i.id === invitation.id);
          this.onDeleteInvitation.emit({core:this.core,indexInvitation:index});
      });
    }
    // Edit permission
    editPermissionInvitation(invitation: Invitation){
      this._invitationService.updateInvitation(invitation).subscribe();
    }

}

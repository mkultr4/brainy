import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedInvitationsRoutingModule } from './shared-invitations-routing.module';
import { InvitationBlockComponent } from './invitation-block/invitation-block.component';
import { InvitationBlockDropdownComponent } from './invitation-block-dropdown/invitation-block-dropdown.component';
import { InvitationDropdownComponent } from './invitation-dropdown/invitation-dropdown.component';
import { InvitationWrapperComponent } from './invitation-wrapper/invitation-wrapper.component';
import { ModalAlertInvitationComponent } from './modal-alert-invitation/modal-alert-invitation.component';
import { SharedModule } from '../shared/shared.module';
import { SharedModalModule } from '../shared-modal/shared-modal.module';

@NgModule({
  imports: [
    SharedModule,
    SharedModalModule,
    SharedInvitationsRoutingModule
  ],
  declarations: [
    InvitationBlockComponent,
    InvitationBlockDropdownComponent,
    InvitationDropdownComponent,
    InvitationWrapperComponent,
    ModalAlertInvitationComponent
  ],
  exports: [
    InvitationBlockComponent,
    InvitationBlockDropdownComponent,
    InvitationDropdownComponent,
    InvitationWrapperComponent,
    ModalAlertInvitationComponent
  ]
})
export class SharedInvitationsModule { }

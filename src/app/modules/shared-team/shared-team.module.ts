import { NgModule } from '@angular/core';
import { SharedTeamRoutingModule } from './shared-team-routing.module';
import { TeamFilterService } from './services/team-filter.service';
import { TeamWorkflowService } from './services/team-workflow.service';
import { FilterWorkspaceAccessGuestPipe } from './pipes/filter-workspace-access-guest.pipe';
import { FilterInvitationGuestCategoryPipe } from './pipes/filter-invitation-guest-category.pipe';
import { FilterCustomerStatusPipe } from './pipes/filter-customer-status.pipe';

import { TeamBoxCategoryComponent } from './team-box-category/team-box-category.component';
import { TeamBoxComponent } from './team-box/team-box.component';
import { TeamBoxInvitationComponent } from './team-box-invitation/team-box-invitation.component';
import { SharedModule } from '../shared/shared.module';
import { MzInputModule } from 'ngx-materialize';
import { SharedModalModule } from '../shared-modal/shared-modal.module';
import { ModalCategoryEditComponent } from './modal-category-edit/modal-category-edit.component';
import { ModalCategoryEliminateComponent } from './modal-category-eliminate/modal-category-eliminate.component';
import { ModalTeamSuspendAccountComponent } from './modal-team-suspend-account/modal-team-suspend-account.component';
import { ModalTeamEliminateAccountComponent } from './modal-team-eliminate-account/modal-team-eliminate-account.component';
import { ModalTeamEliminateInvitationComponent } from './modal-team-eliminate-invitation/modal-team-eliminate-invitation.component';
import { FilterTeamAccountStatusPipe } from './pipes/filter-team-account-status.pipe';
import { DropdownFilterTeamStatusComponent } from './dropdown-filter-team-status/dropdown-filter-team-status.component';

@NgModule({
  imports: [
    SharedModule,
    MzInputModule,
    SharedModalModule,
    SharedTeamRoutingModule
  ],
  providers: [
    TeamFilterService,
    TeamWorkflowService
  ],
  declarations: [
    TeamBoxComponent,
    TeamBoxInvitationComponent,
    TeamBoxCategoryComponent,
    ModalCategoryEditComponent,
    ModalCategoryEliminateComponent,
    ModalTeamSuspendAccountComponent,
    ModalTeamEliminateAccountComponent,
    ModalTeamEliminateInvitationComponent,
    DropdownFilterTeamStatusComponent,
    // Pipes
    FilterCustomerStatusPipe,
    FilterInvitationGuestCategoryPipe,
    FilterWorkspaceAccessGuestPipe,
    FilterTeamAccountStatusPipe
  ],
  exports: [
    TeamBoxComponent,
    TeamBoxInvitationComponent,
    TeamBoxCategoryComponent,
    ModalCategoryEditComponent,
    ModalCategoryEliminateComponent,
    ModalTeamSuspendAccountComponent,
    ModalTeamEliminateAccountComponent,
    ModalTeamEliminateInvitationComponent,
    DropdownFilterTeamStatusComponent,
    // Pipes
    FilterCustomerStatusPipe,
    FilterInvitationGuestCategoryPipe,
    FilterWorkspaceAccessGuestPipe,
    FilterTeamAccountStatusPipe
  ]
})
export class SharedTeamModule { }

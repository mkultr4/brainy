import { NgModule } from '@angular/core';
import { BrandProfileRoutingModule } from './brand-profile-routing.module';
import { BrandProfileContentComponent } from './brand-profile-content/brand-profile-content.component';
import { BrandProfileProjectsComponent } from './brand-profile-projects/brand-profile-projects.component';
import { SharedModule } from '../shared/shared.module';
import { SharedHeaderModule } from '../shared-header/shared-header.module';
import { BrandProfileSummaryComponent } from './brand-profile-summary/brand-profile-summary.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { SharedModalModule } from '../shared-modal/shared-modal.module';
import { BrandProfileService } from './services/brand-profile.service';
import { MzInputModule, MzSelectModule } from 'ngx-materialize';
import { ModalEditCoreComponent } from './modal-edit-core/modal-edit-core.component';
import { SharedCoreModule } from '../shared-core/shared-core.module';
import { BrandProfileFilterProjectsComponent } from './brand-profile-filter-projects/brand-profile-filter-projects.component';
import { BrandProfileFilterTypeComponent } from './brand-profile-filter-type/brand-profile-filter-type.component';
import { SharedParticipantsModule } from '../shared-participants/shared-participants.module';
import { BrandProfileMembersComponent } from './brand-profile-members/brand-profile-members.component';
import { BrandProfileMembersTeamComponent } from './brand-profile-members-team/brand-profile-members-team.component';
import { SharedTeamModule } from '../shared-team/shared-team.module';
import { BrandProfileMembersGroupsComponent } from './brand-profile-members-groups/brand-profile-members-groups.component';
import { BrandProfileMembersGroupComponent } from './brand-profile-members-group/brand-profile-members-group.component';
import { BrandProfileCoreParticpantsTableComponent } from './brand-profile-core-particpants-table/brand-profile-core-particpants-table.component';
import { SharedInvitationsModule } from '../shared-invitations/shared-invitations.module';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';

@NgModule({
  imports: [
    SharedModule,
    SharedHeaderModule,
    SharedComponentsModule,
    SharedModalModule,
    SharedCoreModule,
    MzInputModule,
    MzSelectModule,
    SharedTeamModule,
    SharedParticipantsModule,
    SharedInvitationsModule,
    BrandProfileRoutingModule
  ],
  providers: [
    BrandProfileService,
    InvitationStrategyService
  ],
  declarations: [
    BrandProfileContentComponent,
    BrandProfileSummaryComponent,
    // Projects
    BrandProfileProjectsComponent,
    ModalEditCoreComponent,
    BrandProfileFilterProjectsComponent,
    BrandProfileFilterTypeComponent,
    BrandProfileCoreParticpantsTableComponent,
    // Members
    BrandProfileMembersComponent,
    BrandProfileMembersTeamComponent,
    BrandProfileMembersGroupsComponent,
    BrandProfileMembersGroupComponent,
  ]
})
export class BrandProfileModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileInvitationRoutingModule } from './profile-invitation-routing.module';
import { MzSelectModule } from 'ngx-materialize';
import { SharedTeamModule } from '../shared-team/shared-team.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { SharedHeaderModule } from '../shared-header/shared-header.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileInvitationContentComponent } from './profile-invitation-content/profile-invitation-content.component';
import { ProfileInvitationAccountComponent } from './profile-invitation-account/profile-invitation-account.component';
import { SharedSidenavModule } from '../shared-sidenav/shared-sidenav.module';

@NgModule({
  imports: [
    SharedModule,
    SharedHeaderModule,
    SharedComponentsModule,
    SharedTeamModule,
    SharedSidenavModule,
    MzSelectModule,
    ProfileInvitationRoutingModule
  ],
  declarations: [
    ProfileInvitationContentComponent,
    ProfileInvitationAccountComponent
  ]
})
export class ProfileInvitationModule { }

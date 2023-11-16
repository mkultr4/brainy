import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { SharedModule } from '../shared/shared.module';
import { SharedHeaderModule } from '../shared-header/shared-header.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { SharedTeamModule } from '../shared-team/shared-team.module';
import { ProfileActivityModule } from '../profile-activity/profile-activity.module';
import { MzSelectModule } from 'ngx-materialize';
import { SharedSidenavModule } from '../shared-sidenav/shared-sidenav.module';

@NgModule({
  imports: [
    SharedModule,
    SharedHeaderModule,
    SharedComponentsModule,
    SharedTeamModule,
    ProfileActivityModule,
    MzSelectModule,
    SharedSidenavModule,
    SharedTeamModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileContentComponent,
    ProfileAccountComponent
  ]
})
export class ProfileModule { }

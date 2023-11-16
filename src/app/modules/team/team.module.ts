import { NgModule } from '@angular/core';
import { TeamRoutingModule } from './team-routing.module';
import { TeamContentComponent } from './team-content/team-content.component';
import { TeamFilterComponent } from './team-filter/team-filter.component';
import { SharedModule } from '../shared/shared.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { SharedHeaderModule } from '../shared-header/shared-header.module';
import { MyTeamComponent } from './my-team/my-team.component';
import { TeamGroupsComponent } from './team-groups/team-groups.component';
import { TeamGroupComponent } from './team-group/team-group.component';
import { SharedTeamModule } from '../shared-team/shared-team.module';
import { SharedFiltersModule } from '../shared-filters/shared-filters.module';
import { ModalNewCategoryComponent } from './modal-new-category/modal-new-category.component';
import { MzInputModule, MzSelectModule } from 'ngx-materialize';
import { SharedModalModule } from '../shared-modal/shared-modal.module';
import { ModalTeamInviteComponent } from './modal-team-invite/modal-team-invite.component';
import { SharedInvitationsModule } from '../shared-invitations/shared-invitations.module';
import { SharedSidenavModule } from '../shared-sidenav/shared-sidenav.module';
import { TeamTutorialComponent } from './team-tutorial/team-tutorial.component';
import { TourModule } from '../tour/tour.module';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';

@NgModule({
  imports: [
    SharedModule,
    SharedHeaderModule,
    SharedComponentsModule,
    SharedTeamModule,
    SharedFiltersModule,
    MzInputModule,
    MzSelectModule,
    SharedInvitationsModule,
    SharedSidenavModule,
    SharedModalModule,
    TourModule,
    TeamRoutingModule
  ],
  providers:[
    InvitationStrategyService
  ],
  declarations: [
    TeamContentComponent,
    TeamFilterComponent,
    MyTeamComponent,
    TeamGroupsComponent,
    TeamGroupComponent,
    ModalNewCategoryComponent,
    ModalTeamInviteComponent,
    TeamTutorialComponent
  ]
})
export class TeamModule { }

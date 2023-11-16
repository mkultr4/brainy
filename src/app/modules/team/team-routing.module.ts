import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeamContentComponent } from './team-content/team-content.component';
import { MyTeamComponent } from './my-team/my-team.component';
import { TeamGroupsComponent } from './team-groups/team-groups.component';
import { TeamGroupComponent } from './team-group/team-group.component';

const routes: Routes = [

  {
    path: '', component: TeamContentComponent, children: [
      { path: '', redirectTo: 'my' },
      { path: 'my', component: MyTeamComponent },
      { path: 'group', component: TeamGroupsComponent },
      { path: 'group/:id', component: TeamGroupComponent },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeamRoutingModule { }

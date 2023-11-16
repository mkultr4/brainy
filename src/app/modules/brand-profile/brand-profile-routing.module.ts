import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrandProfileContentComponent } from './brand-profile-content/brand-profile-content.component';
import { BrandProfileProjectsComponent } from './brand-profile-projects/brand-profile-projects.component';
import { BrandProfileMembersComponent } from './brand-profile-members/brand-profile-members.component';
import { BrandProfileMembersTeamComponent } from './brand-profile-members-team/brand-profile-members-team.component';
import { BrandProfileMembersGroupsComponent } from './brand-profile-members-groups/brand-profile-members-groups.component';
import { BrandProfileMembersGroupComponent } from './brand-profile-members-group/brand-profile-members-group.component';

const routes: Routes = [
  {
    path: '', component: BrandProfileContentComponent, children: [
      { path: '', redirectTo: 'projects' },
      {
        path: 'members', component: BrandProfileMembersComponent, children: [
          { path: '', redirectTo: 'my' },
          { path: 'my', component: BrandProfileMembersTeamComponent },
          { path: 'group', component: BrandProfileMembersGroupsComponent },
          { path: 'group/:groupId', component: BrandProfileMembersGroupComponent },
        ]
      },
      { path: 'projects', component: BrandProfileProjectsComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandProfileRoutingModule { }

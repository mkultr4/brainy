import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileInvitationContentComponent } from './profile-invitation-content/profile-invitation-content.component';
import { ProfileInvitationAccountComponent } from './profile-invitation-account/profile-invitation-account.component';

const routes: Routes = [
  {
    path: '', component: ProfileInvitationContentComponent, children: [
      { path: '', redirectTo: 'account' },
      { path: 'account', component: ProfileInvitationAccountComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileInvitationRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileContentComponent } from './profile-content/profile-content.component';
import { ProfileAccountComponent } from './profile-account/profile-account.component';
import { ProfileActivityContentComponent } from '../profile-activity/profile-activity-content/profile-activity-content.component';

const routes: Routes = [
  {
    path: '', component: ProfileContentComponent, children: [
      { path: '', redirectTo: 'account' },
      { path: 'account', component: ProfileAccountComponent },
      { path: 'activity', component: ProfileActivityContentComponent }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }

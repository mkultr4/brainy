import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardContentComponent } from './dashboard-content/dashboard-content.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

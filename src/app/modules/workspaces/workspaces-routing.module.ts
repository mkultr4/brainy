import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkspacesContentComponent } from './workspaces-content/workspaces-content.component';


const routes: Routes = [
  { path: '', component:  WorkspacesContentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkspacesRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BriefCloseContentComponent } from './brief-close-content/brief-close-content.component';


const routes: Routes = [
  { path: '', component: BriefCloseContentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BriefCloseRoutingModule { }

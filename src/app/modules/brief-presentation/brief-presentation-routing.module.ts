import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BriefPresentationContentComponent } from './brief-presentation-content/brief-presentation-content.component';
import { BriefPresentationCreateComponent } from './brief-presentation-create/brief-presentation-create.component';

const routes: Routes = [
  { path: '', component: BriefPresentationCreateComponent },
  { path: ':id', component: BriefPresentationContentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BriefPresentationRoutingModule { }

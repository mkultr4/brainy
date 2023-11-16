import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BriefTemplateContentComponent } from './brief-template-content/brief-template-content.component';

const router = RouterModule.forChild([
  { path: '', component: BriefTemplateContentComponent }
]);


@NgModule({
  imports: [router],
  exports: [RouterModule]
})
export class BriefTemplateRoutingModule { }

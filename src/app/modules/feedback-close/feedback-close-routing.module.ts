import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackCloseContentComponent } from './feedback-close-content/feedback-close-content.component';

const routes: Routes = [
  { path: '',  component: FeedbackCloseContentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackCloseRoutingModule { }

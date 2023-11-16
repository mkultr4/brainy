import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackCreateComponent } from './feedback-create/feedback-create.component';
import { FeedbackContentComponent } from './feedback-content/feedback-content.component';

const routes: Routes = [
  { path: '',  component: FeedbackCreateComponent },
  { path: ':id',  component: FeedbackContentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }

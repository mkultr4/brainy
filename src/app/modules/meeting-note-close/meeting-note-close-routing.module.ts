import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeetingNoteCloseContentComponent } from './meeting-note-close-content/meeting-note-close-content.component';


const routes: Routes = [
  { path: '', component: MeetingNoteCloseContentComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingNoteCloseRoutingModule { }

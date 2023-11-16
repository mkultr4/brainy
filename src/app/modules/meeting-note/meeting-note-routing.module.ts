import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeetingNoteCreateComponent } from './meeting-note-create/meeting-note-create.component';
import { MeetingNoteContentComponent } from './meeting-note-content/meeting-note-content.component';

const routes: Routes = [
  { path: '',  component: MeetingNoteCreateComponent },
  { path: ':id',  component: MeetingNoteContentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MeetingNoteRoutingModule { }

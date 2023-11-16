import { NgModule } from '@angular/core';

import { MeetingNoteCloseRoutingModule } from './meeting-note-close-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MeetingNoteCloseContentComponent } from './meeting-note-close-content/meeting-note-close-content.component';
import { SharedCoreModule } from '../shared-core/shared-core.module';
import { FloatingNoteModule } from '../floating-note/floating-note.module';
import { SharedParticipantsModule } from '../shared-participants/shared-participants.module';
import { MeetingNoteCloseVisualComponent } from './meeting-note-close-visual/meeting-note-close-visual.component';
import { CommentThreadModule } from '../comment-thread/comment-thread.module';
import { ShareMeetingNoteModule } from '../share-meeting-note/share-meeting-note.module';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';

@NgModule({
  imports: [
    SharedModule,
    FloatingNoteModule,
    SharedCoreModule,
    SharedParticipantsModule,
    ShareMeetingNoteModule,
    CommentThreadModule,
    MeetingNoteCloseRoutingModule
  ],
  providers:[
    InvitationStrategyService
  ],
  declarations: [
    MeetingNoteCloseContentComponent,
    MeetingNoteCloseVisualComponent
  ]
})
export class MeetingNoteCloseModule { }

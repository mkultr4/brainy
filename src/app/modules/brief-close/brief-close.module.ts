import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { BriefCloseRoutingModule } from './brief-close-routing.module';
import { SharedCoreModule } from '../shared-core/shared-core.module';
import { FloatingNoteModule } from '../floating-note/floating-note.module';
import { BriefCloseContentComponent } from './brief-close-content/brief-close-content.component';
import { BriefCloseVisualComponent } from './brief-close-visual/brief-close-visual.component';
import { CommentThreadModule } from '../comment-thread/comment-thread.module';
import { SharedBriefModule } from '../shared-brief/shared-brief.module';
import { BriefGivebackCloseBlockComponent } from './brief-giveback-close-block/brief-giveback-close-block.component';
import { BriefProposalCloseBlockComponent } from './brief-proposal-close-block/brief-proposal-close-block.component';
import { SharedParticipantsModule } from '../shared-participants/shared-participants.module';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';
@NgModule({
  imports: [
    SharedModule,
    FloatingNoteModule,
    SharedCoreModule,
    SharedParticipantsModule,
    SharedBriefModule,
    CommentThreadModule,
    BriefCloseRoutingModule
  ],
  providers:[
    InvitationStrategyService,
  ],
  declarations: [
    BriefCloseContentComponent,
    BriefCloseVisualComponent,
    BriefGivebackCloseBlockComponent,
    BriefProposalCloseBlockComponent
  ]
})
export class BriefCloseModule { }

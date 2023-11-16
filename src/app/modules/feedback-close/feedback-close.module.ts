import { NgModule } from '@angular/core';
import { FeedbackCloseRoutingModule } from './feedback-close-routing.module';
import { FeedbackCloseContentComponent } from './feedback-close-content/feedback-close-content.component';
import { SharedModule } from '../shared/shared.module';
import { FloatingNoteModule } from '../floating-note/floating-note.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FeedbackClosePieceComponent } from './feedback-close-piece/feedback-close-piece.component';
import { FeedbackCloseLeftSidenavComponent } from './feedback-close-left-sidenav/feedback-close-left-sidenav.component';
import { FeedbackClosePieceSidenavComponent } from './feedback-close-left-sidenav/feedback-close-piece-sidenav/feedback-close-piece-sidenav.component';
import { SharedCoreModule } from '../shared-core/shared-core.module';
import { CommentThreadModule } from '../comment-thread/comment-thread.module';
import { FeedbackCloseRightSidenavComponent } from './feedback-close-right-sidenav/feedback-close-right-sidenav.component';
import { FeedbackCloseToolbarMainComponent } from './feedback-close-toolbar-main/feedback-close-toolbar-main.component';
import { SharedSidenavModule } from '../shared-sidenav/shared-sidenav.module';
import { SharedParticipantsModule } from '../shared-participants/shared-participants.module';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';

@NgModule({
  imports: [
    SharedModule,
    FloatingNoteModule,
    SharedCoreModule,
    SharedParticipantsModule,
    SharedSidenavModule,
    CommentThreadModule,
    NgxPaginationModule,
    FeedbackCloseRoutingModule
  ],
  providers:[
    InvitationStrategyService,
  ],
  declarations: [
    FeedbackCloseContentComponent,
    FeedbackClosePieceComponent,
    FeedbackCloseLeftSidenavComponent,
    FeedbackClosePieceSidenavComponent,
    FeedbackCloseRightSidenavComponent,
    FeedbackCloseToolbarMainComponent
  ]
})
export class FeedbackCloseModule { }

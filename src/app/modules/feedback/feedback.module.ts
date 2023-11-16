import { NgModule } from '@angular/core';

import { FeedbackRoutingModule } from './feedback-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FeedbackCreateComponent } from './feedback-create/feedback-create.component';
import { FeedbackContentComponent } from './feedback-content/feedback-content.component';
import { ModalNewFeedbackComponent } from './modal-new-feedback/modal-new-feedback.component';
import { FeedbackHeaderComponent } from './feedback-header/feedback-header.component';
import { FeedbackPieceToolbarComponent } from './feedback-piece-toolbar/feedback-piece-toolbar.component';
import { FeedbackWorkflowService } from './services/feedback-workflow.service';
import { FloatingNoteModule } from '../floating-note/floating-note.module';
import { SharedCoreModule } from '../shared-core/shared-core.module';
import { FeedbackLeftSidenavEmptyComponent } from './feedback-left-sidenav-empty/feedback-left-sidenav-empty.component';
import { FeedbackLeftSidenavComponent } from './feedback-left-sidenav/feedback-left-sidenav.component';
import { WorkflowService } from '../../services/workflow/workflow.service';
import { SharedParticipantsModule } from '../shared-participants/shared-participants.module';
import { SharedModalModule } from '../shared-modal/shared-modal.module';
import { MzSelectModule, MzInputModule } from 'ngx-materialize';
import { FeedbackPieceWrapperComponent } from './feedback-piece-wrapper/feedback-piece-wrapper.component';
import { FeedbackPieceHeaderComponent } from './feedback-piece-header/feedback-piece-header.component';
import { FeedbackPieceComponent } from './feedback-piece/feedback-piece.component';
import { FeedbackPieceVideoComponent } from './feedback-piece-video/feedback-piece-video.component';
import { NewFeedbackPieceComponent } from './new-feedback-piece/new-feedback-piece.component';
import { FeedbackTutorialComponent } from './feedback-tutorial/feedback-tutorial.component';
import { FeedbackPieceSidenavComponent } from './feedback-left-sidenav/feedback-piece-sidenav/feedback-piece-sidenav.component';
import { SortablejsModule } from 'angular-sortablejs/dist';
import { FeedbackToolbarMainComponent } from './feedback-toolbar-main/feedback-toolbar-main.component';
import { FeedbackPieceEmptyComponent } from './feedback-piece-empty/feedback-piece-empty.component';
import { ModalWarningFormatComponent } from './modal-warning-format/modal-warning-format.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { TourModule } from '../tour/tour.module';
import { CommentThreadModule } from '../comment-thread/comment-thread.module';
import { CommentThreadFeedbackPointComponent } from './comments/comment-thread-feedback-point/comment-thread-feedback-point.component';
import { FeedbackToolbarShapeComponent } from './feedback-toolbar-shape/feedback-toolbar-shape.component';
import { FeedbackToolbarService } from './services/feedback-toolbar.service';
import { CommentThreadFeedbackShapeComponent } from './comments/comment-thread-feedback-shape/comment-thread-feedback-shape.component';
import { FeedbackPieceFrameComponent } from './feedback-left-sidenav/feedback-piece-frame/feedback-piece-frame.component';
import { FeedbackPieceFramePinComponent } from './feedback-left-sidenav/feedback-piece-frame-pin/feedback-piece-frame-pin.component';
import { FeedbackPieceFrameShapeComponent } from './feedback-left-sidenav/feedback-piece-frame-shape/feedback-piece-frame-shape.component';
import { ModalChangeFeedbackPieceComponent } from './modal-change-feedback-piece/modal-change-feedback-piece.component';
import { FeedbackVersionBoxComponent } from './feedback-version-box/feedback-version-box.component';
import { FeedbackVersionsSidenavComponent } from './feedback-versions-sidenav/feedback-versions-sidenav.component';
import { DndModule } from 'ngx-drag-drop';
import { SharedSidenavModule } from '../shared-sidenav/shared-sidenav.module';
import { FeedbackVersionsComponent } from './feedback-versions/feedback-versions.component';
import { FeedbackVersionCompareChooserComponent } from './feedback-versions/feedback-version-compare-chooser/feedback-version-compare-chooser.component';
import { FeedbackVersionComparePreviewComponent } from './feedback-versions/feedback-version-compare-preview/feedback-version-compare-preview.component';
import { FeedbackVersionsCompareChooserMainComponent } from './feedback-versions/feedback-versions-compare-chooser-main/feedback-versions-compare-chooser-main.component';
import { FeedbackVersionsLeftComponent } from './feedback-versions/feedback-versions-left/feedback-versions-left.component';
import { FeedbackVersionsLeftPieceComponent } from './feedback-versions/feedback-versions-left-piece/feedback-versions-left-piece.component';
import { FeedbackPiecePinComponent } from './feedback-piece-pin/feedback-piece-pin.component';
import { FeedbackPieceShapeComponent } from './feedback-piece-shape/feedback-piece-shape.component';
import { FeedbackVersionsCompareComponent } from './feedback-versions-compare/feedback-versions-compare.component';
import { CompareVersionBoxComponent } from './feedback-versions-compare/compare-version-box/compare-version-box.component';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';
@NgModule({
  imports: [
    SharedModule,
    SharedCoreModule,
    SharedComponentsModule,
    FloatingNoteModule,
    SharedModalModule,
    SharedParticipantsModule,
    MzSelectModule,
    MzInputModule,
    SortablejsModule,
    TourModule,
    CommentThreadModule,
    DndModule,
    SharedSidenavModule,
    FeedbackRoutingModule,
  ],
  providers: [
    FeedbackWorkflowService,
    FeedbackToolbarService,
    InvitationStrategyService,
    WorkflowService
  ],
  declarations: [
    // Commons
    FeedbackHeaderComponent,
    FeedbackPieceToolbarComponent,
    // Create
    FeedbackCreateComponent,
    ModalNewFeedbackComponent,
    FeedbackLeftSidenavEmptyComponent,
    FeedbackPieceEmptyComponent,
    // Work interface
    FeedbackPieceWrapperComponent,
    FeedbackPieceHeaderComponent,
    FeedbackPieceComponent,
    FeedbackPieceVideoComponent,
    NewFeedbackPieceComponent,
    FeedbackTutorialComponent,
    FeedbackContentComponent,
    FeedbackLeftSidenavComponent,
    FeedbackPieceSidenavComponent,
    FeedbackToolbarMainComponent,
    ModalWarningFormatComponent,
    ModalChangeFeedbackPieceComponent,
    // Comments
    CommentThreadFeedbackPointComponent,
    CommentThreadFeedbackShapeComponent,
    FeedbackToolbarShapeComponent,
    FeedbackPieceFrameComponent,
    FeedbackPieceFramePinComponent,
    FeedbackPieceFrameShapeComponent,
    // Versions
    FeedbackVersionBoxComponent,
    FeedbackVersionsSidenavComponent,
    FeedbackVersionsComponent,
    FeedbackVersionCompareChooserComponent,
    FeedbackVersionComparePreviewComponent,
    FeedbackVersionsCompareChooserMainComponent,
    FeedbackVersionsLeftComponent,
    FeedbackVersionsLeftPieceComponent,
    FeedbackPiecePinComponent,
    FeedbackPieceShapeComponent,
    FeedbackVersionsCompareComponent,
    CompareVersionBoxComponent

  ]
})
export class FeedbackModule { }

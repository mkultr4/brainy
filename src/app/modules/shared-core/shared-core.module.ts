import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SharedModalModule } from '../shared-modal/shared-modal.module';
import { ModalDownloadProjectComponent } from './modal-download-project/modal-download-project.component';
import { DownloadProjectService } from './services/download-project.service';
import { WorkflowHeaderComponent } from './workflow-header/workflow-header.component';
import { WorkflowHeaderMenuComponent } from './workflow-header-menu/workflow-header-menu.component';
import {ElasticInputModule} from 'angular2-elastic-input';
import { ModalDeleteCoreComponent } from './modal-delete-core/modal-delete-core.component';
import { ModalCancelCoreComponent } from './modal-cancel-core/modal-cancel-core.component';
import { ModalApproveCoreComponent } from './modal-approve-core/modal-approve-core.component';
import { ModalDisapproveCoreComponent } from './modal-disapprove-core/modal-disapprove-core.component';
import { BriefListAssociatedComponent } from './brief-list-associated/brief-list-associated.component';
import { CoreWorkflowService } from './services/core-workflow.service';
import { SharedSidenavModule } from '../shared-sidenav/shared-sidenav.module';
import { MeetingNoteListAssociatedComponent } from './meeting-note-list-associated/meeting-note-list-associated.component';
import { BriefAssociatedComponent } from './brief-associated/brief-associated.component';
import { MeetingNoteAssociatedComponent } from './meeting-note-associated/meeting-note-associated.component';
import { ModalShareByEmailComponent } from './modal-share-by-email/modal-share-by-email.component';
import { MzInputModule, MzTimepickerModule, MzDatepickerModule, MzSelectModule } from 'ngx-materialize';
import { ModalCommentsPendingComponent } from './modal-comments-pending/modal-comments-pending.component';
import { ModalRequestModificationComponent } from './modal-request-modification/modal-request-modification.component';
import { ModalNotificationCoreComponent } from './modal-notification-core/modal-notification-core.component';
import { ModalRequestPermissionComponent } from './modal-request-permission/modal-request-permission.component';
import { ModalRequestPermissionAcceptComponent } from './modal-request-permission-accept/modal-request-permission-accept.component';
import { ModalAlertApproveCoreComponent } from './modal-alert-approve-core/modal-alert-approve-core.component';
import { ModalCancelMeetingNoteComponent } from './modal-cancel-meeting-note/modal-cancel-meeting-note.component';
import { FeedbackListAssociatedComponent } from './feedback-list-associated/feedback-list-associated.component';
import { FeedbackAssociatedComponent } from './feedback-associated/feedback-associated.component';
import { FeedbackAssociatedContentComponent } from './feedback-associated/feedback-associated-content/feedback-associated-content.component';
import { FeedbackAssociatedHeaderComponent } from './feedback-associated/feedback-associated-header/feedback-associated-header.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FeedbackAssociatedLeftSidenavComponent } from './feedback-associated/feedback-associated-left-sidenav/feedback-associated-left-sidenav.component';
import { FeedbackAssociatedPieceSidenavComponent } from './feedback-associated/feedback-associated-left-sidenav/feedback-associated-piece-sidenav/feedback-associated-piece-sidenav.component';
import { FeedbackAssociatedPieceComponent } from './feedback-associated/feedback-associated-piece/feedback-associated-piece.component';
import { CoreCloseToolbarMainComponent } from './core-close-toolbar-main/core-close-toolbar-main.component';
import { SharedBriefModule } from '../shared-brief/shared-brief.module';
import { CoreCloseParticipantsComponent } from './core-close-participants/core-close-participants.component';

@NgModule({
  imports: [
    SharedModule,
    SharedModalModule,
    SharedSidenavModule,
    MzInputModule,
    MzSelectModule,
    MzDatepickerModule,
    MzTimepickerModule,
    SharedBriefModule,
    ElasticInputModule.forRoot(),
    NgxPaginationModule,
    SharedBriefModule
  ],
  declarations: [
    ModalDownloadProjectComponent,
    ModalDeleteCoreComponent,
    ModalApproveCoreComponent,
    ModalDisapproveCoreComponent,
    ModalCancelCoreComponent,
    WorkflowHeaderComponent,
    WorkflowHeaderMenuComponent,
    // Associated
    BriefListAssociatedComponent,
    MeetingNoteListAssociatedComponent,
    FeedbackListAssociatedComponent,
    // Associated view
    MeetingNoteAssociatedComponent,
    BriefAssociatedComponent,
    // Feedback associated
    FeedbackAssociatedComponent,
    FeedbackAssociatedContentComponent,
    FeedbackAssociatedHeaderComponent,
    FeedbackAssociatedLeftSidenavComponent,
    FeedbackAssociatedPieceSidenavComponent,
    FeedbackAssociatedPieceComponent,
    // End feedback
    ModalShareByEmailComponent,
    ModalCommentsPendingComponent,
    ModalRequestModificationComponent,
    ModalNotificationCoreComponent,
    ModalRequestPermissionComponent,
    ModalRequestPermissionAcceptComponent,
    ModalAlertApproveCoreComponent,
    ModalCancelMeetingNoteComponent,
    // Close
    CoreCloseToolbarMainComponent,
    CoreCloseParticipantsComponent
  ],
  providers: [
    CoreWorkflowService,
    DownloadProjectService
  ],
  exports: [
    ModalDownloadProjectComponent,
    ModalDeleteCoreComponent,
    ModalCancelCoreComponent,
    ModalApproveCoreComponent,
    ModalDisapproveCoreComponent,
    WorkflowHeaderComponent,
    WorkflowHeaderMenuComponent,
    // Associated
    BriefListAssociatedComponent,
    MeetingNoteListAssociatedComponent,
    FeedbackListAssociatedComponent,
    // Associated view
    BriefAssociatedComponent,
    MeetingNoteAssociatedComponent,
    // Feedback associated
    FeedbackAssociatedComponent,
    FeedbackAssociatedContentComponent,
    FeedbackAssociatedHeaderComponent,
    FeedbackAssociatedLeftSidenavComponent,
    FeedbackAssociatedPieceSidenavComponent,
    FeedbackAssociatedPieceComponent,
    // End feedback
    ModalShareByEmailComponent,
    ModalCommentsPendingComponent,
    ModalRequestModificationComponent,
    ModalNotificationCoreComponent,
    ModalRequestPermissionComponent,
    ModalRequestPermissionAcceptComponent,
    ModalAlertApproveCoreComponent,
    ModalCancelMeetingNoteComponent,
    // Close
    CoreCloseToolbarMainComponent,
    CoreCloseParticipantsComponent
  ]
})
export class SharedCoreModule { }

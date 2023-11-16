import { NgModule } from '@angular/core';
import { MeetingNoteRoutingModule } from './meeting-note-routing.module';
import { MeetingNoteCreateComponent } from './meeting-note-create/meeting-note-create.component';
import { ModalNewMeetingNoteComponent } from './modal-new-meeting-note/modal-new-meeting-note.component';
import { SharedModalModule } from '../shared-modal/shared-modal.module';
import { SharedModule } from '../shared/shared.module';
import { MzInputModule, MzSelectModule } from 'ngx-materialize';
import { MzDatepickerModule } from 'ngx-materialize';
import { MzTimepickerModule } from 'ngx-materialize';
import { WorkflowService } from '../../services/workflow/workflow.service';
import { MeetingNoteContentComponent } from './meeting-note-content/meeting-note-content.component';
import { SharedCoreModule } from '../shared-core/shared-core.module';
import { MeetingNoteLeftSidenavComponent } from './meeting-note-left-sidenav/meeting-note-left-sidenav.component';
import { MeetingNoteHeaderComponent } from './meeting-note-header/meeting-note-header.component';
import { CommentThreadModule } from '../comment-thread/comment-thread.module';
import { SharedParticipantsModule } from '../shared-participants/shared-participants.module';
import { FloatingNoteModule } from '../floating-note/floating-note.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { SharedSidenavModule } from '../shared-sidenav/shared-sidenav.module';
import { MeetingNoteToolbarMainComponent } from './meeting-note-toolbar-main/meeting-note-toolbar-main.component';
import { TopicEditableToolbarComponent } from './topic-editable-toolbar/topic-editable-toolbar.component';
import { TopicToolbarComponent } from './topic-toolbar/topic-toolbar.component';
import { TopicEditorComponent } from './topic-editor/topic-editor.component';
import { TopicEditorAgreementComponent } from './topic-editor/topic-editor-agreement/topic-editor-agreement.component';
import { TopicEditorDescriptionComponent } from './topic-editor/topic-editor-description/topic-editor-description.component';
import { TopicEditorTitleComponent } from './topic-editor/topic-editor-title/topic-editor-title.component';
import { TopicEditorToolbarComponent } from './topic-editor/topic-editor-toolbar/topic-editor-toolbar.component';
import { TopicNotEmptyPipe } from './pipes/topic-not-empty.pipe';
import { FilterItemSubTopicPipe } from './pipes/filter-item-sub-topic.pipe';
import { TopicItemComponent } from './meeting-note-left-sidenav/topic-item/topic-item.component';
import { SubTopicItemComponent } from './meeting-note-left-sidenav/sub-topic-item/sub-topic-item.component';
import { TopicDropdownColorsComponent } from './topic-editable-toolbar/topic-dropdown-colors/topic-dropdown-colors.component';
import { SortablejsModule } from 'angular-sortablejs/dist';
import { PopupAddTaskComponent } from './popup-add-task/popup-add-task.component';
import { PopupTaskResponsibleComponent } from './popup-add-task/popup-task-responsible/popup-task-responsible.component';
import { FilterTaskTypePipe } from './pipes/filter-task-type.pipe';
import { MeetingNoteTasksComponent } from './meeting-note-tasks/meeting-note-tasks.component';
import { MeetingNoteAgreementsComponent } from './meeting-note-agreements/meeting-note-agreements.component';
import { FilterTopicWithAgreementPipe } from './pipes/filter-topic-with-agreement.pipe';
import { ModalTaskEditComponent } from './modal-task-edit/modal-task-edit.component';
import { TopicEditorToolbarCommentsComponent } from './topic-editor/topic-editor-toolbar-comments/topic-editor-toolbar-comments.component';
import { CommentThreadMeetingNoteComponent } from './comments/comment-thread-meeting-note/comment-thread-meeting-note.component';
import { TopicEditorDefaultComponent } from './topic-editor/topic-editor-default/topic-editor-default.component';
import { FilterCommentThreadEditorPipe } from './pipes/filter-comment-thread-editor.pipe';
import { ShareMeetingNoteModule } from '../share-meeting-note/share-meeting-note.module';
import { ModalApproveTopicsPendingComponent } from './modal-approve-topics-pending/modal-approve-topics-pending.component';
import { ModalApproveTopicWihoutAgreementsComponent } from './modal-approve-topic-wihout-agreements/modal-approve-topic-wihout-agreements.component';
import { ModalApproveTopicsComponent } from './modal-approve-topics/modal-approve-topics.component';
import { ModalMeetingNoteAuditComponent } from './modal-meeting-note-audit/modal-meeting-note-audit.component';
import { TourModule } from '../tour/tour.module';
import { MeetingNoteTutorialComponent } from './meeting-note-tutorial/meeting-note-tutorial.component';
import { TopicEditionLogComponent } from './topic-editor/topic-edition-log/topic-edition-log.component';
import { MeetingNoteWorkflowHeaderComponent } from './meeting-note-workflow-header/meeting-note-workflow-header.component';
import { ElasticInputModule } from 'angular2-elastic-input';
import { ShowTopicListPipe } from './pipes/show-topic-list.pipe';
import { CommentThreadMeetingNoteTitleComponent } from './comments/comment-thread-meeting-note-title/comment-thread-meeting-note-title.component';
import { TopicEditorAgreementTitleComponent } from './topic-editor/topic-editor-agreement-title/topic-editor-agreement-title.component';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';


@NgModule({
  imports: [
    SharedModule,
    MzInputModule,
    MzDatepickerModule,
    MzTimepickerModule,
    MzSelectModule,
    SharedModalModule,
    SharedCoreModule,
    SharedParticipantsModule,
    CommentThreadModule,
    FloatingNoteModule,
    SharedComponentsModule,
    SharedSidenavModule,
    SortablejsModule,
    ShareMeetingNoteModule,
    TourModule,
    ElasticInputModule.forRoot(),
    MeetingNoteRoutingModule,
  ],
  providers: [
    WorkflowService,
    InvitationStrategyService
  ],
  declarations: [
    MeetingNoteCreateComponent,
    ModalNewMeetingNoteComponent,
    MeetingNoteContentComponent,
    MeetingNoteHeaderComponent,
    MeetingNoteWorkflowHeaderComponent,
    MeetingNoteLeftSidenavComponent,
    TopicItemComponent,
    SubTopicItemComponent,
    MeetingNoteToolbarMainComponent,
    TopicEditableToolbarComponent,
    TopicDropdownColorsComponent,
    TopicToolbarComponent,
    PopupAddTaskComponent,
    PopupTaskResponsibleComponent,
    // Editor
    TopicEditorDefaultComponent,
    TopicEditorComponent,
    TopicEditorAgreementComponent,
    TopicEditorDescriptionComponent,
    TopicEditorTitleComponent,
    TopicEditorToolbarCommentsComponent,
    TopicEditionLogComponent,
    TopicEditorAgreementTitleComponent,
    // Toolbar
    TopicEditorToolbarComponent,
    // Tasks
    MeetingNoteTasksComponent,
    ModalTaskEditComponent,
    // Agreements
    MeetingNoteAgreementsComponent,
    // Comments
    CommentThreadMeetingNoteComponent,
    CommentThreadMeetingNoteTitleComponent,
    // Approve 
    ModalApproveTopicsPendingComponent,
    ModalApproveTopicWihoutAgreementsComponent,
    ModalApproveTopicsComponent,
    // Changes
    ModalMeetingNoteAuditComponent,
    // Tutorial
    MeetingNoteTutorialComponent,
    // Pipes
    TopicNotEmptyPipe,
    FilterItemSubTopicPipe,
    FilterTaskTypePipe,
    FilterTopicWithAgreementPipe,
    FilterCommentThreadEditorPipe,
    ShowTopicListPipe
  ]

  
})
export class MeetingNoteModule { }

import { NgModule } from '@angular/core';
import { BriefRoutingModule } from './brief-routing.module';
import { BriefCreateComponent } from './brief-create/brief-create.component';
import { ModalNewBriefComponent } from './modal-new-brief/modal-new-brief.component';
import { SharedModule } from '../shared/shared.module';
import { SharedModalModule } from '../shared-modal/shared-modal.module';
import { MzSelectModule, MzInputModule, MzDatepickerModule, MzTimepickerModule } from 'ngx-materialize';
import { WorkflowService } from '../../services/workflow/workflow.service';
import { BriefContentComponent } from './brief-content/brief-content.component';
import { NewBriefFormComponent } from './modal-new-brief/new-brief-form/new-brief-form.component';
import { BriefHeaderComponent } from './brief-header/brief-header.component';
import { FloatingNoteModule } from '../floating-note/floating-note.module';
import { SharedParticipantsModule } from '../shared-participants/shared-participants.module';
import { SharedCoreModule } from '../shared-core/shared-core.module';
import { CommentThreadModule } from '../comment-thread/comment-thread.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { SharedHeaderModule } from '../shared-header/shared-header.module';
import { BriefLeftSidenavComponent } from './brief-left-sidenav/brief-left-sidenav.component';
import { SharedSidenavModule } from '../shared-sidenav/shared-sidenav.module';
import { SortablejsModule } from 'angular-sortablejs';
import { CategoryItemComponent } from './brief-left-sidenav/category-item/category-item.component';
import { BriefCategoryContentComponent } from './brief-category-content/brief-category-content.component';
import { ElasticInputModule } from 'angular2-elastic-input';
import { BriefToolbarMainComponent } from './brief-toolbar-main/brief-toolbar-main.component';
import { BriefCategoryMenuComponent } from './brief-category-menu/brief-category-menu.component';
import { BriefCategoryHeaderComponent } from './brief-category-header/brief-category-header.component';
import { BriefToolbarMenuActionsComponent } from './brief-toolbar-menu-actions/brief-toolbar-menu-actions.component';
import { BriefCategoryItemQuestionComponent } from './brief-category-content/brief-category-item-question/brief-category-item-question.component';
import { BriefCategoryItemDefaultComponent } from './brief-category-content/brief-category-item-default/brief-category-item-default.component';
import { BriefCategoryItemResponseTypeComponent } from './brief-category-content/brief-category-item-response-type/brief-category-item-response-type.component';
import { ContextualBriefCategoryItemResponseComponent } from './brief-category-content/contextual-brief-category-item-response/contextual-brief-category-item-response.component';
import { BriefResponseTypeComponent } from './brief-category-content/brief-response-type/brief-response-type.component';
import { BriefResponseTextComponent } from './brief-category-content/brief-response-type/brief-response-text/brief-response-text.component';
import { BriefCategoryItemSubCategoryComponent } from './brief-category-content/brief-category-item-sub-category/brief-category-item-sub-category.component';
import { BriefCategoryItemTextComponent } from './brief-category-content/brief-category-item-text/brief-category-item-text.component';
import { BriefCategoryItemImageComponent } from './brief-category-content/brief-category-item-image/brief-category-item-image.component';
import { BriefCategoryItemVideoComponent } from './brief-category-content/brief-category-item-video/brief-category-item-video.component';
import { SubCategoryItemComponent } from './brief-left-sidenav/sub-category-item/sub-category-item.component';
import { FilterItemSubCategoryPipe } from './pipes/filter-item-sub-category.pipe';
import { BriefResponseCheckboxComponent } from './brief-category-content/brief-response-type/brief-response-checkbox/brief-response-checkbox.component';
import { OptionCheckboxComponent } from './brief-category-content/brief-response-type/brief-response-checkbox/option-checkbox/option-checkbox.component';
import { ContextualBriefIconComponent } from './brief-category-content/contextual-brief-icon/contextual-brief-icon.component';
import { BriefResponseRadioComponent } from './brief-category-content/brief-response-type/brief-response-radio/brief-response-radio.component';
import { OptionRadioComponent } from './brief-category-content/brief-response-type/brief-response-radio/option-radio/option-radio.component';
import { BriefResponseSelectComponent } from './brief-category-content/brief-response-type/brief-response-select/brief-response-select.component';
import { OptionSelectComponent } from './brief-category-content/brief-response-type/brief-response-select/option-select/option-select.component';
import { BriefResponseListComponent } from './brief-category-content/brief-response-type/brief-response-list/brief-response-list.component';
import { OptionListComponent } from './brief-category-content/brief-response-type/brief-response-list/option-list/option-list.component';
import { BriefResponseYesNoComponent } from './brief-category-content/brief-response-type/brief-response-yes-no/brief-response-yes-no.component';
import { OptionYesNoComponent } from './brief-category-content/brief-response-type/brief-response-yes-no/option-yes-no/option-yes-no.component';
import { BriefResponseTableComponent } from './brief-category-content/brief-response-type/brief-response-table/brief-response-table.component';
import { TableInputDefaultComponent } from './brief-category-content/brief-response-type/brief-response-table/table-input-default/table-input-default.component';
import { TableInputComponent } from './brief-category-content/brief-response-type/brief-response-table/table-input/table-input.component';
import { TableInputDateComponent } from './brief-category-content/brief-response-type/brief-response-table/table-input-date/table-input-date.component';
import { TableInputQuantityComponent } from './brief-category-content/brief-response-type/brief-response-table/table-input-quantity/table-input-quantity.component';
import { TableInputSelectComponent } from './brief-category-content/brief-response-type/brief-response-table/table-input-select/table-input-select.component';
import { TableInputPercentageComponent } from './brief-category-content/brief-response-type/brief-response-table/table-input-percentage/table-input-percentage.component';
import { TableInputTextComponent } from './brief-category-content/brief-response-type/brief-response-table/table-input-text/table-input-text.component';
import { ContextualResponseTableComponent } from './brief-category-content/brief-response-type/brief-response-table/contextual-response-table/contextual-response-table.component';
import { ContextualResponseTableSelectComponent } from './brief-category-content/brief-response-type/brief-response-table/contextual-response-table-select/contextual-response-table-select.component';
import { BriefResponseAscendentComponent } from './brief-category-content/brief-response-type/brief-response-ascendent/brief-response-ascendent.component';
import { OptionAscendentComponent } from './brief-category-content/brief-response-type/brief-response-ascendent/option-ascendent/option-ascendent.component';
import { BriefResponseDateComponent } from './brief-category-content/brief-response-type/brief-response-date/brief-response-date.component';
import { OptionDateComponent } from './brief-category-content/brief-response-type/brief-response-date/option-date/option-date.component';
import { BriefResponseQuantityComponent } from './brief-category-content/brief-response-type/brief-response-quantity/brief-response-quantity.component';
import { BriefResponseAssessmentComponent } from './brief-category-content/brief-response-type/brief-response-assessment/brief-response-assessment.component';
import { OptionAssessmentNumberComponent } from './brief-category-content/brief-response-type/brief-response-assessment/option-assessment-number/option-assessment-number.component';
import { OptionAssessmentTextComponent } from './brief-category-content/brief-response-type/brief-response-assessment/option-assessment-text/option-assessment-text.component';
import { ContextualBriefResponseComponent } from './brief-category-content/contextual-brief-response/contextual-brief-response.component';
import { BriefCategoryItemFilesComponent } from './brief-category-content/brief-category-item-files/brief-category-item-files.component';
import { BriefCategoryItemFilesContentComponent } from './brief-category-content/brief-category-item-files-content/brief-category-item-files-content.component';
import { ContentVideoComponent } from './brief-category-content/brief-category-item-files-content/content-video/content-video.component';
import { PopupRecordComponent } from './brief-category-content/brief-category-item-files/popup-record/popup-record.component';
import { BriefCategoryItemQuestionChildContainerComponent } from './brief-category-content/brief-category-item-question-child-container/brief-category-item-question-child-container.component';
import { BriefCategoryItemQuestionChildComponent } from './brief-category-content/brief-category-item-question-child/brief-category-item-question-child.component';
import { BriefToolbarCommentsComponent } from './brief-toolbar-comments/brief-toolbar-comments.component';
import { CommentThreadBriefComponent } from './comments/comment-thread-brief/comment-thread-brief.component';
import { FilterCommentThreadCategoryPipe } from './pipes/filter-comment-thread-category.pipe';
import { BriefToolbarGivebacksComponent } from './brief-toolbar-givebacks/brief-toolbar-givebacks.component';
import { BriefGivebacksSidenavComponent } from './brief-givebacks-sidenav/brief-givebacks-sidenav.component';
import { BriefGivebacksComponent } from './brief-givebacks/brief-givebacks.component';
import { BriefGivebackBlockComponent } from './brief-givebacks/brief-giveback-block/brief-giveback-block.component';
import { ShowCategoriesListPipe } from './pipes/show-categories-list.pipe';
import { CreateGivebackComponent } from './brief-givebacks-sidenav/create-giveback/create-giveback.component';
import { ReplyGivebackComponent } from './brief-givebacks-sidenav/reply-giveback/reply-giveback.component';

import { BriefTemplateHeaderComponent } from './brief-template-header/brief-template-header.component';
import { BriefTemplateContentComponent } from './brief-template-content/brief-template-content.component';
import { BriefCreateTemplateComponent } from './brief-create-template/brief-create-template.component';
import { ModalNewBriefTemplateComponent } from './modal-new-brief-template/modal-new-brief-template.component';
import { NewBriefTemplateComponent } from './modal-new-brief-template/new-brief-template/new-brief-template.component';
import { BriefTutorialComponent } from './brief-tutorial/brief-tutorial.component';
import { TourModule } from '../tour/tour.module';
import { BriefTutorialResponseComponent } from './brief-tutorial-response/brief-tutorial-response.component';
import { ModalBriefAuditComponent } from './modal-brief-audit/modal-brief-audit.component';
import { BriefCategoryLogComponent } from './brief-category-content/brief-category-log/brief-category-log.component';
import { BriefTemplatePitchComponent } from './brief-template-pitch/brief-template-pitch.component';
import { BriefPitchLeftSidenavComponent } from './brief-pitch-left-sidenav/brief-pitch-left-sidenav.component';
import { BriefGivebackPitchComponent } from './brief-giveback-pitch/brief-giveback-pitch.component';
import { BriefProposalsPitchComponent } from './brief-proposals-pitch/brief-proposals-pitch.component';
import { BriefFinalistsPitchComponent } from './brief-finalists-pitch/brief-finalists-pitch.component';
import { BriefPitchContentComponent } from './brief-pitch-content/brief-pitch-content.component';
import { ModalBriefPitchDatesComponent } from './modal-brief-pitch-dates/modal-brief-pitch-dates.component';
import { ModalAlertPreFinalistComponent } from './modal-alert-pre-finalist/modal-alert-pre-finalist.component';
import { ModalAlertFinalistComponent } from './modal-alert-finalist/modal-alert-finalist.component';
import { ModalAlertDiscardedComponent } from './modal-alert-discarded/modal-alert-discarded.component';
import { ModalAlertCanUploadProposalComponent } from './modal-alert-can-upload-proposal/modal-alert-can-upload-proposal.component';
import { ProposalUploadComponent } from './brief-proposals-pitch/proposal-upload/proposal-upload.component';
import { ProposalBlockComponent } from './brief-proposals-pitch/proposal-block/proposal-block.component';
import { ProposalDropdownOptionsComponent } from './brief-proposals-pitch/proposal-dropdown-options/proposal-dropdown-options.component';
import { BriefEditTemplateComponent } from './brief-edit-template/brief-edit-template.component';
import { ModalEditBriefTemplateComponent } from './modal-edit-brief-template/modal-edit-brief-template.component';
import { EditBriefTemplateComponent } from './modal-edit-brief-template/edit-brief-template/edit-brief-template.component';
import { BriefTutorialInterfaceComponent } from './brief-tutorial-interface/brief-tutorial-interface.component';
import { BriefTutorialCreatePitchComponent } from './brief-tutorial-create-pitch/brief-tutorial-create-pitch.component';
import { BriefCategoryItemDynamicContentComponent } from './brief-category-content/brief-category-item-dynamic-content/brief-category-item-dynamic-content.component';
import { DynamicTextComponent } from './brief-category-content/brief-category-item-dynamic-content/dynamic-text/dynamic-text.component';
import { DynamicIconComponent } from './brief-category-content/brief-category-item-dynamic-content/dynamic-icon/dynamic-icon.component';
import { ModalBriefIncompleteComponent } from './modal-brief-incomplete/modal-brief-incomplete.component';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';




@NgModule({
  imports: [
    SharedModule,
    MzDatepickerModule,
    MzTimepickerModule,
    SharedModalModule,
    SharedComponentsModule,
    SharedHeaderModule,
    MzSelectModule,
    MzInputModule,
    FloatingNoteModule,
    SharedParticipantsModule,
    SharedCoreModule,
    CommentThreadModule,
    SharedSidenavModule,
    SortablejsModule,
    ElasticInputModule.forRoot(),
    TourModule,
    BriefRoutingModule
  ],
  declarations: [
    // Create
    BriefCreateComponent,
    NewBriefFormComponent,
    ModalNewBriefComponent,
    // Edit
    BriefEditTemplateComponent,
    ModalEditBriefTemplateComponent,
    EditBriefTemplateComponent,
    // Brief Content,
    BriefContentComponent,
    BriefHeaderComponent,
    BriefToolbarMainComponent,
    BriefLeftSidenavComponent,
    CategoryItemComponent,
    SubCategoryItemComponent,
    BriefCategoryContentComponent,
    BriefCategoryHeaderComponent,
    BriefCategoryMenuComponent,
    BriefToolbarMenuActionsComponent,
    BriefCategoryItemDefaultComponent,
    // Log
    BriefCategoryLogComponent,
    // Types items
    BriefCategoryItemQuestionComponent,
    // Question childs
    BriefCategoryItemQuestionChildContainerComponent,
    BriefCategoryItemQuestionChildComponent,
    BriefCategoryItemSubCategoryComponent,
    BriefCategoryItemTextComponent,
    BriefCategoryItemImageComponent,
    BriefCategoryItemVideoComponent,
    BriefCategoryItemDynamicContentComponent,
    DynamicTextComponent,
    DynamicIconComponent,
    // Response type
    BriefCategoryItemResponseTypeComponent,
    ContextualBriefCategoryItemResponseComponent,
    // Question response
    BriefResponseTypeComponent,
    // Text
    BriefResponseTextComponent,
    // Checkbox
    BriefResponseCheckboxComponent,
    OptionCheckboxComponent,
    // Radio,
    BriefResponseRadioComponent,
    OptionRadioComponent,
    // Select
    BriefResponseSelectComponent,
    OptionSelectComponent,
    // List
    BriefResponseListComponent,
    OptionListComponent,
    // Yes No
    BriefResponseYesNoComponent,
    OptionYesNoComponent,
    // Table
    BriefResponseTableComponent,
    TableInputComponent,
    TableInputDefaultComponent,
    TableInputDateComponent,
    TableInputPercentageComponent,
    TableInputQuantityComponent,
    TableInputSelectComponent,
    TableInputTextComponent,
    ContextualResponseTableComponent,
    ContextualResponseTableSelectComponent,
    // Ascendent
    BriefResponseAscendentComponent,
    OptionAscendentComponent,
    // Date
    BriefResponseDateComponent,
    OptionDateComponent,
    // Quantity
    BriefResponseQuantityComponent,
    // Assessment
    BriefResponseAssessmentComponent,
    OptionAssessmentNumberComponent,
    OptionAssessmentTextComponent,
    // Contextual icon
    ContextualBriefIconComponent,
    // Contextual brief response
    ContextualBriefResponseComponent,
    // Files content
    BriefCategoryItemFilesComponent,
    PopupRecordComponent,
    BriefCategoryItemFilesContentComponent,
    ContentVideoComponent,
    // Comments
    BriefToolbarCommentsComponent,
    CommentThreadBriefComponent,
    // Givebacks
    BriefGivebacksComponent,
    BriefGivebackBlockComponent,
    BriefToolbarGivebacksComponent,
    BriefGivebacksSidenavComponent,
    CreateGivebackComponent,
    ReplyGivebackComponent,
    // Template Create
    BriefCreateTemplateComponent,
    NewBriefTemplateComponent,
    ModalNewBriefTemplateComponent,
    // Template edition
    BriefTemplateContentComponent,
    BriefTemplateHeaderComponent,
    // Template pitch
    BriefTemplatePitchComponent,
    BriefPitchLeftSidenavComponent,
    BriefGivebackPitchComponent,
    BriefProposalsPitchComponent,
    BriefFinalistsPitchComponent,
    // Pitch project
    BriefPitchContentComponent,
    ModalBriefPitchDatesComponent,
    ModalAlertPreFinalistComponent,
    ModalAlertFinalistComponent,
    ModalAlertDiscardedComponent,
    ModalAlertCanUploadProposalComponent,
    ProposalUploadComponent,
    ProposalBlockComponent,
    ProposalDropdownOptionsComponent,
    // Tutorial
    BriefTutorialComponent,
    BriefTutorialCreatePitchComponent,
    BriefTutorialInterfaceComponent,
    BriefTutorialResponseComponent,
    // Audit
    ModalBriefAuditComponent,
    // Pipes
    FilterItemSubCategoryPipe,
    FilterCommentThreadCategoryPipe,
    ShowCategoriesListPipe,
    // Brief incomplete
    ModalBriefIncompleteComponent



  ],
  providers: [
    WorkflowService,
    InvitationStrategyService
    
  ]
})
export class BriefModule { }

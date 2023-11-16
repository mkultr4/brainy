import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InterfaceDropdownDirective } from './interface-dropdown/interface-dropdown.directive';
import { InlineSVGModule } from 'ng-inline-svg';
import { AvatarComponent } from './avatar/avatar.component';
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgXtruncateModule } from 'ngx-truncate';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { NiceDateFormatPipe } from './pipes/nice-date-format.pipe';
import { NiceDateFormatTimestampPipePipe } from './pipes/nice-date-format-timestamp.pipe';
import { MomentDatePipe } from './pipes/moment-date.pipe';
import { NgPipesModule } from 'ngx-pipes';
import { FilterCoreByTypePipe } from './pipes/filter-core-by-type.pipe';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { ToastrModule } from 'ngx-toastr';
import { NiceDateComponent } from './nice-date/nice-date.component';
import { MzDropdownModule, MzButtonModule } from 'ngx-materialize';
import { MzDropdownBrainyComponent } from './mz-dropdown-brainy/mz-dropdown-brainy.component';
import { MzSelectContainerBrainyComponent } from './mz-select-container-brainy/mz-select-container-brainy.component';
import { ContentEditableModelDirective } from './content-editable-model/content-editable-model.directive';
import { FileHelpersModule } from '../file-helpers/file-helpers.module';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { TypeaheadModule } from 'ngx-bootstrap';
import { HighlightPipe } from './pipes/highlight.pipe';
import { BrandLogoComponent } from './brand-logo/brand-logo.component';
import { ToggleClassDirective } from './toggle-class/toggle-class.directive';
import { FilterProjectPipe } from './pipes/filter-project.pipe';
import { FilterCoreByProjectPipe } from './pipes/filter-core-by-project.pipe';
import { CustomFormsModule } from 'ngx-custom-validators';
import { DropdownWrapperDirective } from './dropdown/dropdown-wrapper.directive';
import { ModalFloatingComponent } from './modal-floating/modal-floating.component';

import { ClipboardModule } from 'ngx-clipboard';
import { FilterInvitationMyTeamPipe } from './pipes/filter-invitation-my-team.pipe';
import { BtnLoadingDirective } from './btn-loading/btn-loading.directive';
import { FilterCoreByBrandPipe } from './pipes/filter-core-by-brand.pipe';
import { FilterInvitationGuestPipe } from './pipes/filter-invitation-guest.pipe';
import { FilterInvitationPendingPipe } from './pipes/filter-invitation-pending.pipe';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { FilterCommentMessagePrimaryPipe } from './pipes/filter-comment-message-primary.pipe';
import { FilterCommentMessageByDayPipe } from './pipes/filter-comment-message-by-day.pipe';
import { FilterCommentThreadParticipantTypePipe } from './pipes/filter-comment-thread-participant-type.pipe';
import { FilterCommentThreadStatusPipe } from './pipes/filter-comment-thread-status.pipe';
import { ResizableDirective } from './resizable/resizable.directive';
import { DraggableDirective } from './draggable/draggable.directive';
import { ElasticDirective } from './elastic/elastic.directive';
import { MagnificPopupDirective } from './magnific-poup/magnific-popup.directive';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { EmailBlockComponent } from './email-block/email-block.component';
import { LinkyModule } from 'ngx-linky';
import { ContentEditableMenuComponent } from './content-editable-menu/content-editable-menu.component';
import { AnchorScrollDirective } from './anchor-scroll/anchor-scroll.directive';
import { TableColumnResizeDirective } from './table-column-resize/table-column-resize.directive';
import {NgxMaskModule} from 'ngx-mask'
import { FilterSearchUserPipe } from './pipes/filter-search-user.pipe';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule.forRoot(),
    TranslateModule,
    PerfectScrollbarModule,
    NgXtruncateModule,
    NgPipesModule,
    // Toastr on share module dont work
    MzDropdownModule,
    MzButtonModule,
    FileHelpersModule,
    TypeaheadModule.forRoot(),
    CustomFormsModule,
    ClipboardModule,
    LinkyModule,
    NgxMaskModule.forRoot()


  ],
  declarations: [
    // Directives
    InterfaceDropdownDirective,
    TooltipDirective,
    ContentEditableModelDirective,
    ToggleClassDirective,
    DropdownWrapperDirective,
    BtnLoadingDirective,
    ResizableDirective,
    DraggableDirective,
    ElasticDirective,
    MagnificPopupDirective,
    AnchorScrollDirective,
    TableColumnResizeDirective,
    // Components
    AvatarComponent,
    BrandLogoComponent,
    NiceDateComponent,
    MzDropdownBrainyComponent,
    AlertDialogComponent,
    ModalFloatingComponent,
    AudioPlayerComponent,
    EmailBlockComponent,
    ContentEditableMenuComponent,
    // Select
    MzSelectContainerBrainyComponent,
    // Pipes
    NiceDateFormatPipe,
    NiceDateFormatTimestampPipePipe,
    MomentDatePipe,
    FilterCoreByTypePipe,
    SanitizePipe,
    HighlightPipe,
    FilterProjectPipe,
    FilterCoreByProjectPipe,
    FilterCoreByBrandPipe,
    FilterInvitationMyTeamPipe,
    FilterInvitationGuestPipe,
    FilterInvitationPendingPipe,
    FilterCommentMessagePrimaryPipe,
    FilterCommentMessageByDayPipe,
    FilterCommentThreadParticipantTypePipe,
    FilterCommentThreadStatusPipe,
    CapitalizePipe,
    FilterSearchUserPipe

  ],
  entryComponents: [
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  exports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
    TranslateModule,
    PerfectScrollbarModule,
    NgXtruncateModule,
    NgPipesModule,
    ToastrModule,
    MzDropdownModule,
    MzButtonModule,
    FileHelpersModule,
    TypeaheadModule,
    CustomFormsModule,
    ClipboardModule,
    LinkyModule,
    NgxMaskModule,
    // Directives
    InterfaceDropdownDirective,
    TooltipDirective,
    ContentEditableModelDirective,
    ToggleClassDirective,
    DropdownWrapperDirective,
    BtnLoadingDirective,
    ResizableDirective,
    DraggableDirective,
    ElasticDirective,
    MagnificPopupDirective,
    AnchorScrollDirective,
    TableColumnResizeDirective,
    // Components
    AvatarComponent,
    BrandLogoComponent,
    NiceDateComponent,
    MzDropdownBrainyComponent,
    AlertDialogComponent,
    ModalFloatingComponent,
    AudioPlayerComponent,
    EmailBlockComponent,
    ContentEditableMenuComponent,
    // Select
    MzSelectContainerBrainyComponent,
    // Pipes
    NiceDateFormatPipe,
    NiceDateFormatTimestampPipePipe,
    MomentDatePipe,
    FilterCoreByTypePipe,
    SanitizePipe,
    HighlightPipe,
    FilterProjectPipe,
    FilterCoreByProjectPipe,
    FilterCoreByBrandPipe,
    FilterInvitationMyTeamPipe,
    FilterInvitationGuestPipe,
    FilterInvitationPendingPipe,
    FilterCommentMessagePrimaryPipe,
    FilterCommentMessageByDayPipe,
    FilterCommentThreadParticipantTypePipe,
    FilterCommentThreadStatusPipe,
    CapitalizePipe,
    FilterSearchUserPipe

  ]
})
export class SharedModule {

}

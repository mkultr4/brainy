import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentThreadRoutingModule } from './comment-thread-routing.module';
import { CommentComunicationService } from './services/comment-comunication.service';
import { SharedModule } from '../shared/shared.module';
import { SharedInvitationsModule } from '../shared-invitations/shared-invitations.module';
import { MzInputModule, MzSelectModule } from 'ngx-materialize';
import { CommentThreadStrategyService } from '../../services/comments/comment-thread-strategy.service';
import { CommentBoxMentionComponent } from './comment-box-mention/comment-box-mention.component';
import { CommentInputComponent } from './comment-input/comment-input.component';
import { CommentInputRecordComponent } from './comment-input/comment-input-record/comment-input-record.component';
import { CommentThreadPointComponent } from './comment-thread-point/comment-thread-point.component';
import { CommentThreadPointPopupUserComponent } from './comment-thread-point-popup-user/comment-thread-point-popup-user.component';
import { CommentThreadPopupComponent } from './comment-thread-popup/comment-thread-popup.component';
import { CommentThreadPopupInvitationListComponent } from './comment-thread-popup/comment-thread-popup-invitation-list/comment-thread-popup-invitation-list.component';
import { CommentThreadPopupInvitationsComponent } from './comment-thread-popup/comment-thread-popup-invitations/comment-thread-popup-invitations.component';
import { CommentThreadPopupNewInvitationComponent } from './comment-thread-popup/comment-thread-popup-new-invitation/comment-thread-popup-new-invitation.component';
import { CommentThreadSidenavComponent } from './comment-thread-sidenav/comment-thread-sidenav.component';
import { CommentBoxComponent } from './comment-box/comment-box.component';
import { SharedSidenavModule } from '../shared-sidenav/shared-sidenav.module';
import { SharedModalModule } from '../shared-modal/shared-modal.module';
import { ModalCommentThreadFilterComponent } from './modal-comment-thread-filter/modal-comment-thread-filter.component';
import { ModalDeleteCommentThreadComponent } from './modal-delete-comment-thread/modal-delete-comment-thread.component';
import { ModalDownloadCommentThreadComponent } from './modal-download-comment-thread/modal-download-comment-thread.component';
import { CommentThreadSidenavSearchComponent } from './comment-thread-sidenav-search/comment-thread-sidenav-search.component';
import { CommentBoxSearchComponent } from './comment-box-search/comment-box-search.component';
import { CommentBoxLinkComponent } from './comment-box-link/comment-box-link.component';
import { CommentThreadImageComponent } from './comment-thread-image/comment-thread-image.component';


@NgModule({
  imports: [
    SharedModule,
    SharedSidenavModule,
    SharedInvitationsModule,
    SharedModalModule,
    MzInputModule,
    MzSelectModule,
    CommentThreadRoutingModule
  ],
  declarations: [
    CommentBoxMentionComponent,
    CommentBoxComponent,
    CommentInputComponent,
    CommentInputRecordComponent,
    CommentThreadPointComponent,
    CommentThreadPointPopupUserComponent,
    CommentThreadPopupComponent,
    CommentThreadPopupInvitationListComponent,
    CommentThreadPopupInvitationsComponent,
    CommentThreadPopupNewInvitationComponent,
    CommentThreadSidenavComponent,
    ModalCommentThreadFilterComponent,
    ModalDeleteCommentThreadComponent,
    ModalDownloadCommentThreadComponent,
    CommentThreadSidenavSearchComponent,
    CommentBoxSearchComponent,
    CommentBoxLinkComponent,
    CommentThreadImageComponent
  ],
  exports: [
    CommentBoxMentionComponent,
    CommentBoxComponent,
    CommentInputComponent,
    CommentInputRecordComponent,
    CommentThreadPointComponent,
    CommentThreadPointPopupUserComponent,
    CommentThreadPopupComponent,
    CommentThreadPopupInvitationListComponent,
    CommentThreadPopupInvitationsComponent,
    CommentThreadPopupNewInvitationComponent,
    CommentThreadSidenavComponent,
    ModalCommentThreadFilterComponent,
    ModalDeleteCommentThreadComponent,
    ModalDownloadCommentThreadComponent,
    CommentThreadSidenavSearchComponent,
    CommentBoxSearchComponent,
    CommentBoxLinkComponent,
    CommentThreadImageComponent
  ],
  providers: [
    
  ]
})
export class CommentThreadModule { }

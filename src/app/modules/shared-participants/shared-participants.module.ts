import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SidenavParticipantsComponent } from './sidenav-participants/sidenav-participants.component';
import { SharedSidenavModule } from '../shared-sidenav/shared-sidenav.module';
import { ModalShareParticipantsComponent } from './modal-share-participants/modal-share-participants.component';
import { ShareParticipantsComponent } from './modal-share-participants/share-participants/share-participants.component';
import { ShareParticipantsContentComponent } from './modal-share-participants/share-participants-content/share-participants-content.component';
import { ModalShareParticipantsLinkComponent } from './modal-share-participants/modal-share-participants-link/modal-share-participants-link.component';
import { ShareNewParticipantsComponent } from './modal-share-participants/share-new-participants/share-new-participants.component';
import { SharedModalModule } from '../shared-modal/shared-modal.module';
import { MzInputModule, MzSelectModule } from 'ngx-materialize';
import { SharedInvitationsModule } from '../shared-invitations/shared-invitations.module';
import { ParticipantProfileWrapperComponent } from './participant-profile-wrapper/participant-profile-wrapper.component';
import { ParticipantProfileDropdownComponent } from './participant-profile-dropdown/participant-profile-dropdown.component';


@NgModule({
  imports: [
    SharedModule,
    SharedSidenavModule,
    MzInputModule,
    SharedInvitationsModule,
    SharedModalModule,
    SharedSidenavModule,
    MzSelectModule,
  ],
  declarations: [
    SidenavParticipantsComponent,
    ModalShareParticipantsComponent,
    ModalShareParticipantsLinkComponent,
    ShareParticipantsContentComponent,
    ShareParticipantsComponent,
    ShareNewParticipantsComponent,
    ParticipantProfileWrapperComponent,
    ParticipantProfileDropdownComponent

  ],
  exports: [
    SidenavParticipantsComponent,
    ModalShareParticipantsComponent,
    ModalShareParticipantsLinkComponent,
    ShareParticipantsContentComponent,
    ShareParticipantsComponent,
    ShareNewParticipantsComponent
  ]
})
export class SharedParticipantsModule { }

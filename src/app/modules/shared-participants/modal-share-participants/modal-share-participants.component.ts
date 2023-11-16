import { Component, OnInit, Input, EventEmitter, Output, Renderer, ViewChild } from '@angular/core';
import { Invitation } from '../../../models/invitations/invitation';
import { InvitationLevel } from '../../../models/invitations/invitation-level';
import * as uuid from 'uuid/v4';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { AnimateModalComponent } from '../../shared-modal/animate-modal/animate-modal.component';
import { ShareParticipantsContentComponent } from './share-participants-content/share-participants-content.component';
@Component({
  selector: 'app-modal-share-participants',
  templateUrl: './modal-share-participants.component.html',
  styleUrls: ['./modal-share-participants.component.scss'],
})
export class ModalShareParticipantsComponent implements OnInit {
  // Public
  public invitations: Array<Invitation> = new Array<Invitation>();
  public modaShareLinkId = uuid();
  // Inputs
  @Input() invitationLevelId = InvitationLevel.CORE;
  @Input() invitationReferenceId: string;
  @Input() objectType: string;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() showShareLink = true;
  @Input() candAddParticipants = true;
  @Input() canAssignPermission = true;
  // Output
  @Output() modalOnClose = new EventEmitter();
  // View Child
  @ViewChild('modal') modal: AnimateModalComponent;
  @ViewChild('shareContent') shareContent: ShareParticipantsContentComponent;
  constructor() {
  }

  ngOnInit() {
  }

  showModal() {
    this.modal.showModal();
  }
  closeModal(invitations) {
    this.modalOnClose.emit(invitations);
    this.modal.closeModal();
  }

  modalOnShow() {

  }

  modalOnHide() {

    this.invitations = [];
    this.shareContent.asyncParticipantSearch = '';
  }
}

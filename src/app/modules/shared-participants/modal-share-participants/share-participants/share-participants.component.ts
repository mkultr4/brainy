import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { Invitation } from '../../../../models/invitations/invitation';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { InvitationStrategyService } from '../../../../services/invitations/invitation-strategy.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-share-participants',
  templateUrl: './share-participants.component.html',
  styleUrls: ['./share-participants.component.scss']
})
export class ShareParticipantsComponent implements OnInit {
  // Publics
  public receiveComments = true;
  public btnInvitingParticipants = false;
  // Services
  private _invitationService;
  // Inputs
  @Input() invitations: Array<Invitation> = [];
  @Input() canAssignPermission = true;
  // Output
  @Output() shareOnDeleteParticipant = new EventEmitter();
  @Output() shareOnDeleteInvitation = new EventEmitter();
  @Output() shareOnChangePermissionInvitation = new EventEmitter();
  @Output() shareOnCloseParentModal = new EventEmitter();
  // View childs
  @ViewChild('participantsScroll', { read: PerfectScrollbarDirective }) participantsScroll: PerfectScrollbarDirective;
  constructor(
    private _invitationStrategyService: InvitationStrategyService,
    private _toastrService: ToastrService,
    private _authService: AuthenticationService
  ) {
    this._invitationService = this._invitationStrategyService.getService();
  }

  ngOnInit() {
  }
  // Delete invitation
  deleteInvitation(invitation: Invitation) {
    const index = this.invitations.indexOf(invitation);
    this.invitations.splice(index, 1);
    this.shareOnDeleteParticipant.emit(this.invitations);
    setTimeout(() => {
      this.participantsScroll.update();
    });
  }


  // Set permission
  setPermissionInvitation(permission) {
    // console.log('change', permission);
    this.shareOnChangePermissionInvitation.emit(permission);
  }
  setPermissionParticipant(permission) {
    // console.log('change', permission);
  }
  // process invitations

  // Invite
  inviteParticipants() {
    this.btnInvitingParticipants = true;
    for (const invitation of this.invitations) {
      invitation.user = this._authService.getAuthUser();
      // invitation.workspaceAccess = this._authService.getAuthWorkspaceAccess();
    };

    this._invitationService.createList(this.invitations).subscribe((invitations) => {
      console.log('share',invitations);
      this.shareOnCloseParentModal.emit(invitations);
      setTimeout(() => {
        this.btnInvitingParticipants = false;
        this._toastrService.info('Se enviaron las nuevas invitaciones.');
      }, 900);
    });
  }


}

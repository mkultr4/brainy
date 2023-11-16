import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as uuid from 'uuid/v4';
import { Invitation } from '../../../models/invitations/invitation';

@Component({
  selector: 'app-invitation-block,[app-invitation-block]',
  templateUrl: './invitation-block.component.html',
  styleUrls: ['./invitation-block.component.scss']
})
export class InvitationBlockComponent implements OnInit {
  public dropdownId = 'dropdown-p-' + uuid();
  public btnId = 'dropdown-btn-' + uuid();
  @Input() avatarClass = 'profile-image-medium-1';
  @Input() labelNew = true;
  @Input() permissionButton = true;
  @Input() invitation: Invitation;
  @Output() invitationOnDelete = new EventEmitter();
  @Output() invitationSetPermission = new EventEmitter();
  // Constuctor
  constructor() { }

  ngOnInit() {
  }
  // On delete participant
  deleteInvitation() {
    console.log('delete', this.invitation);
    this.invitationOnDelete.emit(this.invitation);
  }
  onSetPermission(permission) {
    this.invitationSetPermission.emit({ permission: permission, invitation: this.invitation });
  }
}

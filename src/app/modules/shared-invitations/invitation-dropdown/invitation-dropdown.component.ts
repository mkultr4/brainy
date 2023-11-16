import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Invitation } from '../../../models/invitations/invitation';
@Component({
  selector: 'app-invitation-dropdown,[app-invitation-dropdown]',
  templateUrl: './invitation-dropdown.component.html',
  styleUrls: ['./invitation-dropdown.component.scss']
})
export class InvitationDropdownComponent implements OnInit {
  @Input() invitation: Invitation;
  @Input() coreKey = 'share'
  @Input() withArrow = false;
  @Output() invitationOnCancelInvitation = new EventEmitter();
  @Output() invitationOnChangePermission = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  cancelInvitation() {
    this.invitationOnCancelInvitation.emit();
  }

  onChangePermissions(permission) {
    this.invitationOnChangePermission.emit(permission);
  }
}

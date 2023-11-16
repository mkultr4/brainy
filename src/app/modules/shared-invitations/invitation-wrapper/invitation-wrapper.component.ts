import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Invitation } from '../../../models/invitations/invitation';


@Component({
  selector: 'app-invitation-wrapper',
  templateUrl: './invitation-wrapper.component.html',
  styleUrls: ['./invitation-wrapper.component.scss'],

})
export class InvitationWrapperComponent implements OnInit {
  public invitationDraft: Invitation;
  public permissionDraft = '';
  @Input() invitation: Invitation;
  @Input() profileClass = 'profile-image-medium-1 '
  @Input() showStatus = true;
  @Input() coreKey = 'share'
  @Input() timeout = 100;
  @Input() gutter = 8;
  @Input() gutterAlignment = 8;
  @Input() edge = 'left';
  @Input() withArrow = false;
  @Output() invitationOnRemoveInvitation = new EventEmitter();
  @Output() invitationOnEditPermission = new EventEmitter();
  public isShowDeleteAlert = false;
  public isShowPermissionAlert = false;

  public showDropdown = false;
  constructor() { }

  ngOnInit() {
    this.invitationDraft = Object.assign({}, this.invitation);
  }

  onHide() {
  }
  onShow() {
    this.showDropdown = true;
  }
  onCancelInvitation() {
    this.isShowDeleteAlert = true;
  }
  cancelInvitation(cancel) {
    this.isShowDeleteAlert = false;
    console.log(this.isShowDeleteAlert);
    if (cancel) {
      this.invitationOnRemoveInvitation.emit(this.invitation);
    }
  }
  onChangePermission(permission) {
    this.permissionDraft = permission;
    this.isShowPermissionAlert = true;
  }
  changePermission(change) {
    this.isShowPermissionAlert = false;
    if (change) {
      this.invitation.groupReference = this.permissionDraft;
      this.invitationDraft.groupReference = this.permissionDraft;
      this.invitationOnEditPermission.emit(this.invitation);
    } else {
      
    }
  }

}

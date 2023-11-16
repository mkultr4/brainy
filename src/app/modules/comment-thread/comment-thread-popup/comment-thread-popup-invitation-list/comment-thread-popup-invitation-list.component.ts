import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { Invitation } from '../../../../models/invitations/invitation';

@Component({
  selector: 'app-comment-thread-popup-invitation-list,[app-comment-thread-popup-invitation-list]',
  templateUrl: './comment-thread-popup-invitation-list.component.html',
  styleUrls: ['./comment-thread-popup-invitation-list.component.scss']
})
export class CommentThreadPopupInvitationListComponent implements OnInit {
  @Input() invitations: Array<Invitation>;
  // On delete invitation
  @Output() commentOnDeleteInvitation = new EventEmitter();
  // on change permission invitation
  @Output() commentOnChangePermissionInvitation = new EventEmitter();
  // Scrollable
  @ViewChild('participantsScroll', { read: PerfectScrollbarDirective }) participantsScroll: PerfectScrollbarDirective;
  constructor() { }

  ngOnInit() {
  }

  // Delete invitation
  deleteInvitation(invitation: Invitation) {
    const index = this.invitations.indexOf(invitation);
    this.invitations.splice(index, 1);
    this.commentOnDeleteInvitation.emit(invitation);
    setTimeout(() => {
      this.participantsScroll.update();
    });
  }


  // Set permission
  setPermissionInvitation(permission) {
    // console.log('change', permission);
    this.commentOnChangePermissionInvitation.emit(permission);
  }

}

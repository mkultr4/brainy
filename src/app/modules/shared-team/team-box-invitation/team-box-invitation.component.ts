import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Invitation } from '../../../models/invitations/invitation';
import { MzDropdownBrainyComponent } from '../../shared/mz-dropdown-brainy/mz-dropdown-brainy.component';
import { TeamWorkflowService } from '../services/team-workflow.service';


@Component({
  selector: 'app-team-box-invitation,[app-team-box-invitation]',
  templateUrl: './team-box-invitation.component.html',
  styleUrls: ['./team-box-invitation.component.scss']
})
export class TeamBoxInvitationComponent implements OnInit {
  @ViewChild('menu', { read: MzDropdownBrainyComponent }) menu: MzDropdownBrainyComponent;
  @Input() invitation: Invitation;

  constructor(
    private _router: Router,
    private _teamWorkflowService: TeamWorkflowService
  ) { }

  ngOnInit() {

  }
  eliminate() {
    this._teamWorkflowService.eliminateInvitation(this.invitation);
  }
  mouseleave() {
    this.menu.close();
  }
  viewProfile() {
    this._router.navigate(['/profile-invitation/', this.invitation.id]);
  }
}

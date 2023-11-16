import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingStateService } from '../../../services/routing-state.service';
import { User } from '../../../models/users/user';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';

@Component({
  selector: 'app-profile-content',
  templateUrl: './profile-content.component.html',
  styleUrls: ['./profile-content.component.scss'],
  providers: [InvitationStrategyService]
})
export class ProfileContentComponent implements OnInit {
  public lastState = '/';
  public currentUser: User;
  public workspaceAccess: WorkspaceAccess;
  constructor(
    private _router: Router,
    private _routingState: RoutingStateService,
    private _authService: AuthenticationService
  ) {
    this.lastState = this._routingState.getPreviousUrl();
    this.currentUser = this._authService.getAuthUser();
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
  }

  ngOnInit() {
  }

  goBack() {
    this._router.navigate(['/team']);
    /* if (this.lastState === '/') {
      this._router.navigate(['/team']);
    } else {
      this._router.navigate([this.lastState]);
    }*/
  }

}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { User } from '../../../models/users/user';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { RolService } from '../../../services/roles/rol.service';
import { Router } from '@angular/router';
import { BillingStrategyService } from 'src/app/services/billing/billing-strategy.service';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';
@Component({
  selector: 'app-profile-user-content',
  templateUrl: './profile-user-content.component.html',
  styleUrls: ['./profile-user-content.component.scss'],
  providers:[BillingStrategyService,InvitationStrategyService]
})
export class ProfileUserContentComponent implements OnInit {
  // public
  public currentUser: User;
  public workspaceAccess: WorkspaceAccess;
  public isAdmin = false;
  constructor(
    private _authService: AuthenticationService,
    private _router: Router
  ) {
    this.currentUser = this._authService.getAuthUser();
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
    this.isAdmin = RolService.isAdminRol(this.workspaceAccess.rol.key);
    if (!this.workspaceAccess) {
      this._router.navigate(['/dashboard']);
    }

  }

  ngOnInit() {
  }

}

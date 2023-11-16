import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../models/users/user';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { ISubscription } from 'rxjs/Subscription';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-profile-invitation-content',
  templateUrl: './profile-invitation-content.component.html',
  styleUrls: ['./profile-invitation-content.component.scss']
})
export class ProfileInvitationContentComponent implements OnInit, OnDestroy {
  // Public vars
  public currentUser: User;
  public workspaceAccess: WorkspaceAccess;
  // Subscription
  public subscriptionParams: ISubscription;
  constructor(
    private _authService: AuthenticationService,
    private _ativatedRoute: ActivatedRoute,
    private _router: Router
  ) {
    this.currentUser = this._authService.getAuthUser();
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
  }

  ngOnInit() {
    this.subscriptionParams = this._ativatedRoute.params.subscribe(params => {

      if (!params.id) {
        this._router.navigate(['/team']);
      }
    });
  }

  goBack() {
    this._router.navigate(['/team']);
    /* if (this.lastState === '/') {
      this._router.navigate(['/team']);
    } else {
      this._router.navigate([this.lastState]);
    }*/
  }
  ngOnDestroy() {
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
  }

}

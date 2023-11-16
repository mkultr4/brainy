import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { PreloaderService } from '../../shared-components/preloader/preloader.service';
import { TeamFilterService } from '../../shared-team/services/team-filter.service';
import { InvitationStrategyService } from '../../../services/invitations/invitation-strategy.service';
import { WorkspaceAccessStrategyService } from '../../../services/workspace/workspace-access-strategy.service';
import { InvitationLevel } from '../../../models/invitations/invitation-level';

@Component({
  selector: 'app-brand-profile-members-group',
  templateUrl: './brand-profile-members-group.component.html',
  styleUrls: ['./brand-profile-members-group.component.scss']
})
export class BrandProfileMembersGroupComponent implements OnInit, AfterContentInit, OnDestroy {

  public workspaceAccess: WorkspaceAccess;
  public brandId: string;
  public categoryId: string;
  public guests = [];
  public invitations = [];
  public order: any = { column: 'modified', direction: -1 };
  public query = '';
  // Service
  private _workspaceAccessService;
  private _invitationService;
  // Subscription
  public subscriptionGuests: ISubscription;
  public subscriptionInvitations: ISubscription;
  public subscriptionFilterQuery: ISubscription;
  public subscriptionParamsParent: ISubscription;
  public subscriptionParams: ISubscription;
  constructor(
    private _router: Router,
    private _ativatedRoute: ActivatedRoute,
    private _authService: AuthenticationService,
    private _workspaceAccessStartegyService: WorkspaceAccessStrategyService,
    private _invitationStartegyService: InvitationStrategyService,
    private _preloaderService: PreloaderService,
    private _teamFilterService: TeamFilterService
  ) {
    this._workspaceAccessService = this._workspaceAccessStartegyService.getService();
    this._invitationService = this._invitationStartegyService.getService();
    // Workspace Access
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
    this.subscriptionParamsParent = this._ativatedRoute.parent.parent.params.subscribe(params => {
      this.brandId = params.id;
    });
    // Query
    this.subscriptionFilterQuery = this._teamFilterService.teamQueryFilter.subscribe(query => {
      this.query = query;
    });
  }

  ngOnInit() {
    this.subscriptionParams = this._ativatedRoute.params.subscribe(params => {

      if (params.groupId) {
        this.categoryId = params.groupId;
        this._workspaceAccessService
          .loadWorkpaceAccessBrand(this.brandId, this.categoryId, this.workspaceAccess).subscribe(() => {
            this._preloaderService.showPreloader(false);
          });
        this._invitationService.loadAllNewInvitations(InvitationLevel.BRAND, this.brandId).subscribe();
      } else {
        this._router.navigate(['group'], { relativeTo: this._ativatedRoute });
      }
    });
  }
  ngAfterContentInit() {
    this.subscriptionGuests = this._workspaceAccessService.workspaceAccesses.subscribe(guests => {
      this.guests = Object.assign([], guests);
    });
    // Invitations
    this.subscriptionInvitations = this._invitationService.invitations.subscribe(invitations => {
      this.invitations = Object.assign([], invitations);
    });
  }
  ngOnDestroy() {
    if (this.subscriptionParamsParent) {
      this.subscriptionParamsParent.unsubscribe();
    }
    if (this.subscriptionGuests) {
      this.subscriptionGuests.unsubscribe();
    }
    if (this.subscriptionInvitations) {
      this.subscriptionInvitations.unsubscribe();
    }
    if (this.subscriptionFilterQuery) {
      this.subscriptionFilterQuery.unsubscribe();
    }
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
  }

}

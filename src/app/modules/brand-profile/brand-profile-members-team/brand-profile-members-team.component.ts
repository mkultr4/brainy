import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { Invitation } from '../../../models/invitations/invitation';
import { ISubscription } from 'rxjs/Subscription';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { ActivatedRoute } from '@angular/router';
import { InvitationLevel } from '../../../models/invitations/invitation-level';
import { TeamFilterService } from '../../shared-team/services/team-filter.service';
import { InvitationStrategyService } from '../../../services/invitations/invitation-strategy.service';
import { WorkspaceAccessStrategyService } from '../../../services/workspace/workspace-access-strategy.service';
import { PreloaderService } from '../../shared-components/preloader/preloader.service';

@Component({
  selector: 'app-brand-profile-members-team',
  templateUrl: './brand-profile-members-team.component.html',
  styleUrls: ['./brand-profile-members-team.component.scss']
})
export class BrandProfileMembersTeamComponent implements OnInit, OnDestroy, AfterContentInit {
  // Vars
  public brandId: string;
  public workspaceAccess: WorkspaceAccess;
  public team: Array<WorkspaceAccess> = [];
  public invitations: Array<Invitation> = [];
  // Filter
  public orderBy = '-modified';
  public query = '';
  // Service
  private _workspaceAccessService;
  private _invitationService;
  // Subscriptions
  public subscriptionParams: ISubscription;
  public subscriptionTeam: ISubscription;
  public subscriptionTeamInvitations: ISubscription;
  public subscriptionFilterQuery: ISubscription;
  constructor(
    private _authService: AuthenticationService,
    private _ativatedRoute: ActivatedRoute,
    private _workspaceAccessStartegyService: WorkspaceAccessStrategyService,
    private _invitationStartegyService: InvitationStrategyService,
    private _teamFilterService: TeamFilterService,
    private _preloaderService: PreloaderService
  ) {
    this._workspaceAccessService = this._workspaceAccessStartegyService.getService();
    this._invitationService = this._invitationStartegyService.getService();
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
    this.subscriptionParams = this._ativatedRoute.parent.parent.params.subscribe(params => {
      this.brandId = params.id;
    });
    // Query
    this.subscriptionFilterQuery = this._teamFilterService.teamQueryFilter.subscribe(query => {
      this.query = query;
    });
  }

  ngOnInit() {
  }
  ngAfterContentInit() {
    setTimeout(() => {
      this._workspaceAccessService.loadWorkpaceAccessBrand(this.brandId).subscribe(wa => {
        this._preloaderService.showPreloader(false);
      });
      this._invitationService.loadAllNewInvitations(InvitationLevel.BRAND, this.brandId).subscribe();
      // Team
      this.subscriptionTeam = this._workspaceAccessService.workspaceAccesses.subscribe(team => {
        this.team = Object.assign([], team);
      });
      // Invitations
      this.subscriptionTeamInvitations = this._invitationService.invitations.subscribe(invitations => {
        this.invitations = Object.assign([], invitations);
      });

    });
  }
  ngOnDestroy() {
    if (this.subscriptionTeam) {
      this.subscriptionTeam.unsubscribe();
    }
    if (this.subscriptionTeamInvitations) {
      this.subscriptionTeamInvitations.unsubscribe();
    }
    if (this.subscriptionFilterQuery) {
      this.subscriptionFilterQuery.unsubscribe();
    }
  }
}

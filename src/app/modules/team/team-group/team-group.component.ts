import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountStatus } from '../../../models/workspace/account-status';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { ISubscription } from 'rxjs/Subscription';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TeamFilterService } from '../../shared-team/services/team-filter.service';
import { PreloaderService } from '../../shared-components/preloader/preloader.service';
import { WorkspaceAccessStrategyService } from '../../../services/workspace/workspace-access-strategy.service';
import { InvitationStrategyService } from '../../../services/invitations/invitation-strategy.service';
import { environment } from '../../../../environments/environment';
import { InvitationLevel } from '../../../models/invitations/invitation-level';
@Component({
  selector: 'app-team-group',
  templateUrl: './team-group.component.html',
  styleUrls: ['./team-group.component.scss']
})
export class TeamGroupComponent implements OnInit, OnDestroy {
  // Public vars
  public guests = [];
  public invitations = [];
  public filterStatus: AccountStatus;
  public order: any = { column: 'modified', direction: -1 };
  public query = '';
  public categoryId = '';
  public workspaceAccess: WorkspaceAccess;
  public empty = false;
  // Services
  private _workspaceAccessService;
  private _invitationService;
  // Subcriptions
  public subscriptionParams: ISubscription;
  public subscriptionGuests: ISubscription;
  public subscriptionFilterStatus: ISubscription;
  public subscriptionFilterOrder: ISubscription;
  public subscriptionFilterQuery: ISubscription;
  public subscriptionInvitations: ISubscription;
  public subscriptionQueryParams: ISubscription;
  constructor(
    private _authService: AuthenticationService,
    private _workspaceAccessStrategyService: WorkspaceAccessStrategyService,
    private _invitationStrategyService: InvitationStrategyService,
    private _preloaderService: PreloaderService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _teamFilterService: TeamFilterService
  ) {

    // Access
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
    // Services
    this._invitationService = this._invitationStrategyService.getService();
    this._workspaceAccessService = this._workspaceAccessStrategyService.getService();
    // Team
    this.subscriptionGuests = this._workspaceAccessService.workspaceAccesses.subscribe(guests => {
      this.guests = Object.assign([], guests);
    });
    // Invitations
    this.subscriptionInvitations = this._invitationService.invitations.subscribe(invitations => {
      this.invitations = Object.assign([], invitations);
    });
    // Filter status
    this.subscriptionFilterStatus = this._teamFilterService.teamStatusFilter.subscribe(status => {
      this.filterStatus = status;
    });
    // Order
    this.subscriptionFilterOrder = this._teamFilterService.teamOrderFilter.subscribe(order => {
      this.order = order;
    });
    // Query
    this.subscriptionFilterQuery = this._teamFilterService.teamQueryFilter.subscribe(query => {
      this.query = query;
    });
    // Workflow
    if (environment.envName === 'design') {
      this.subscriptionQueryParams = this._activatedRoute.queryParams.subscribe(queryParams => {
        // Tour
        this.empty = queryParams['empty'] === 'true'? true : false;

      });
    }
  }

  ngOnInit() {
    this.subscriptionParams = this._activatedRoute.params.subscribe(params => {

      if (params.id) {
        this.categoryId = params.id;
        this._workspaceAccessService
          .loadWorkpaceAccess(this.workspaceAccess.id, this.categoryId, this.workspaceAccess, this.empty).subscribe(() => {
            this._preloaderService.showPreloader(false);
          });
        this._invitationService.loadAllNewInvitations(InvitationLevel.WORKSPACE, this.workspaceAccess.workspace.id, this.empty).subscribe();
      } else {
        this._router.navigate(['/team/group']);
      }
    });
  }
  ngOnDestroy() {
    if (this.subscriptionGuests) {
      this.subscriptionGuests.unsubscribe();
    }
    if (this.subscriptionFilterStatus) {
      this.subscriptionFilterStatus.unsubscribe();
    }
    if (this.subscriptionFilterOrder) {
      this.subscriptionFilterOrder.unsubscribe();
    }
    if (this.subscriptionFilterQuery) {
      this.subscriptionFilterQuery.unsubscribe();
    }
    if (this.subscriptionQueryParams) {
      this.subscriptionQueryParams.unsubscribe();
    }
  }

}

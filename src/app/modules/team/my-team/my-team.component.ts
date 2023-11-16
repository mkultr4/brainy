import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { Workspace } from '../../../models/workspace/workspace';
import { AccountStatus } from '../../../models/workspace/account-status';
import { Invitation } from '../../../models/invitations/invitation';
import { ISubscription } from 'rxjs/Subscription';
import { WorkspaceAccessStrategyService } from '../../../services/workspace/workspace-access-strategy.service';
import { InvitationStrategyService } from '../../../services/invitations/invitation-strategy.service';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { PreloaderService } from '../../shared-components/preloader/preloader.service';
import { InvitationLevel } from '../../../models/invitations/invitation-level';
import { TeamFilterService } from '../../shared-team/services/team-filter.service';
import { DropdownOrderEvent } from '../../shared-filters/dropdown-order/dropdown-order.component';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { MyTeamService } from '../../../services/myTeam/my-team.service';
import { User } from '../../../models/users/user';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Rol } from 'src/app/models/workspace/rol';
import { Brand } from 'src/app/models/brands/brand';
import { arrayLength } from 'ngx-custom-validators/src/app/array-length/validator';
import { userInfo } from 'os';
import { RolPermission } from 'src/app/models/workspace/rol-permission';
import { MyProfileService } from 'src/app/services/myProfile/my-profile.service';
import { throwIfEmpty } from 'rxjs/operators';
import { MyProfileStrategyService } from 'src/app/services/myProfile/my-profile-strategy.service';

@Component({
    selector: 'app-my-team',
    templateUrl: './my-team.component.html',
    styleUrls: ['./my-team.component.scss']
})
export class MyTeamComponent implements OnInit, OnDestroy {

    // Public vars
    public team: Array<WorkspaceAccess> = [];
    public invitations: Array<Invitation> = [];
    public currentUser: User
     //Privates
    private type;
    private reference;
    // Filters
    public filterStatus: AccountStatus;
    public query = '';
    //  Order
    public filterOrderColumn = 'modified';
    public filterOrderDirection = -1;
    public orderBy = '-modified';
    public workspaceAccess: WorkspaceAccess;
    public accountStatuses = [];
    public tour = false;
    public empty = false;
    // Services
    private _workspaceAccessService;
    private _invitationService;
    // Subscription
    public subscriptionTeam: ISubscription;
    public subscriptionTeamInvitations: ISubscription;
    public subscriptionFilterStatus: ISubscription;
    public subscriptionFilterOrder: ISubscription;
    public subscriptionFilterQuery: ISubscription;
    public subscriptionQueryParams: ISubscription;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthenticationService,
        private _preloaderService: PreloaderService,
        private _teamFilterService: TeamFilterService,
        private _workspaceAccessStrategyService: WorkspaceAccessStrategyService,
        private _invitationStrategyService: InvitationStrategyService,

    ) {
        //this._myProfileService = this._MyProfileStrategyService.getService();
    
        this.currentUser = this._authService.getAuthUser()
        // Workflow
        this.subscriptionQueryParams = this._activatedRoute.queryParams.subscribe(queryParams => {
                // Tour
                this.empty = queryParams['empty'] ==='true'? true : false;
            });
        // Services
        this._workspaceAccessService = this._workspaceAccessStrategyService.getService();
        this._invitationService = this._invitationStrategyService.getService();
        // Auth
        this.workspaceAccess = this._authService.getAuthWorkspaceAccess();

        // Team
        this.subscriptionTeam = this._workspaceAccessService.workspaceAccesses.subscribe(team => {
            this.team = Object.assign([], team);
        });
        // Invitations
        this.subscriptionTeamInvitations = this._invitationService.invitations.subscribe(invitations => {
            this.invitations = Object.assign([], invitations);
        });
        // Filter status
        this.subscriptionFilterStatus = this._teamFilterService.teamStatusFilter.subscribe(status => {
            this.filterStatus = status;
        });
        // Order
        this.subscriptionFilterOrder = this._teamFilterService.
            teamOrderFilter.subscribe((order: DropdownOrderEvent) => {
                this.orderBy = order.getOrderBy();
            });
        // Query
        this.subscriptionFilterQuery = this._teamFilterService.teamQueryFilter.subscribe(query => {
            this.query = query;
        });
    }

    ngOnInit() {
            this.getAllTeam();
            this.getAllInvitation();
    }
    getAllInvitation(){
        this._invitationService.loadAllNewInvitations(InvitationLevel.WORKSPACE, this.workspaceAccess.workspace.id, this.empty).subscribe();
    }

    getAllTeam(){
        this._workspaceAccessService.
        loadWorkpaceAccess(this.workspaceAccess.id, '', this.workspaceAccess, this.empty).
        subscribe(() => {
            this._preloaderService.showPreloader(false);
        });

    }

   
    /**On Destroy */
    ngOnDestroy() {
        if (this.subscriptionQueryParams) {
            this.subscriptionQueryParams.unsubscribe();
        }
        if (this.subscriptionTeam) {
            this.subscriptionTeam.unsubscribe();
        }
        if (this.subscriptionTeamInvitations) {
            this.subscriptionTeamInvitations.unsubscribe();
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
    }
}

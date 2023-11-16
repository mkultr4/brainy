import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { InterfaceMenuFilterComponent } from '../../shared-header/interface-menu-filter/interface-menu-filter.component';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { ISubscription } from 'rxjs/Subscription';
import { DropdownOrderEvent } from '../../shared-filters/dropdown-order/dropdown-order.component';
import { AccountStatus } from '../../../models/workspace/account-status';
import { TeamFilterService } from '../../shared-team/services/team-filter.service';
import { WorkspaceAccessStrategyService } from '../../../services/workspace/workspace-access-strategy.service';

@Component({
  selector: 'app-team-filter,[app-team-filter]',
  templateUrl: './team-filter.component.html',
  styleUrls: ['./team-filter.component.scss']
})
export class TeamFilterComponent
  extends InterfaceMenuFilterComponent
  implements OnInit, OnDestroy {

  // public vars
  public accountStatuses;
  public workspaceAccesses = [];
  public filterStatus;
  public filterOrderDirection = -1;
  public filterOrderColumn = 'modified';
  // Services
  private _workspaceAccessService;
  // subscriptions
  public subscriptionTeam: ISubscription;
  public subscriptionFilterStatus: ISubscription;
  public subscriptionFilterOrder: ISubscription;
  // Inputs
  @Input() view = 'team';
  @Input() mainSearch = '';
  // Output
  @Output() filterOnInvite = new EventEmitter();
  constructor(
    // services
    private _workspaceAccessStartegyService: WorkspaceAccessStrategyService,
    private _teamFilterService: TeamFilterService,
  ) {
    super();
    // Services 
    this._workspaceAccessService = this._workspaceAccessStartegyService.getService();
    // Filter status
    this.subscriptionFilterStatus = this._teamFilterService.teamStatusFilter.subscribe(status => {
      this.filterStatus = status;
    });
    // Order
    this.subscriptionFilterOrder = this._teamFilterService.teamOrderFilter.subscribe((order: DropdownOrderEvent) => {
      this.filterOrderDirection = order.direction;
      this.filterOrderColumn = order.column;
    });
  }

  ngOnInit() {

    this.subscriptionTeam = this._workspaceAccessService.workspaceAccesses.subscribe(workspaceAccesses => {
      this.workspaceAccesses =  workspaceAccesses;
    });
    this._workspaceAccessService.getAccountStatuses().subscribe(statuses => {
      this.accountStatuses = statuses;
      this.accountStatuses.unshift(<AccountStatus>{ key: 'all' });
    });
  }

  changeMainSearch(mainSearch: string) {
    this.mainSearch = mainSearch;
    this._teamFilterService.setQueryFilter(this.mainSearch);
  }
  // Invite
  invite() {
    this.filterOnInvite.emit();
  }
  changeFilterOrder(orderEvent: DropdownOrderEvent) {
    this.filterOrderChange = true;
    this._teamFilterService.setOrderFilter(orderEvent);
  }
  onChangeFilterStatus(status: AccountStatus) {
    this._teamFilterService.setStatusFilter(status);
  }
  // On destroy
  ngOnDestroy() {

    if (this.subscriptionTeam) {
      this.subscriptionTeam.unsubscribe();
    }
    if (this.subscriptionFilterStatus) {
      this.subscriptionFilterStatus.unsubscribe();
    }
    if (this.subscriptionFilterOrder) {
      this.subscriptionFilterOrder.unsubscribe();
    }
  }
}

import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AccountStatus } from '../../../models/workspace/account-status';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';

@Component({
  selector: 'app-dropdown-filter-team-status',
  templateUrl: './dropdown-filter-team-status.component.html',
  styleUrls: ['./dropdown-filter-team-status.component.scss']
})
export class DropdownFilterTeamStatusComponent implements OnInit {

  @Input() accountStatuses = [];
  @Input() workspaceAccesses: Array<WorkspaceAccess>;
  @Input() filterStatus: AccountStatus;
  @Input() view = 'team';
  @Output() filterOnChangeFilterStatus = new EventEmitter();
  constructor() {

  }

  ngOnInit() {
  }

  /**
 * Set filter status
 * @param status
 */
  setFilterStatus(status: AccountStatus) {
    this.filterOnChangeFilterStatus.emit(status);
    // this._teamFilterService.setStatusFilter(status);
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoreStatus } from '../../../../models/cores/core-status';
import { Core } from '../../../../models/cores/core';

@Component({
  selector: 'app-dashboard-filter-statuses',
  templateUrl: './dashboard-filter-statuses.component.html',
  styleUrls: ['./dashboard-filter-statuses.component.scss']
})
export class DashboardFilterStatusesComponent implements OnInit {
  @Input() coreStatuses: Array<CoreStatus>;

  // Inputs
  @Input() cores: Array<Core>;
  @Input() filterStatus: CoreStatus;
  // Outputs
  @Output() filterOnChangeFilterStatus = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  setFilterStatus(status) {
    this.filterStatus = status;
    this.filterOnChangeFilterStatus.emit(status);
  }

  getCountStatus(statusId) {
    const countStatus = this.cores.filter(
      c => c.status.key === statusId).length;
    return countStatus;

  }
}

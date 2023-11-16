import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CoreType } from '../../../../models/cores/core-type';
import { Core } from '../../../../models/cores/core';

@Component({
  selector: 'app-dashboard-filter-types',
  templateUrl: './dashboard-filter-types.component.html',
  styleUrls: ['./dashboard-filter-types.component.scss']
})
export class DashboardFilterTypesComponent implements OnInit {

  // Input
  @Input() cores: Array<Core>;
  @Input() coreTypes: Array<CoreType>;
  @Input() filterType: CoreType;
  // Output
  @Output() filterOnChangeFilterType= new EventEmitter();

  // Constructor
  constructor() { }

  // On Init
  ngOnInit() {
  }

  // Type
  setFilterType(type) {
    this.filterType = type;
    this.filterOnChangeFilterType.emit(this.filterType);
  }

  getCountType(typeId) {
    const countType = this.cores.filter(
      c => c.type.key === typeId).length;

    return countType;
  }

}

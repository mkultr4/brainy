import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CoreType } from '../../../models/cores/core-type';
import { Core } from '../../../models/cores/core';

@Component({
  selector: 'app-brand-profile-filter-type',
  templateUrl: './brand-profile-filter-type.component.html',
  styleUrls: ['./brand-profile-filter-type.component.scss']
})
export class BrandProfileFilterTypeComponent implements OnInit {

  // Input
  @Input() cores: Array<Core>;
  @Input() coreTypes: Array<CoreType>;
  @Input() filterType: CoreType;
  // Output
  @Output() filterOnChangeFilterType = new EventEmitter();

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

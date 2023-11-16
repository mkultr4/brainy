import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { User } from '../../../../models/users/user';

@Component({
  selector: 'app-dropdown-filter-types,[app-dropdown-filter-types]',
  templateUrl: './dropdown-filter-types.component.html',
  styleUrls: ['./dropdown-filter-types.component.scss']
})
export class DropdownFilterTypesComponent implements OnInit {

  typesFilter = ['all', 'my', 'shared'];
  @Input() currentUser: User;
  @Input() workspacesAccesses = [];
  @Input() filterType: string;
  @Output() onChangeFilterType = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  setFilterType(type) {
    // this.filterType = type;
    this.onChangeFilterType.emit(type);
  }
}

import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { InterfaceMenuFilterComponent } from '../../shared-header/interface-menu-filter/interface-menu-filter.component';
import { User } from '../../../models/users/user';




@Component({
  selector: '[app-workspaces-filter]',
  templateUrl: './workspaces-filter.component.html',
  styleUrls: ['./workspaces-filter.component.scss']
})
export class WorkspacesFilterComponent
  extends InterfaceMenuFilterComponent
  implements OnInit {
  // Workflow filter
  @Input() workspacesAccesses = [];
  @Input() currentUser: User;
  // Inputs
  @Input() filterType;
  // Output
  @Output() filterOnChangeFilterType = new EventEmitter();
  constructor() {
    super();
  }
  // Init
  ngOnInit() {
  }

  // Type
  changeFilterType(type) {
    this.filterOnChangeFilterType.emit(type);
  }

}

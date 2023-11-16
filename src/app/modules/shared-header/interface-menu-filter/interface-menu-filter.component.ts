import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { User } from '../../../models/users/user';

@Component({
  selector: 'app-interface-menu-filter',
  templateUrl: './interface-menu-filter.component.html',
  styleUrls: ['./interface-menu-filter.component.scss']
})
export class InterfaceMenuFilterComponent implements OnInit {
  public isShowSearch = false;
  public mainSearchFocus = false;
  public filterOrderChange = false;
  @Input() workspacesAccess: WorkspaceAccess;
  @Input() currentUser: User;
  // Inputs
  // Filter
  @Input() mainSearch = '';
  @Input() filterType;
  @Input() filterOrderColumn: string;
  @Input() filterOrderDirection: any;
  // Output
  @Output() filterOnChangeMainSearch = new EventEmitter();
  @Output() filterOnChangeFilterOrder = new EventEmitter();
  constructor() { }
  // Init
  ngOnInit() {
  }

  // Main search
  fnMainSearchFocus(focus) {
    this.mainSearchFocus = focus;
  }

  toggleSearch() {
    this.isShowSearch = !this.isShowSearch;
  }
  changeMainSearch(mainSearch: string) {
    this.mainSearch = mainSearch;
    this.filterOnChangeMainSearch.emit(this.mainSearch);
  }
  changeFilterOrder(orderBy: any) {
    this.filterOrderChange = true;
    this.filterOnChangeFilterOrder.emit(orderBy);
  }

}

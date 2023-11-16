import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InterfaceMenuFilterComponent } from '../../shared-header/interface-menu-filter/interface-menu-filter.component';
import { CoreStatus } from '../../../models/cores/core-status';
import { Brand } from '../../../models/brands/brand';
import { Project } from '../../../models/projects/project';
import { CoreType } from '../../../models/cores/core-type';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { Core } from '../../../models/cores/core';

@Component({
  selector: 'app-dashboard-filter,[app-dashboard-filter]',
  templateUrl: './dashboard-filter.component.html',
  styleUrls: ['./dashboard-filter.component.scss']
})
export class DashboardFilterComponent extends InterfaceMenuFilterComponent implements OnInit {
  // Public vars
  public isShowSearch = false;
  public mainSearchFocus = false;
  public filterOrderChange = false;
  // Inputs
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() brands: Array<Brand>;
  @Input() projects: Array<Project>;
  @Input() cores: Array<Core>;
  @Input() coreStatuses: Array<CoreStatus>;
  @Input() coreTypes: Array<CoreType>;
  @Input() filterBrand: Brand;
  @Input() filterProject: Project;
  @Input() filterType: CoreType;
  @Input() filterStatus: CoreStatus;
  @Input() filterCore: Core;
  // Outputs
  @Output() filterOnChangeFilterBrand = new EventEmitter();
  @Output() filterOnChangeFilterProject = new EventEmitter();
  @Output() filterOnChangeFilterType = new EventEmitter();
  @Output() filterOnChangeFilterStatus = new EventEmitter();
  @Output() filterOnChangeFilterCore = new EventEmitter();

  constructor() {
    super();
  }

  ngOnInit() {
  }

  changeFilterBrand(brand: Brand) {
    this.filterOnChangeFilterBrand.emit(brand);
  }
  changeFilterProject(project: Project) {
    this.filterOnChangeFilterProject.emit(project);
  }
  changeFilterType(type) {
    this.filterOnChangeFilterType.emit(type);
  }
  changeFilterStatus(status) {
    this.filterOnChangeFilterStatus.emit(status);
  }


}

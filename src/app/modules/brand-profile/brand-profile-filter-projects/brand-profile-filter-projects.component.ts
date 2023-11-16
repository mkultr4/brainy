import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Core } from '../../../models/cores/core';
import { Brand } from '../../../models/brands/brand';
import { Project } from '../../../models/projects/project';

@Component({
  selector: 'app-brand-profile-filter-projects',
  templateUrl: './brand-profile-filter-projects.component.html',
  styleUrls: ['./brand-profile-filter-projects.component.scss']
})
export class BrandProfileFilterProjectsComponent implements OnInit {
  @Input() projects: Array<Project>;
  @Input() brand: Brand;
  @Input() cores: Array<Core>;
  // Other Filters
  @Input() filterProject: Project;
  // Outpus
  @Output() filterOnChangeFilterProject = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  clearFilterProject($event) {
    this.filterOnChangeFilterProject.emit(<Project>{ id: 'all' });
  }

  setFilterProject(project) {
    this.filterOnChangeFilterProject.emit(project);
  }


}

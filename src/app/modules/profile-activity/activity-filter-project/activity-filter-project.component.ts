import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../../../models/projects/project';
import { Brand } from '../../../models/brands/brand';
import { Core } from '../../../models/cores/core';

@Component({
  selector: 'app-activity-filter-project',
  templateUrl: './activity-filter-project.component.html',
  styleUrls: ['./activity-filter-project.component.scss']
})
export class ActivityFilterProjectComponent implements OnInit {
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

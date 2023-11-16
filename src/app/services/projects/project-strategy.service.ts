import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment';
import { ProjectMockService } from './project-mock.service';
import { ProjectService } from './project.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectStrategyService {

  projectService: BaseService;

  constructor() {
    if (environment.envName === 'design') {
      this.projectService = new ProjectMockService();
    } else {
      this.projectService = new ProjectService();
    }
  }

  getService() {
    return this.projectService;
  }
}

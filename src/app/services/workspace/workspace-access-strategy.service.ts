import { Injectable } from '@angular/core';
import { WorkspaceAccessMockService } from './workspace-access-mock.service';
import { WorkspaceAccessService } from './workspace-access.service';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceAccessStrategyService {

  workspaceAcessService: BaseService;

  constructor() {
    if (environment.envName === 'design') {
      console.log('Asign WorkspaceAccessMockService');
      this.workspaceAcessService = new WorkspaceAccessMockService();
    } else {
      this.workspaceAcessService = new WorkspaceAccessService();
    }
  }

  getService() {
    return this.workspaceAcessService;
  }
}

import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { Core } from '../../../models/cores/core';
import { DashboardBoxMenuComponent } from '../dashboard-box-menu/dashboard-box-menu.component';
import { DashboardWorkflowService } from '../services/dashboard-workflow.service';
import { CoreService } from '../../../services/cores/core.service';
import { DownloadProjectService } from '../../shared-core/services/download-project.service';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';

@Component({
  selector: 'app-dashboard-box,[app-dashboard-box]',
  templateUrl: './dashboard-box.component.html',
  styleUrls: ['./dashboard-box.component.scss']
})
export class DashboardBoxComponent implements OnInit {
  // public
  public deleting = false;
  public hour = '';
  public mouseOverPreview: boolean;
  public showDelete: false;
  public showDeleteAlertCancel = false;
  public deleteMessage = '';
  public cancelMessage = '';
  public imageNotFound = 'assets/img/image-not-found.jpg';
  private _coreService;
  // Inputs
  @Input() core: Core;
  @Input() workspaceAccess: WorkspaceAccess;
  // Output
  @Output() boxOnCancel = new EventEmitter();
  // View childs
  @ViewChild('dashboardBoxMenu') dashboardBoxMenu: DashboardBoxMenuComponent;
  constructor(
    private coreStrategyService: CoreStrategyService,
    private _dashboardWorkflowService: DashboardWorkflowService,
    private _downloadProjectService: DownloadProjectService
  ) {
    this._coreService = coreStrategyService.getService();
  }

  ngOnInit() {
  }
  previewOver(isOver) {
    this.mouseOverPreview = isOver;
  }
  // mouse leave
  mouseleave() {
    if (!this.showDelete) {
      this.showDelete = false;
      this.closeMenu();
    }
  }
  closeMenu() {
    if (this.dashboardBoxMenu && this.dashboardBoxMenu.menu) {
      this.dashboardBoxMenu.menu.close();
    }
  }

  // show delete item
  fnShowDelete(showDelete) {
    this.showDelete = showDelete;
    if (showDelete) {
      setTimeout(() => {
        this.mouseOverPreview = false;
      });
    }
  }
  // delete item
  deleteItem() {
    this.deleting = true;
    this._coreService.deleteCore(this.core).subscribe(deleted => {
      this.deleting = false;
    });
  }
  archiveProject() {
    this._dashboardWorkflowService.archiveProject(this.core);
  }
  cancelProject() {
    // this._dashboardWorkflowService.cancelProject(this.core);
    this.boxOnCancel.emit(this.core);
  }
  downloadProject() {
    this._downloadProjectService.downloadProjectShow(this.core);
  }
  resumeProject() {
    this._coreService.resumeCore(this.core).subscribe(resumeCore => {
      
    });
  }

}

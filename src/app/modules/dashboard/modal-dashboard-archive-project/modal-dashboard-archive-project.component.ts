import { Component, OnInit, ViewChild, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Core } from '../../../models/cores/core';
import { MzModalComponent } from 'ngx-materialize';
import { CoreService } from '../../../services/cores/core.service';
import { DashboardWorkflowService } from '../services/dashboard-workflow.service';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';

@Component({
  selector: 'app-modal-dashboard-archive-project',
  templateUrl: './modal-dashboard-archive-project.component.html',
  styleUrls: ['./modal-dashboard-archive-project.component.scss']
})
export class ModalDashboardArchiveProjectComponent implements OnInit, AfterContentInit, OnDestroy {
  public filing = false;
  public core: Core;
  // Subscription
  public subscriptionShow: Subscription;
  // View child
  @ViewChild('modal') public modal: MzModalComponent;

  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: true,
    ready: (modal, trigger) => { },
    complete: () => {
      this.core = undefined;
      this.filing = false;
    }
  };
  private _coreService;

  constructor(
    private _coreStrategyService: CoreStrategyService,
    private _dashboardWorkflowService: DashboardWorkflowService
  ) {
    this._coreService = _coreStrategyService.getService();
  }

  ngOnInit() {
  }
  ngAfterContentInit() {
    this.subscriptionShow = this._dashboardWorkflowService.obsArchived.subscribe(core => {
      if (core) {
        this.core = core;
        this.openModal();
      }
    });
  }
  openModal() {
    this.modal.openModal();
  }
  archive() {
    this.filing = true;
    this._coreService.archiveCore(this.core).subscribe(core => {
      this.filing = false;
      this.modal.closeModal();
    });
  }

  ngOnDestroy() {
    if (this.subscriptionShow) {
      this.subscriptionShow.unsubscribe();
    }
  }
}

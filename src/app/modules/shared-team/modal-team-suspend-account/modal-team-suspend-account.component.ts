import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { MzModalComponent } from 'ngx-materialize';
import { TeamWorkflowService } from '../services/team-workflow.service';
import { WorkspaceAccessStrategyService } from '../../../services/workspace/workspace-access-strategy.service';


@Component({
  selector: 'app-modal-team-suspend-account,[app-modal-team-suspend-account]',
  templateUrl: './modal-team-suspend-account.component.html',
  styleUrls: ['./modal-team-suspend-account.component.scss']
})
export class ModalTeamSuspendAccountComponent implements OnInit, OnDestroy {
  public subscriptionShow: Subscription;
  public workspaceAccess: WorkspaceAccess;
  public btnDisabled = false;
  public modalSuspendOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: true,
    ready: (modal, trigger) => { },
    complete: () => {
      this.workspaceAccess = undefined;
      this.btnDisabled = false;
    }
  };
  // Service
  private _workspaceAccessService;
  // Outputs
  @Output() modalOnSuspend = new EventEmitter();
  // View Childs
  @ViewChild('modal') public modal: MzModalComponent;
  constructor(private _teamWorkflowService: TeamWorkflowService,
    private _workspaceAccessStartegyService: WorkspaceAccessStrategyService) {
    this._workspaceAccessService = this._workspaceAccessStartegyService.getService();
    this.subscriptionShow = this._teamWorkflowService.subjectModalSuspendAccount$.subscribe(workspaceAccess => {

      this.workspaceAccess = workspaceAccess;
      this.openModal();

    });
  }

  ngOnInit() {
  }
  /** Open modal*/
  openModal() {
    this.modal.openModal();
  }

  suspend() {
    this.btnDisabled = true;
    this._workspaceAccessService.suspendWorkspaceAccess(this.workspaceAccess).subscribe((wa) => {
      this.btnDisabled = false;
      this.modalOnSuspend.emit(wa);
      this.modal.closeModal();
    });

  }
  ngOnDestroy() {
    if (this.subscriptionShow) {
      this.subscriptionShow.unsubscribe();
    }
  }
}

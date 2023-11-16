import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { ISubscription } from 'rxjs/Subscription';
import { MzModalComponent } from 'ngx-materialize';
import { TeamWorkflowService } from '../services/team-workflow.service';
import { WorkspaceAccessStrategyService } from '../../../services/workspace/workspace-access-strategy.service';


@Component({
  selector: 'app-modal-team-eliminate-account,[app-modal-team-eliminate-account]',
  templateUrl: './modal-team-eliminate-account.component.html',
  styleUrls: ['./modal-team-eliminate-account.component.scss']
})
export class ModalTeamEliminateAccountComponent implements OnInit, OnDestroy {

  public workspaceAccess: WorkspaceAccess;
  public subscriptionShow: ISubscription;
  public btnDisabled = false;
  public modalEliminateOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: true,
    ready: (modal, trigger) => { },
    complete: () => {
      this.workspaceAccess = undefined;
      this.btnDisabled = false;
    }
  };
  // Services
  private _workspaceAccessService;
  // Output
  @Output() modalOnEliminate = new EventEmitter();
  // View child
  @ViewChild('modal') public modal: MzModalComponent;
  constructor(
    private _teamWorkflowService: TeamWorkflowService,
    private _workspaceAccessStartegyService: WorkspaceAccessStrategyService
  ) {
    this._workspaceAccessService = this._workspaceAccessStartegyService.getService();
    this.subscriptionShow = this._teamWorkflowService.
      subjectModalEliminateAccount$.subscribe(workspaceAccess => {

        this.workspaceAccess = Object.assign({}, workspaceAccess);
        this.openModal();

      });
  }

  ngOnInit() {
  }
  /** Open modal*/
  openModal() {
    this.modal.openModal();
  }

  eliminate() {
    this.btnDisabled = true;
    this._workspaceAccessService.
    deleteWorkspaceAccess(this.workspaceAccess).subscribe((wa) => {
        this.btnDisabled = false;
        this.modalOnEliminate.emit(wa);
        this.modal.closeModal();
      });

  }
  ngOnDestroy() {
    if (this.subscriptionShow) {
      this.subscriptionShow.unsubscribe();
    }
  }
}

import { Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { Invitation } from '../../../models/invitations/invitation';
import { MzModalComponent } from 'ngx-materialize';
import { TeamWorkflowService } from '../services/team-workflow.service';
import { InvitationStrategyService } from '../../../services/invitations/invitation-strategy.service';


@Component({
  selector: 'app-modal-team-eliminate-invitation,[app-modal-team-eliminate-invitation]',
  templateUrl: './modal-team-eliminate-invitation.component.html',
  styleUrls: ['./modal-team-eliminate-invitation.component.scss']
})
export class ModalTeamEliminateInvitationComponent implements OnInit, OnDestroy {

  public subscriptionShow: ISubscription;
  public invitation: Invitation;
  public btnDisabled = false;
  public modalEliminateOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: true,
    ready: (modal, trigger) => { },
    complete: () => {
      this.invitation = undefined;
      this.btnDisabled = false;
    }
  };
  // Services
  private _invitationService;
  // Outputs
  @Output() modalOnEliminate = new EventEmitter();
  // View child
  @ViewChild('modal') public modal: MzModalComponent;

  constructor(
    private _teamWorkflowService: TeamWorkflowService,
    private _invitationStrategyService: InvitationStrategyService
  ) {
    this._invitationService = this._invitationStrategyService.getService();
    this.subscriptionShow = this._teamWorkflowService.subjectModalEliminateInvitation$.subscribe(invitation => {

      this.invitation = invitation;
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
    this._invitationService.deleteInvitation(this.invitation.id).subscribe(() => {
      this.btnDisabled = false;
      this.modalOnEliminate.emit(this.invitation);
      this.modal.closeModal();
    });

  }
  ngOnDestroy() {
    if (this.subscriptionShow) {
      this.subscriptionShow.unsubscribe();
    }
  }
}

import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { ToastrService } from 'ngx-toastr';
import { Invitation } from '../../../models/invitations/invitation';
import { MzModalComponent } from 'ngx-materialize';
import { InvitationStrategyService } from '../../../services/invitations/invitation-strategy.service';

@Component({
  selector: 'app-modal-alert-invitation,[app-modal-alert-invitation]',
  templateUrl: './modal-alert-invitation.component.html',
  styleUrls: ['./modal-alert-invitation.component.scss']
})
export class ModalAlertInvitationComponent implements OnInit, AfterViewInit {
  public invitation: Invitation;
  public subscriptionInvitation: ISubscription;
  public btnDisabled = false;
  // Service
  private _invitationService;
  @Output() modalInvitationClose = new EventEmitter();
  // Modal
  @ViewChild('modal') public modal: MzModalComponent;

  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: false,
    ready: (modal, trigger) => { },
    complete: () => {
      this.modalInvitationClose.emit(this.invitation);
      this.invitation = undefined;
      this.btnDisabled = false;
    }
  };
  constructor(
    private _toastrService: ToastrService,
    private _invitationStrategyService: InvitationStrategyService
  ) {
    this._invitationService = this._invitationStrategyService.getService();
  }

  ngOnInit() {
  }
  ngAfterViewInit() {

  }
  acceptInvitation() {
    this.btnDisabled = true;
    this._invitationService.acceptInvitation(this.invitation.id).subscribe((accepted) => {
      this.btnDisabled = false;
      if (accepted) {
        this._toastrService.info('La invitación ha sido aceptada');
        this.modal.closeModal();
        
          
        
      }
    });
  }
  cancelInvitation() {
    this.btnDisabled = true;
    this._invitationService.cancelInvitation(this.invitation.id).subscribe((canceleded) => {
      this.btnDisabled = false;
      this.modal.closeModal();
      
      

    });
  }
  openModal(invitation: Invitation) {
    setTimeout(() => {
      this.invitation = invitation;
      this.modal.openModal();
    });
  }


}

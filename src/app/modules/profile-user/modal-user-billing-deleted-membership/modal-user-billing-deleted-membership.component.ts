import { Component, OnInit, ViewChild, HostBinding } from '@angular/core';
import { AnimateModalComponent } from '../../shared-modal/animate-modal/animate-modal.component';
import { NgForm } from '@angular/forms';
import { BillingStrategyService } from 'src/app/services/billing/billing-strategy.service';
import { ToastrService } from 'ngx-toastr';
import { Reason } from 'src/app/models/billing/reason';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-user-billing-deleted-membership',
  templateUrl: './modal-user-billing-deleted-membership.component.html',
  styleUrls: ['./modal-user-billing-deleted-membership.component.scss']
})
export class ModalUserBillingDeletedMembershipComponent implements OnInit {
  // Public vars
  public showMenu = false;
  public cancelMemberShip = {
    password: '',
    reason: undefined,
    description: ''

  }
  public reasons;
  public cancelMembership: Reason = new Reason();
  //services
  private _billingeService;
  // Host bindings
  @HostBinding('class.dragOver') dragOver = false;
  // View childs
  @ViewChild('modal') modal: AnimateModalComponent;


  constructor(
    public router: Router,
    private _toastrService: ToastrService,
    private _billingStrategyService: BillingStrategyService
  ) {
    this._billingeService = this._billingStrategyService.getService();

    this._billingeService.getReason().subscribe(reasons => {
      this.reasons = reasons;
    });
  }

  ngOnInit() {
  }
  showModal() {

    this.modal.showModal();

  }

  authoMembership() {
    console.log('Membresia cancelada');
    this.router.navigate(['/error/closed-account']);
  }
  closeModal() {
    this.modal.closeModal();
    this.cancelMemberShip.password = '';
    this.cancelMemberShip.reason = undefined;
    this.cancelMemberShip.description = '';
  }


  // On show modal
  modalOnShow() {

  }
  modalOnHide() {
    setTimeout(() => {
      this.clearForm();
      this.cancelMembership = new Reason();
    });
  }
  private clearForm() { }

}

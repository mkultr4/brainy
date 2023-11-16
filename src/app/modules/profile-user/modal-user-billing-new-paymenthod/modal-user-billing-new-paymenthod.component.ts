import { Component, OnInit, ViewChild } from '@angular/core';
import { AnimateModalComponent } from '../../shared-modal/animate-modal/animate-modal.component';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Billing } from 'src/app/models/billing/billing';
import { BillingStrategyService } from 'src/app/services/billing/billing-strategy.service';
import { PaymentMethod } from 'src/app/models/paymentLog/paymentMethod';

@Component({
  selector: 'app-modal-user-billing-new-paymenthod',
  templateUrl: './modal-user-billing-new-paymenthod.component.html',
  styleUrls: ['./modal-user-billing-new-paymenthod.component.scss']
})
export class ModalUserBillingNewPaymenthodComponent implements OnInit {

  private _billingService;
  public paymentMethod: PaymentMethod = new PaymentMethod();

  @ViewChild('modal') modal: AnimateModalComponent;
  @ViewChild('formpay') private formGuest: NgForm;
  constructor(
    private _toastrService: ToastrService,
    private _billingStrategyService:BillingStrategyService
  ) {
    this._billingService = this._billingStrategyService.getService();
   }

  ngOnInit() {
  }

  showModal() {
    
    this.modal.showModal();
   
  }
 // On show modal
 modalOnShow() {

}
savePayMentMethod(){
  this._billingService.create(this.paymentMethod).subscribe(
  b => {
    this._toastrService.info('Se guardo con exito el metodo de pago');
    this.modal.closeModal();
  
  },error =>{
    this._toastrService.error('Error al crear un nuevo metodo de pago');
  });
}
  modalOnHide() {
    setTimeout(() => {
      this.clearForm();
      this.paymentMethod = new PaymentMethod();
    });
  }
  private clearForm() {}



}

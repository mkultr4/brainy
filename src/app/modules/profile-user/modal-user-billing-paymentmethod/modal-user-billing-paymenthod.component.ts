import { Component, OnInit, ViewChild } from '@angular/core';
import { AnimateModalComponent } from '../../shared-modal/animate-modal/animate-modal.component';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { BillingStrategyService } from 'src/app/services/billing/billing-strategy.service';
import { ToastrService } from 'ngx-toastr';
import { PaymentMethod } from 'src/app/models/paymentLog/paymentMethod';

@Component({
  selector: 'app-modal-user-billing-paymenthod',
  templateUrl: './modal-user-billing-paymenthod.component.html',
  styleUrls: ['./modal-user-billing-paymenthod.component.scss']
})
export class ModalUserBillingPaymenthodComponent implements OnInit {
  @ViewChild('modal') modal: AnimateModalComponent;
  @ViewChild('formpay') private formGuest: NgForm;

  private _billingeService;
  public card;
  public paymentMethod: PaymentMethod = new PaymentMethod();
  public newPaymentMethod: PaymentMethod = new PaymentMethod();
  constructor(
    private _authService: AuthenticationService,
    private _billingStrategyService: BillingStrategyService,
    private _toastrService: ToastrService
  ) { 
    this._billingeService = this._billingStrategyService.getService(); 
  }

  ngOnInit() {
   
  }
  showModal(id) {
    
    this.modal.showModal();
    
    this._billingeService.getPaymentMethod(id).subscribe(
      result =>{
        this.paymentMethod = result;
      });
   
  }
 // On show modal
 modalOnShow() {

}
  modalOnHide() {
    setTimeout(() => {
      this.clearForm();
      this.newPaymentMethod = new PaymentMethod();
    });
  }
  private clearForm() {}


  upPaymenthod(){
    this._billingeService.updatePaymentMethod(this.paymentMethod.id,this.newPaymentMethod).subscribe(
      result =>{
        this._toastrService.info('Metodo de Pago, Se actualizo Correctamente');
        this.modal.closeModal();
      },error =>{
        this._toastrService.info('Metodo de Pago, No se Actualizo');
      }
    );
   
  }
  deletemethod(){
    this._billingeService.delatePaymentMethod(this.paymentMethod.id).subscribe(
      result =>{
        this._toastrService.info('Metodo de Pago, Eliminado Correctamente');
        this.modal.closeModal();
      },error =>{
        this._toastrService.info('Metodo de Pago,No se elimino Correctamente');
      }
    )
    
  }
}

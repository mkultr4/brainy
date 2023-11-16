import { Component, OnInit, Output, EventEmitter, ViewChild, AfterContentInit, OnDestroy } from '@angular/core';
import { ModalUserBillingPaymenthodComponent } from '../modal-user-billing-paymentmethod/modal-user-billing-paymenthod.component';
import { ModalUserBillingNewPaymenthodComponent } from '../modal-user-billing-new-paymenthod/modal-user-billing-new-paymenthod.component'
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { BillingStrategyService } from 'src/app/services/billing/billing-strategy.service';
import { ISubscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-profile-user-billing-paymenthod',
  templateUrl: './profile-user-billing-paymenthod.component.html',
  styleUrls: ['./profile-user-billing-paymenthod.component.scss']
})
export class ProfileUserBillingPaymenthodComponent implements OnInit, AfterContentInit, OnDestroy {

  // Outpus
  @Output() editt = new EventEmitter();
  // View Childs
  @ViewChild('modalUserBillingPayment')  modalUserBillingPayment: ModalUserBillingPaymenthodComponent;
  @ViewChild('modalUserBillingNewPayment') modalUserBillingNewPayment:ModalUserBillingNewPaymenthodComponent;

  private _billingService;
  public payMentMethods;
  public subscriptionMethodPay: ISubscription;
  constructor(
    private _authService: AuthenticationService,
    private _billingStrategyService: BillingStrategyService,
  ) {
    this._billingService = this._billingStrategyService.getService();
   }

  ngOnInit() {
 
    this._billingService.loadPayMethods().subscribe();
  }
  ngAfterContentInit(){
    this.subscriptionMethodPay = this._billingService.paymentMethod.subscribe(
      result =>{
        this.payMentMethods = result;
      })
  }
  edit(id) {
    console.log(this.modalUserBillingPayment);
    // show the modal
    this.modalUserBillingPayment.showModal(id);
  }
  newPayMentMethod(){
  this.modalUserBillingNewPayment.showModal();
}

  ngOnDestroy(){
    if(this.subscriptionMethodPay){
      this.subscriptionMethodPay.unsubscribe();
    }
  }

  
}

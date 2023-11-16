import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { TabHeadingDirective } from 'ngx-bootstrap';
import { BillingStrategyService } from 'src/app/services/billing/billing-strategy.service';
import { ModalUserBillingDeletedMembershipComponent } from '../modal-user-billing-deleted-membership/modal-user-billing-deleted-membership.component';

@Component({
  selector: 'app-profile-user-bill',
  templateUrl: './profile-user-bill.component.html',
  styleUrls: ['./profile-user-bill.component.scss']
 
})
export class ProfileUserBillComponent implements OnInit {
  @Output() editt = new EventEmitter();
  @ViewChild('modalUserDeletedMembership')  modalUserDeletedMembership: ModalUserBillingDeletedMembershipComponent;
  private _billingService;
  public billing;
  public histories;
  constructor(
    private _authService: AuthenticationService,
    private _billingStrategyService: BillingStrategyService,
  ) {
    this._billingService = this._billingStrategyService.getService(); 

   }

  ngOnInit() {
    this.getBilling();
    this.getHistoryLog();
  }

  getBilling(){

    this._billingService.getbilling().subscribe(
      bill => {
        this.billing = bill;

      })
  }

  getHistoryLog(){
    this._billingService.getHistoryLog().subscribe(
      historyLog => {
        
        this.histories = historyLog;

      }
    )}

  deletedMembership(){
    this.modalUserDeletedMembership.showModal();
  }


}

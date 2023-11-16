import { NgModule } from '@angular/core';
import { ProfileUserRoutingModule } from './profile-user-routing.module';
import { ProfileUserContentComponent } from './profile-user-content/profile-user-content.component';
import { ProfileUserAccountComponent } from './profile-user-account/profile-user-account.component';
import { ProfileUserPlanComponent } from './profile-user-plan/profile-user-plan.component';
import { ProfileUserBillingComponent } from './profile-user-billing/profile-user-billing.component';
import { ProfileUserBenefitsComponent } from './profile-user-benefits/profile-user-benefits.component';
import { ProfileUserBillingAddressComponent } from './profile-user-billing-address/profile-user-billing-address.component';
import { ProfileUserBillingHistoryComponent } from './profile-user-billing-history/profile-user-billing-history.component';
import { SharedModule } from '../shared/shared.module';
import { SharedComponentsModule } from '../shared-components/shared-components.module';
import { MzSelectModule, MzInputModule } from 'ngx-materialize';
import { SharedHeaderModule } from '../shared-header/shared-header.module';
import { ProfileActivityModule } from '../profile-activity/profile-activity.module';


import { ProfileUserBillComponent } from './profile-user-bill/profile-user-bill.component';
import { ModalUserBillingPaymenthodComponent } from './modal-user-billing-paymentmethod/modal-user-billing-paymenthod.component';
import { SharedModalModule } from '../shared-modal/shared-modal.module';
import { ProfileUserBillingPaymenthodComponent } from './profile-user-billing-paymentmethod/profile-user-billing-paymenthod.component';
import { ModalUserBillingNewPaymenthodComponent } from './modal-user-billing-new-paymenthod/modal-user-billing-new-paymenthod.component';
import { ProfileUserInvoiceComponent } from './profile-user-invoice/profile-user-invoice.component';
import { ModalUserBillingDeletedMembershipComponent } from './modal-user-billing-deleted-membership/modal-user-billing-deleted-membership.component';


@NgModule({
  imports: [
    SharedModule,
    SharedComponentsModule,
    MzSelectModule,
    MzInputModule,
    SharedModalModule,
    SharedHeaderModule,
    ProfileActivityModule,
    ProfileUserRoutingModule
  ],
  declarations: [
    ProfileUserContentComponent,
    ProfileUserAccountComponent,
    ProfileUserPlanComponent,
    ProfileUserBillingComponent,
    ProfileUserBenefitsComponent,
    ProfileUserBillingAddressComponent,
    ProfileUserBillingHistoryComponent,
    ProfileUserBillingPaymenthodComponent,
    ProfileUserBillComponent,
    ModalUserBillingPaymenthodComponent,
    ModalUserBillingNewPaymenthodComponent,
    ProfileUserInvoiceComponent,
    ModalUserBillingDeletedMembershipComponent
  ]
})
export class ProfileUserModule { }

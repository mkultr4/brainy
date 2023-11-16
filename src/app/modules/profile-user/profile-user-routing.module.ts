import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileUserContentComponent } from './profile-user-content/profile-user-content.component';
import { ProfileUserAccountComponent } from './profile-user-account/profile-user-account.component';
import { ProfileUserPlanComponent } from './profile-user-plan/profile-user-plan.component';
import { ProfileUserBenefitsComponent } from './profile-user-benefits/profile-user-benefits.component';
import { ProfileUserBillingComponent } from './profile-user-billing/profile-user-billing.component';
import { ProfileUserBillingHistoryComponent } from './profile-user-billing-history/profile-user-billing-history.component';
import { ProfileUserBillingAddressComponent } from './profile-user-billing-address/profile-user-billing-address.component';
import { ProfileActivityContentComponent } from '../profile-activity/profile-activity-content/profile-activity-content.component';


import { ProfileUserBillComponent } from './profile-user-bill/profile-user-bill.component';
import { ProfileUserBillingPaymenthodComponent } from './profile-user-billing-paymentmethod/profile-user-billing-paymenthod.component';


const routes: Routes = [{
  path: '', component: ProfileUserContentComponent, children: [
    { path: '', redirectTo: 'account' },
    { path: 'account', component: ProfileUserAccountComponent },
    { path: 'plan', component: ProfileUserPlanComponent },
    {
      path: 'activity', component: ProfileActivityContentComponent,

    },
    {
      path: 'billing', component: ProfileUserBillingComponent, children: [
        { path: '', redirectTo: 'bill' },
        { path: 'address', component: ProfileUserBillingAddressComponent },
        { path: 'history', component: ProfileUserBillingHistoryComponent },
        { path: 'payment-method', component: ProfileUserBillingPaymenthodComponent},
        { path: 'bill', component: ProfileUserBillComponent }
      ]
    },
    { path: 'benefits', component: ProfileUserBenefitsComponent },

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileUserRoutingModule { }

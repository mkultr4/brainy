import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ServiceUnavaibleComponent } from './service-unavaible/service-unavaible.component';
import { ConfirmationExpiredComponent } from './confirmation-expired/confirmation-expired.component';
import { RegisterUnavaibleComponent } from './register-unavaible/register-unavaible.component';
import { ErrorContentComponent } from './error-content/error-content.component';
import { ClosedAccountComponent } from './closed-account/closed-account.component';



// Components


const routes: Routes = [
  {
    path: '', component: ErrorContentComponent, children: [
      { path: '', redirectTo: 'service-unavailable' },
      { path: 'service-unavailable', component: ServiceUnavaibleComponent },
      { path: 'not-found', component: ServiceUnavaibleComponent },
      { path: 'forbidden', component: ServiceUnavaibleComponent },
      { path: 'unauthorized', component: ServiceUnavaibleComponent },
      { path: 'bad-request', component: ServiceUnavaibleComponent },
      { path: 'confirmation-expired', component: ConfirmationExpiredComponent },
      { path: 'register-unavailable', component: RegisterUnavaibleComponent },
      { path: 'closed-account', component:ClosedAccountComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }

import { NgModule } from '@angular/core';
import { ErrorContentComponent } from './error-content/error-content.component';
import { SharedModule } from '../shared/shared.module';
import { ErrorRoutingModule } from './error-routing.module';
import { ServiceUnavaibleComponent } from './service-unavaible/service-unavaible.component';
import { RegisterUnavaibleComponent } from './register-unavaible/register-unavaible.component';
import { ConfirmationExpiredComponent } from './confirmation-expired/confirmation-expired.component';
import { ClosedAccountComponent } from './closed-account/closed-account.component';


@NgModule({
  imports: [
    SharedModule,
    ErrorRoutingModule
  ],
  declarations: [
    ErrorContentComponent,
    ConfirmationExpiredComponent,
    RegisterUnavaibleComponent,
    ServiceUnavaibleComponent,
    ClosedAccountComponent

  ]
})
export class ErrorModule { }

import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { PublicRoutingModule } from './public-routing.module';
import { PublicContentComponent } from './public-content/public-content.component';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { RecoverPasswordConfirmComponent } from './recover-password-confirm/recover-password-confirm.component';
import { CustomFormsModule } from 'ngx-custom-validators';
import { MzInputModule } from 'ngx-materialize';
import { RegisterComponent } from './register/register.component';
import { ThanksComponent } from './thanks/thanks.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { SharedComponentsModule } from '../shared-components/shared-components.module';



@NgModule({
  imports: [
    SharedModule,
    MzInputModule,
    PublicRoutingModule,
    CustomFormsModule,
    SharedComponentsModule
  ],
  declarations: [
    PublicContentComponent,
    LoginComponent,
    LoginFormComponent,
    RecoverPasswordComponent,
    RecoverPasswordConfirmComponent,
    RegisterComponent,
    ThanksComponent,
    ConfirmEmailComponent
  ]
})
export class PublicModule { }

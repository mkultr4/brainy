import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { RecoverPasswordConfirmComponent } from './recover-password-confirm/recover-password-confirm.component';
import { RegisterComponent } from './register/register.component';
import { ThanksComponent } from './thanks/thanks.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { PublicContentComponent } from './public-content/public-content.component';




const routes: Routes = [{
  path: '', component: PublicContentComponent, children: [
    { path: '', redirectTo: 'login' },

    {
      path: 'login', component: LoginComponent, children: [
        { path: '', component: LoginFormComponent },
        { path: 'recover-password', component: RecoverPasswordComponent },
        { path: 'recover-password-confirm/:token', component: RecoverPasswordConfirmComponent },
      ]
    },
    { path: 'confirm-email/:token', component: ConfirmEmailComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'thanks', component: ThanksComponent },
    { path: '**', redirectTo: 'home' }
  ]
}];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forChild(routes)]
})
export class PublicRoutingModule { }

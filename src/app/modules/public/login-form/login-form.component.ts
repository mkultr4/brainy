import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../models/users/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../services/login.service';
import { ConfirmationService } from '../../../services/confirmation.service';
import { UtilService } from '../../../services/utils/util.service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { WorkspaceAccessStrategyService } from '../../../services/workspace/workspace-access-strategy.service';
import { InvitationStrategyService } from '../../../services/invitations/invitation-strategy.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  providers: [LoginService]
})
export class LoginFormComponent implements OnInit, OnDestroy {
  // Public vars
  public user: User = new User();
  public rememberMe = false;
  public btnDisabled = false;
  public message = '';
  public messageType = '';
  public autocomplete = false;
  public email_confirm: string;

  private workspaceService;
  private invitationService;

  // Subscriptions
  public subscriptionQueryParmas: Subscription;
  private loginSuscription: Subscription;
  private confirmationSuscription: Subscription;
  private socialRegisterSuscription: Subscription;


  constructor(
    private _activatedRoute: ActivatedRoute,
    private _loginService: LoginService,
    private _confirmationService: ConfirmationService,
    private router: Router,
    private utilsService: UtilService,
    private socialAuthService: AuthService,
    private workspaceAccessStrategyService: WorkspaceAccessStrategyService,
    private _invitationStrategyService: InvitationStrategyService
  ) {
    this.workspaceService = workspaceAccessStrategyService.getService();
    this.invitationService = _invitationStrategyService.getService();

    this.subscriptionQueryParmas = this._activatedRoute.queryParams.subscribe(params => {
      console.log(params);

      this.email_confirm = params.email;

      if (params.email) {
        // this.email_confirm = params.email;
        this.confirm_register(this.email_confirm);
      }

      if (params.type === 'invitation' && params.reference) {
        this.invitationService.acceptInvitation(params.reference);
      }

      if (params['message']) {
        this.message = params['message'];
        this.messageType = params['messageType'];
        this.autocomplete = Boolean(params['autocomplete']);
        if (this.autocomplete) {
          this.user.email = 'Joana@outlook.live.com';
          this.user.password = 'asalskalskasklasas';
        }
      }
    });
  }

  ngOnInit() {
  }

  signInSocial(social: string) {
    let provider;
    switch (social) {
      case 'facebook':
        provider = FacebookLoginProvider.PROVIDER_ID;
        break;
      case 'google':
        provider = GoogleLoginProvider.PROVIDER_ID;
        break;
    }
    this.socialAuthService.signIn(provider).then(
      (userData: any) => {
        console.log(provider + ' sign in data : ' , {
          user: userData.email,
          token: userData.id
        });

        this.loginSuscription = this._loginService.loginSocial(btoa(JSON.stringify({
          user: userData.email,
          token: userData.id
        }))).subscribe(suc => {
              if (!suc['error']) {
                const user = this.utilsService.decodeJWToken(suc.token).user;
                localStorage.setItem('sessionID',user.sessionID);
                const queryParams = (user.firstLogin) ? ({ queryParams: { tour: true } }) : {};
                console.log(user.firstLogin);
                console.log('getByUserId ', user.id);
                this.workspaceService.getByUserId(user.id).subscribe((wa) => {
                  console.log(wa[0]);
                  const save = JSON.stringify(wa[0])
                  localStorage.setItem('workspaceAccess', save);

                  

                  this.router.navigate(['/dashboard'], queryParams);
                  localStorage.setItem('currentUser', JSON.stringify(user));
                });
              } else {
                this.message = suc['error'];
                this.messageType = 'error';
              }
          },
          err => {
            console.log(err);
          });
      }
    );
  }

  confirm_register(params) {
      console.log('Solicitud para confirmar registro :' + this.email_confirm);

     this.confirmationSuscription = this._confirmationService.registrarSimple(btoa(JSON.stringify({
       user: this.email_confirm,
       password: this.user.password,
       rememberme: this.rememberMe
     }))).subscribe(suc => {
           if (!suc['error']) {
             console.log('se recibio algo ok de la funcion REGISTRO CONFIRMACION');

             // this.router.navigate(['/public/thanks']);
             // localStorage.setItem('currentUser', JSON.stringify(this.utilsService.decodeJWToken(suc.token).user));
           } else {
            // this.message = suc['error'];
             // this.messageType = 'error';
           }
       },
       err => {
         console.log(err);
       });


   }

  login() {
    this.loginSuscription = this._loginService.loginSimple(btoa(JSON.stringify({
      user: this.user.email,
      password: this.user.password,
      rememberme: this.rememberMe
    }))).subscribe(suc => {
          if (!suc['error']) {
            const user = this.utilsService.decodeJWToken(suc.token).user;
            const queryParams = (user.firstLogin) ? ({ queryParams: { tour: true } }) : {};
            localStorage.setItem('sessionID',user.sessionID);
            this.workspaceService.getByUserId(user.id).subscribe((wa) => {
              console.log(wa[0]);
              localStorage.setItem('workspaceAccess', JSON.stringify(wa[0]));                  
              this.router.navigate(['/dashboard'], queryParams);
              localStorage.setItem('currentUser', JSON.stringify(user));
            });
          } else {
            this.message = suc['error'];
            this.messageType = 'error';
          }
      },
      err => {
        console.log(err);
      });
  }
  /**
   * Destroy
   */
  ngOnDestroy() {
    if (this.subscriptionQueryParmas) {
      this.subscriptionQueryParmas.unsubscribe();
    }
    if (this.loginSuscription) {
      this.loginSuscription.unsubscribe();
    }
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../models/users/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../services/login.service';
import { UtilService } from '../../../services/utils/util.service';
import { RegistrarService } from '../../../services/registrar.service';
import { SocialRegisterService } from '../../../services/socialregister.service';
import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular-6-social-login';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // Public vars
  public user: User = new User();
  public rememberMe = false;
  public btnDisabled = false;
  public message = '';
  public messageType = '';
  public autocomplete = false;
  /*
   (?=.*\d)      #   must contains one digit from 0-9
  (?=.*[a-z])   #   must contains one lowercase characters
  (?=.*[A-Z])   #   must contains one uppercase characters
  (?=.*[@#$%])   #   must contains one special symbols in the list "@#$%"
              . #   match anything with previous condition checking
  {6,20}        #   length at least 6 characters and maximum of 20
   */
  public passwordPattern = '';

  // private
  private type;
  private reference;

  

  // Subscriptions
  public subscriptionQueryParmas: Subscription;
  private loginSuscription: Subscription;
  private registrarSuscription: Subscription;
  private socialRegisterSuscription: Subscription;



  constructor(
    private _activatedRoute: ActivatedRoute,
    private _loginService: LoginService,
    private _socialregisterService: SocialRegisterService,
    private _registrarService: RegistrarService,
    private socialAuthService: AuthService,
    private router: Router,
    private utilsService: UtilService
  ) {
    this.subscriptionQueryParmas = this._activatedRoute.queryParams.subscribe(params => {
      if (params.type === 'invitation') {
        if (params.reference) {
          this.type = params.type;
          this.reference = params.reference;
          console.log(`type: ${this.type}, reference: ${this.reference} `);
        }
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

  register() {
   this.router.navigate(['/public/thanks']);

   const params = { type: this.type, reference: this.reference };
   console.log(`params register ${params}`);

    this.registrarSuscription = this._registrarService.registrarSimple(btoa(JSON.stringify({
      user: this.user.email,
      password: this.user.password,
      rememberme: this.rememberMe,
      params: params
    }))).subscribe(suc => {
          if (!suc['error']) {
            console.log('entro');

            this.router.navigate(['/public/thanks']);
            localStorage.setItem('currentUser', JSON.stringify(this.utilsService.decodeJWToken(suc.token).user));
          } else {
            this.message = suc['error'];
            this.messageType = 'error';
          }
      },
      err => {
        console.log(err);
      });


  }

  signInSocial(social: string): void {

      console.log('**** Register Social ******');

      const params = { type: this.type, reference: this.reference };
      console.log(`params register ${params}`);

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
          this.router.navigate(['/public/thanks']);
          console.log(provider + ' sign in data at the register moment : ' , {
            user: userData.email,
            token: userData.id,
            params: params
          });

          this.socialRegisterSuscription = this._socialregisterService.registrarSocial(btoa(JSON.stringify({
            user: userData.email,
            token: userData.id,
            params: params
          }))).subscribe(suc => {
                if (!suc['error']) {
                  console.log('entro');
                  this.router.navigate(['/dashboard']);
                  localStorage.setItem('currentUser', JSON.stringify(this.utilsService.decodeJWToken(suc.token).user));
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

}

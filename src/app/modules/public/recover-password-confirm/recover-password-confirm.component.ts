import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../models/users/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilService } from '../../../services/utils/util.service';
import { RecoverpasswordService } from '../../../services/recoverpassword.service';
import { ChangepasswordService } from '../../../services/changepassword.service';
@Component({
  selector: 'app-recover-password-confirm',
  templateUrl: './recover-password-confirm.component.html',
  styleUrls: ['./recover-password-confirm.component.scss']
})
export class RecoverPasswordConfirmComponent implements OnInit {

  public subscriptionQueryParmas: Subscription;
  public token;
  public user: User = new User();
  public message: string;
  public messageType: string;
  public btnDisabled = false;


  // Subscription
  public subscritionParams: Subscription;
  private changepasswordSuscription: Subscription;


  constructor(
    private _router: Router,
    private _changepasswordService: ChangepasswordService,
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.user.password = '';
    this.user.passwordConfirm = '';
    this.subscritionParams = this._activatedRoute.params.subscribe((params) => {
      if (params['token']) {
        this.token = params['token'];
        console.log('Super Token:' + this.token);
      } else {
        this._router.navigate(['public/login'],
          {
            queryParams: {
              message: 'Token invalido de recupero de contraseña.',
              messageType: 'error'
            }
          });
      }
    });
  }

  change() {
    console.log('Se solicita cambio de contraseña con el token:' + this.token + ' y contraseña :' +  this.user.password)
    // this.router.navigate(['/public/thanks']);

    this.router.navigate(['/public/login']);
   //console.log('Actualizacion de password para ' + this.user.password + "con el token:"+ params.token);

    this.changepasswordSuscription = this._changepasswordService.registrarSimple(btoa(JSON.stringify({
      password: this.user.password,
      token: this.token
      }))).subscribe(suc => {
          if (!suc['error']) {
            console.log('entro');

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

  ngOnInit() {
  }



}

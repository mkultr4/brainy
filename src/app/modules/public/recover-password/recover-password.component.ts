import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../../models/users/user';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UtilService } from '../../../services/utils/util.service';
import { RecoverpasswordService } from '../../../services/recoverpassword.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {

  public email: string;

  // Public  vars
  private recoverpasswordSuscription: Subscription;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _recoverpasswordService: RecoverpasswordService,
    private router: Router,
    private utilsService: UtilService
  ) {

  }


  ngOnInit() {

  }

  recover() {
     this.router.navigate(['/public/thanks']);

    console.log('Inicio recuperacion de contraseña ' + this.email);

     this.recoverpasswordSuscription = this._recoverpasswordService.registrarSimple(btoa(JSON.stringify({
       user: this.email,
       password: ''
       }))).subscribe(suc => {
           if (!suc['error']) {
             console.log('entro');

             // this.router.navigate(['/public/thanks']);
             localStorage.setItem('currentUser', JSON.stringify(this.utilsService.decodeJWToken(suc.token).user));
           } else {
            // this.message = suc['error'];
            // this.messageType = 'error';
           }
       },
       err => {
         console.log(err);
       });


   }

/*
  public recover() {
    this.router.navigate(['public/login'],
    { queryParams: { message: 'Se ha enviado un enlace de restablecimiento de contraseña.', messageType: 'info' } });
  }
*/

}

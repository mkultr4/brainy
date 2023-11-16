import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';


@Injectable()
export class AuthGuardService implements CanActivateChild {

   // constructor
   constructor(public _authService: AuthenticationService, public router: Router,
    private _location: Location) { }
    /**
      * Verify is loggin
      */
     canActivateChild(): boolean {
        if (environment.envName !== 'design') {
          if (this._location.path().startsWith('/public/confirm-email')) {
            return true;
          }
          if (!this._authService.isAuthenticated()) {
                // For token invalid
                this._authService.removeToken();
                // Redirect
                this.router.navigate(['/public/login']);
                // Return
                return false;
            }
        }
        return true;
    }

}

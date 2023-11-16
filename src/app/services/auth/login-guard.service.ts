import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../../environments/environment';
import { Location } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class LoginGuardService implements CanActivate {

  // constructor
  constructor(public _authService: AuthenticationService, public router: Router,
    private _location: Location) { }
  /**
   * Verify is loggin or return to
   */
  canActivate(): boolean {
      if (environment.envName !== 'design') {
          if (this._location.path().startsWith('/confirm-email')) {
            return true;
          }
          if (this._authService.isAuthenticated()) {
              // Redirect
              this.router.navigate(['/dashboard']);
              // Return
              return false;
          }
      }
      return true;
  }

}

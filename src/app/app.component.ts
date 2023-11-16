import { Component, OnDestroy } from '@angular/core';
import { RoutingStateService } from './services/routing-state.service';
import { AuthenticationService } from './services/auth/authentication.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute, NavigationError, NavigationEnd, Event } from '@angular/router';
import { environment } from '../environments/environment';
import { MessagingService } from './services/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'brainy';
  // Subscriptions
  public routerEvents: Subscription;
  public queryParams: Subscription;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthenticationService,
    private _routingStateService: RoutingStateService
  ) {
    this._routingStateService.loadRouting();
    this.routerEvents = this._router.events.subscribe((event: Event) => {

      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }

      if (event instanceof NavigationError) {
        console.error('Navigation', event);
      }
    });
    this.queryParams = this._activatedRoute.queryParams.subscribe(params => {
      if (environment.envName === 'design') {
        this.mockUsersAndWorkspaces(params);
      }
    });
  }

  private mockUsersAndWorkspaces(params) {
    const rol = params['rol'];
    const specialRol = params['specialRol'];    
    const  workspaceAccesId = params['workspaceAccessId'];
    let logged = this._authService.getAuthUser() &&
      this._authService.getAuthWorkspaceAccess();
    if (rol) {// TEAM
      if (rol === 'super-admin') {
        this._authService.loginId('1');
        this._authService.setWorkspaceAccess('1', specialRol);
      }
      if (rol === 'admin') {
        this._authService.loginId('1');
        this._authService.setWorkspaceAccess('1', specialRol);
      }
      if (rol === 'co-admin') {
        this._authService.loginId('2');
        this._authService.setWorkspaceAccess('3', specialRol);
      } else if (rol === 'manager') {
        this._authService.loginId('3');
        this._authService.setWorkspaceAccess('4', specialRol);
      } else if (rol === 'team') {
        this._authService.loginId('4');
        this._authService.setWorkspaceAccess('5', specialRol);
      } else if (rol === 'guest') {
        this._authService.loginId('6');
        this._authService.setWorkspaceAccess('14', specialRol);
      }

      if(workspaceAccesId){
        this._authService.setWorkspaceAccess(workspaceAccesId, specialRol);
      }
      logged = this._authService.getAuthUser() && this._authService.getAuthWorkspaceAccess();

      if (!logged) {
        this._authService.loginId('1');
        this._authService.setWorkspaceAccess('1', specialRol);
      }
    } else if (!logged) {
      this._authService.loginId('1');
      this._authService.setWorkspaceAccess('1', specialRol);
    }
  }

  ngOnDestroy() {
    if (this.queryParams) {
      this.queryParams.unsubscribe();
    }
    if (this.routerEvents) {
      this.routerEvents.unsubscribe();
    }
  }

}

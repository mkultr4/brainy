import { Component, OnInit, AfterContentInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Brand } from '../../../models/brands/brand';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { User } from '../../../models/users/user';
import { Router, NavigationEnd, Event, ActivatedRoute } from '@angular/router';
import { ISubscription } from 'rxjs/Subscription';
import { BrandStrategyService } from '../../../services/brands/brand-strategy.service';
import { BrandProfileService } from '../services/brand-profile.service';
import { InvitationStrategyService } from '../../../services/invitations/invitation-strategy.service';

@Component({
  selector: 'app-brand-profile-content',
  templateUrl: './brand-profile-content.component.html',
  styleUrls: ['./brand-profile-content.component.scss']
})
export class BrandProfileContentComponent implements OnInit,
  AfterContentInit, AfterViewInit, OnDestroy {
  // Public
  public id;
  public brand: Brand;
  public workspaceAccess: WorkspaceAccess;
  public currentUser: User;
  public view = 'projects';
  // Services
  private _brandService;
  private _invitationService;
  // Subscriptions
  public subscriptionRouteEvents: ISubscription;
  public subscriptionParams: ISubscription;
  public subscriptionProjects: ISubscription;
  public subscriptionInvitations: ISubscription;

  constructor(
    private _authService: AuthenticationService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _brandStrategyService: BrandStrategyService,
    private _invitationStrategyService: InvitationStrategyService,
    private _brandProfileService: BrandProfileService
  ) {
    // Access
    this.currentUser = this._authService.getAuthUser();
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
    // Strategy
    this._brandService = this._brandStrategyService.getService();
    this._invitationService = this._invitationStrategyService.getService();
    // Router events
    this.subscriptionRouteEvents = this._router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        const split = event.url.split('/');
        const currentView = split[3];
        if (currentView === 'members') {
          this.view = 'members';
        }
        if (currentView === 'projects') {
          this.view = 'projects';
        }

      }
    });
  }

  ngOnInit() {
    this.subscriptionParams = this._activatedRoute.params.subscribe(params => {
      if (params.id) {
        this.id = params.id;
      } else {
        this._router.navigate(['/brands']);
      }
    });
  }

  ngAfterContentInit() {
    this._brandService.getBrand(this.id).subscribe((brand) => {
      this.brand = brand;
    });


    this.subscriptionInvitations = this._invitationService.invitations.subscribe(invitations => {
      /*this._brandService.getById(this.id).then((brand) => {
        this.brand = brand;
      });*/
    });
  }
  ngAfterViewInit() {
    this.subscriptionProjects = this._brandProfileService.cores.subscribe(cores => {
      setTimeout(() => {
        if (this.brand) {
          this.brand.coresCount = cores.length;
        }
      });

    });
  }

  ngOnDestroy() {
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
    if (this.subscriptionRouteEvents) {
      this.subscriptionRouteEvents.unsubscribe();
    }
    if (this.subscriptionProjects) {
      this.subscriptionProjects.unsubscribe();
    }

    if (this.subscriptionInvitations) {
      this.subscriptionInvitations.unsubscribe();
    }
  }

}

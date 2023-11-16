import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { User } from '../../../models/users/user';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { ISubscription } from 'rxjs/Subscription';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { Router, NavigationEnd, Event, ActivatedRoute } from '@angular/router';
import { CategoryStrategyService } from '../../../services/categories/category-strategy.service';
import { Category } from '../../../models/categories/category';
import { ModalTeamInviteComponent } from '../modal-team-invite/modal-team-invite.component';
import { MyProfileStrategyService } from 'src/app/services/myProfile/my-profile-strategy.service';
import { GroupService } from 'src/app/services/group/group.service';

@Component({
  selector: 'app-team-content',
  templateUrl: './team-content.component.html',
  styleUrls: ['./team-content.component.scss'],
  providers: [MyProfileStrategyService, GroupService]

})
export class TeamContentComponent implements OnInit, OnDestroy {
  // publics
  public currentUser: User;
  public workspaceAccess: WorkspaceAccess;
  public routeEvents: ISubscription;
  public subscriptionQueryParams: ISubscription;
  public view = 'team';
  public tour = false;
  public empty = false;
  public category = new Category();
  // Service
  private _categoryService;
  // View childs
  // View childs
  @ViewChild(ModalTeamInviteComponent) modalTeamInvite: ModalTeamInviteComponent;
  constructor(
    private _authService: AuthenticationService,
    private _router: Router,
    private _categoryStrategyService: CategoryStrategyService,
    private _activatedRoute: ActivatedRoute
  ) {
    this.currentUser = this._authService.getAuthUser();
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();

    this._categoryService = this._categoryStrategyService.getService();
    this.routeEvents = this._router.events.subscribe((event: Event) => {
      // Detect current view
      if (event instanceof NavigationEnd) {
        const url = event.url;
        const urlSplit = url.split('/');
        if (urlSplit[2] === 'group') {
          if (urlSplit.length > 3) {
            const idCategory = urlSplit[3];
            this.searchCategory(idCategory);
            this.view = 'group-inner';
          } else {
            this.view = 'group';
          }
        }
        if (urlSplit[2] === 'my') {
          this.view = 'team';
        }
      }
    });
    this.subscriptionQueryParams = this._activatedRoute.queryParams.subscribe(queryParams => {
      // Tour
      this.tour = queryParams['tour'] === 'true' ? true : false;
      this.empty = queryParams['empty'] === 'true' ? true : false;
    });
  }

  ngOnInit() {
  }
  searchCategory(id) {
    console.log(id);
    this._categoryService.getCategory(id).subscribe(category => {
      console.log(category);
      this.category = Object.assign({}, category);
    });
  }
  invite() {
    this.modalTeamInvite.showModal();
  }

  isLinkActive(url: string): boolean {
    let charPos = this._router.url.indexOf('?');
    let cleanUrl = charPos !== -1 ? this._router.url.slice(0, charPos) : this._router.url;
    let urlArray = cleanUrl.split('/');
    let lastUrl  = '/'+urlArray[1] + '/'+ urlArray[2];
    
    return (lastUrl === url);
  }
  ngOnDestroy() {
    if (this.routeEvents) {
      this.routeEvents.unsubscribe();
    }
    if (this.subscriptionQueryParams) {
      this.subscriptionQueryParams.unsubscribe();
    }
  }
}

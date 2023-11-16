import { Component, OnInit, ElementRef, ViewChild, Renderer, AfterContentInit } from '@angular/core';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { User } from '../../../models/users/user';
import { ISubscription } from 'rxjs/Subscription';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DropdownOrderEvent } from '../../shared-filters/dropdown-order/dropdown-order.component';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { PreloaderService } from '../../shared-components/preloader/preloader.service';
import { WorkspaceAccessStrategyService } from '../../../services/workspace/workspace-access-strategy.service';
import { InvitationStrategyService } from '../../../services/invitations/invitation-strategy.service';
import { ModalAlertInvitationComponent } from '../../shared-invitations/modal-alert-invitation/modal-alert-invitation.component';
import { Invitation } from '../../../models/invitations/invitation';
@Component({
  selector: 'app-workspaces-content',
  templateUrl: './workspaces-content.component.html',
  styleUrls: ['./workspaces-content.component.scss']
})
export class WorkspacesContentComponent implements AfterContentInit {

  public body = document.getElementsByTagName('body')[0];
  // workspaces
  public workspacesAccesses: Array<WorkspaceAccess> = new Array<WorkspaceAccess>();
  public invitations = [];
  public invitationsCount = 0;
  // Current user
  public currentUser: User;
  public alertInvitation = false;
  public messageInformative = false;
  // Filters
  public mainSearch = '';
  public filterType = 'all';
  // Order
  public filterOrderColumn = 'workspace.modified';
  public filterOrderDirection = -1;
  public orderBy = '-workspace.modified';
  // Scroll
  public scrollDirection = '';
  // Subscription
  public subscriptionQueryParams: ISubscription;
  // Services
  private _worksapceAccessService;
  private _invitationService;
  // header
  @ViewChild('workspacesHeader') header: ElementRef;
  @ViewChild('modalAlertInvitation') modalAlertInvitation: ModalAlertInvitationComponent;

  constructor(
    private renderer: Renderer,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _toastrService: ToastrService,
    private _invitationStrategyService: InvitationStrategyService,
    private _authService: AuthenticationService,
    private _preloaderService: PreloaderService,
    private _workspaceAccessStartegyService: WorkspaceAccessStrategyService
  ) {
    this._worksapceAccessService = this._workspaceAccessStartegyService.getService();
    this._invitationService = this._invitationStrategyService.getService();
    this.currentUser = this._authService.getAuthUser();
    this.subscriptionQueryParams = this._activatedRoute.queryParams.subscribe(params => {
      this.alertInvitation = Boolean(params['alertInvitation']);
      this.messageInformative = Boolean(params['messageInformative']);
    });
  }

  ngAfterContentInit() {

    this._worksapceAccessService.
      findMyWorkspaceAccess(this.currentUser.id).subscribe((workspacesAccess) => {
        this.workspacesAccesses = <WorkspaceAccess[]>workspacesAccess;
        setTimeout(() => {
          this._preloaderService.showPreloader(false);
        });

        if (this.messageInformative) {
          this._toastrService.info('Aquí aparecerán las invitaciones de tus espacio de trabajo');
        }
      });

    setTimeout(() => {
      window.addEventListener('mousewheel', this.scrollEvent.bind(this), false);
      window.addEventListener('DOMMouseScroll', this.scrollEvent.bind(this), false);
    });
  }
  ngAfterViewInit() {
    setTimeout(() => {

      this._invitationService.getNewInvitations(this.currentUser.id, this.alertInvitation).subscribe(invitations => {
        this.invitations = invitations;
        if (this.invitations.length > 0) {
          this.proccessInvitations();
        }
      });
    });
  }
  private proccessInvitations() {
    if (this.invitationsCount < this.invitations.length) {
      console.log(this.invitationsCount);
      const invitation = this.invitations[this.invitationsCount];
      this.modalAlertInvitation.openModal(invitation);

    }
  }
  modalInvitationClose(invitation: Invitation) {
    this.invitationsCount = this.invitationsCount + 1;
    setTimeout(() => {
      console.log(this.invitationsCount);
      this.proccessInvitations();
    });
  }
  // Events
  onChangeFilterOrder(order: DropdownOrderEvent) {
    this.filterOrderColumn = order.column;
    this.filterOrderDirection = order.direction;
    this.orderBy = order.getOrderBy();
  }
  // Main search change
  onChangeMainSearch(search) {
    this.mainSearch = search;
  }
  // Filter type
  onChangeFilterType(type) {
    this.filterType = type;

  }
  // On select workspace accesss
  onSelectWorkspaceAccess(workspacesAccess: WorkspaceAccess) {
    // Set the workspace choice
    this._authService.setWorkspaceAccess(workspacesAccess.workspace.id);
    // Go to dash
    this._router.navigate(['/dashboard']);
  }
  // Scroll
  scrollEvent($event) {
    if (this.body) {
      if ($event.wheelDelta > 0 || $event.detail < 0) {
        // Scroll up
        this.scrollDirection = 'up';
        if (window.pageYOffset <= 50) {
          this.renderer.setElementClass(this.header.nativeElement, 'scrolled-down', false);
        }
      } else {
        this.scrollDirection = 'down';
        // If has scroll bars
        if (this.body.scrollHeight > window.innerHeight) {
          this.renderer.setElementClass(this.header.nativeElement, 'scrolled-down', true);
        }
      }
    }
  }
  ngOnDestroy() {
    window.removeEventListener('mousewheel', this.scrollEvent.bind(this), false);
    window.removeEventListener('DOMMouseScroll', this.scrollEvent.bind(this), false);
    if (this.subscriptionQueryParams) {
      this.subscriptionQueryParams.unsubscribe();
    }
  }

}

import { Component, OnInit, HostListener, ViewChild } from '@angular/core';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { RolService } from 'src/app/services/roles/rol.service';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { ISubscription } from 'rxjs/Subscription';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { ModalNewBriefPresentationComponent } from '../modal-new-brief-presentation/modal-new-brief-presentation.component';
import { Brief } from 'src/app/models/brief/brief';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreStrategyService } from 'src/app/services/cores/core-strategy.service';
import { User } from 'src/app/models/users/user';
import { BriefPresentation } from 'src/app/models/brief-presentation/brief-presentation';
@Component({
  selector: 'app-brief-presentation-create',
  templateUrl: './brief-presentation-create.component.html',
  styleUrls: ['./brief-presentation-create.component.scss'],
  providers: [
    WorkflowService,
    InvitationStrategyService,
  ]
})
export class BriefPresentationCreateComponent implements OnInit {
  public brief: Brief;
  public briefId: any;
  public briefPresentation = new BriefPresentation();
  public workspaceAccess: WorkspaceAccess;
  public currentUser: User;
  public coreTypes  = [];
  // Workflow vars
  public rightSidenavCompressed = false;
  public leftSidenavCompressed = false;
  // Permissions
  public headerEditable = false;
  public canShare = false;
  public canApprove = false;
  public isApprover = false;
  // Services
  public _coreService;
  // Subscriptions
  public queryParams: ISubscription;
  public subscriptionRightSidenav: ISubscription;
  public subscriptionLeftSidenav: ISubscription;
  // View child
  @ViewChild('modalNew') modalNew: ModalNewBriefPresentationComponent;
  constructor(
    private _ativatedRoute: ActivatedRoute,
    private _router: Router,
    private _authService: AuthenticationService,
    private _workflowService: WorkflowService,
    private _coreStartegyService: CoreStrategyService
  ) {
    // Auth
    this.currentUser = this._authService.getAuthUser();
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
    // Services
    this._coreService = this._coreStartegyService.getService();
    // Permissions
    this.headerEditable = RolService.isAdminRol(this.workspaceAccess.rol.key) ||
      RolService.isManagerRol(this.workspaceAccess.rol.key);
    this.canShare = RolService.isAdminRol(this.workspaceAccess.rol.key) ||
      RolService.isManagerRol(this.workspaceAccess.rol.key);
    this.isApprover = this.workspaceAccess.groupReference === 'approver';
    this.canApprove = RolService.isAdminRol(this.workspaceAccess.rol.key)
      || RolService.isManagerRol(this.workspaceAccess.rol.key)
      || this.workspaceAccess.groupReference === 'approver';

    this.queryParams = this._ativatedRoute.queryParams.subscribe(params => {
      if (params['briefId']) {
        this.briefId = params['briefId'];
      } else {
        this._router.navigate(['/dashboard'])
      }
    });

    this._coreService.getAllTypes().subscribe(types => {
      this.coreTypes = types;
    });
  }

  ngOnInit() {
  }
  ngAfterContentInit() {
    if (this.briefId) {
      this._coreService.loadById(this.briefId, 'brief').subscribe(brief => {
        this.brief = brief;
      })
    }
    // Subscription sidenav show or hide
    this.subscriptionRightSidenav = this._workflowService.sidenavRightCompressed.subscribe(compress => {
      this.rightSidenavCompressed = compress;
    });
    // Subscription sidenav show or hide
    this.subscriptionLeftSidenav = this._workflowService.sidenavLeftCompressed
      .subscribe(compressed => {
        this.leftSidenavCompressed = compressed;
      });

    this.resize();

    setTimeout(() => {
      this.modalNew.openModal();
    });

  }
  /**
    * Resize layout
    */
  resize() {
    // If window is minor to 1200px
    if (window.innerWidth < 1200) {
      this._workflowService.compressRightSidenav(true);
    } else {
      this._workflowService.compressRightSidenav(false);
    }
    if (window.innerWidth < 992) {
      this._workflowService.compressLeftSidenav(true);

    } else {
      this._workflowService.compressLeftSidenav(false);
    }
  }


  // Rezise
  @HostListener('window:resize', ['$event']) onResize(event) {

    this.resize();
  }
  // On destroy
  ngOnDestroy() {
    if (this.subscriptionLeftSidenav) {
      this.subscriptionLeftSidenav.unsubscribe();
    }
    if (this.subscriptionRightSidenav) {
      this.subscriptionRightSidenav.unsubscribe();
    }
    if (this.queryParams) {
      this.queryParams.unsubscribe();
    }
  }
}

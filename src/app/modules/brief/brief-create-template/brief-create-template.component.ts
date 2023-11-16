import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { User } from 'src/app/models/users/user';
import { BriefTemplate } from 'src/app/models/brief/brief-template';
import { ISubscription } from 'rxjs/Subscription';
import { BriefCategory } from 'src/app/models/brief/brief-category';
import { ModalNewMeetingNoteComponent } from '../../meeting-note/modal-new-meeting-note/modal-new-meeting-note.component';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { RolService } from 'src/app/services/roles/rol.service';
import { BriefWorkflowService } from '../services/brief-workflow.service';

@Component({
  selector: 'app-brief-create-template',
  templateUrl: './brief-create-template.component.html',
  styleUrls: ['./brief-create-template.component.scss'],
  providers: [BriefStrategyService, BriefWorkflowService]
})
export class BriefCreateTemplateComponent implements OnInit {
  public workspaceAccess: WorkspaceAccess;
  public currentUser: User;
  public briefTemplate: BriefTemplate;
  public templateId;
  public categories: BriefCategory[];
  public categoryShow: BriefCategory;
  public pitch = false;
  // Workflow vars
  public rightSidenavCompressed = true;
  public leftSidenavCompressed = false;
  // Permissions
  public headerEditable = false;
  public canShare = false;
  public canApprove = false;
  public isApprover = false;
  // Subscriptions
  public subscriptionRouterParmas: ISubscription;
  public subscriptionQueryParmas: ISubscription;
  public subscriptionRightSidenav: ISubscription;
  public subscriptionLeftSidenav: ISubscription;
  // Services
  private _briefService;
  // View child
  @ViewChild('modalNew') modalNew: ModalNewMeetingNoteComponent;
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _authService: AuthenticationService,
    private _workflowService: WorkflowService,
    private _briefStrategyService: BriefStrategyService
  ) {
    // Services
    this._briefService = this._briefStrategyService.getService();
    // Access
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
    this.currentUser = this._authService.getAuthUser();
    // Permissions
    this.headerEditable = RolService.isAdminRol(this.workspaceAccess.rol.key) ||
      RolService.isManagerRol(this.workspaceAccess.rol.key);
    this.canShare = RolService.isAdminRol(this.workspaceAccess.rol.key) ||
      RolService.isManagerRol(this.workspaceAccess.rol.key);
    this.isApprover = this.workspaceAccess.groupReference === 'approver';
    this.canApprove = RolService.isAdminRol(this.workspaceAccess.rol.key)
      || RolService.isManagerRol(this.workspaceAccess.rol.key)
      || this.workspaceAccess.groupReference === 'approver';

    this.subscriptionQueryParmas = this._activatedRoute.queryParams.subscribe(params => {
      this.templateId = (params['templateId']);
      this.pitch = params['pitch'] === 'true' ? true : false;
    });
  }

  ngOnInit() {
  }
  ngAfterContentInit() {
    // Subscription sidenav show or hide
    this.subscriptionRightSidenav = this._workflowService.sidenavRightCompressed.subscribe(compress => {
      this.rightSidenavCompressed = compress;
    });
    // Subscription sidenav show or hide
    this.subscriptionLeftSidenav = this._workflowService.sidenavLeftCompressed
      .subscribe(compressed => {
        this.leftSidenavCompressed = compressed;
      });
    // Resize
    this.resize();
    // this._workflowService.compressRightSidenav(true);
    this._briefService.getTemplate(this.templateId).subscribe(template => {
      this.briefTemplate = template;
      console.log(template);

    });


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
    if (this.subscriptionRouterParmas) {
      this.subscriptionRouterParmas.unsubscribe();
    }
    if (this.subscriptionQueryParmas) {
      this.subscriptionQueryParmas.unsubscribe();
    }
    if (this.subscriptionLeftSidenav) {
      this.subscriptionLeftSidenav.unsubscribe();
    }
    if (this.subscriptionRightSidenav) {
      this.subscriptionRightSidenav.unsubscribe();
    }
  }
}

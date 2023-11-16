import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { User } from '../../../models/users/user';
import { WorkspaceAccessStrategyService } from '../../../services/workspace/workspace-access-strategy.service';
import { ActivatedRoute } from '@angular/router';
import { ISubscription, Subscription } from 'rxjs/Subscription';
import { Core } from '../../../models/cores/core';
import { Brand } from '../../../models/brands/brand';
import { Project } from '../../../models/projects/project';
import { CoreType } from '../../../models/cores/core-type';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';
import { RolService } from '../../../services/roles/rol.service';
import { ModalAssignProjectComponent } from '../modal-assign-project/modal-assign-project.component';
import { ModalUnlinkProjectComponent } from '../modal-unlink-project/modal-unlink-project.component';

import { WorkspaceAccessAudit } from 'src/app/models/workspace/workspace-access-audit';

import { ActivityStrategyService } from 'src/app/services/activity/activity-strategy.service';


@Component({
  selector: 'app-profile-activity-content',
  templateUrl: './profile-activity-content.component.html',
  styleUrls: ['./profile-activity-content.component.scss']
})
export class ProfileActivityContentComponent implements OnInit, OnDestroy {
  // Public
  public id;
  public waArray: Array<WorkspaceAccess>;
  public workspaceAccessCurrent: WorkspaceAccess;
  public workspaceAccess: WorkspaceAccess;
  public currentUser: User;
  public cores: Core[] = [];
  public brands: Brand[] = [];
  public projects: Project[] = [];
  public coreTypes: CoreType[];
  public canAssign = false;
  public canRemove = false;
  public withHeader = true;
  public showRemove = true;
  // Services
  private _workspaceAccessService;
  private _coreService;
  //Privates
  private type;
  private reference;
  //Subscription
  public myprofileSubscription: Subscription;
  // Subscriptions
  subscriptionParams: ISubscription;
  // View child
  @ViewChild('modalAssign') modalAssign: ModalAssignProjectComponent;
  @ViewChild('modalUnlink') modalUnlink: ModalUnlinkProjectComponent;
  constructor(
    private _authService: AuthenticationService,
    private _workspaceAccessStrategyService: WorkspaceAccessStrategyService,
    private _coreStrategyService: CoreStrategyService,
    private _ativatedRoute: ActivatedRoute,
  
    private _activityservice: ActivityStrategyService

  ) {
    this.workspaceAccess = new WorkspaceAccess();
    this.workspaceAccess.user = new User();
    
    this.workspaceAccess.audits = new Array<WorkspaceAccessAudit>();
    this._workspaceAccessService = this._workspaceAccessStrategyService.getService();
    this._coreService = this._coreStrategyService.getService();
    this._coreService.getAllTypes().subscribe(types => {
      this.coreTypes = types;
    });
    // Current user
    this.currentUser = this._authService.getAuthUser();
    this.workspaceAccessCurrent = this._authService.getAuthWorkspaceAccess();
    this.canAssign = RolService.isAdminRol(this.workspaceAccessCurrent.rol.key) ||
      RolService.isManagerRol(this.workspaceAccessCurrent.rol.key);
    this.canRemove = RolService.isAdminRol(this.workspaceAccessCurrent.rol.key) ||
      RolService.isManagerRol(this.workspaceAccessCurrent.rol.key);

      // Auth
      this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
       // Id
    this.subscriptionParams = this._ativatedRoute.parent.params.subscribe(params => {
      const paramId = params.id;
      console.log('PARAMS'+paramId);
      if(paramId){
        //this.workspaceAccess = this._workspaceAccessService.getById(paramId);
      this._workspaceAccessService.getById(paramId).subscribe(wa => {
        this.waArray = wa;
        this.workspaceAccess = this.waArray[0];
      });
      }else{
        this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
      }
      
    })
  }

  ngOnInit() {
    
       this.subscriptionParams = this._ativatedRoute.parent.params.subscribe(params => {
       //Id of user get activity
      this.id = params.id;
      this.getWorkspaceAudit();
      
    });
   
    
  }
  private getWorkspaceAudit() {

    if (this.id) {
      this._workspaceAccessService.getAudit(this.id).subscribe(wa => {
        console.log(wa);
        this.workspaceAccess = wa;
        this.modalAssign.initModalData(this.workspaceAccess);
        this.initInformation();
      });
    } else {
      this.withHeader = false;
      this.showRemove = false;
      this._workspaceAccessService.getAudit(this.workspaceAccessCurrent.id).subscribe(wa => {
        this.workspaceAccess = wa;
        this.modalAssign.initModalData(this.workspaceAccess);
        this.initInformation();
      });
    }
  }

  private initInformation() {

    this._workspaceAccessService.getCoreAccess(this.workspaceAccess.id).subscribe(cores => {
      console.log(cores);
      this.cores = cores;
      this.cores.forEach(c => {
        const indexBrand = this.brands.indexOf(c.project.brand);
        if (indexBrand === -1) {
          this.brands.push(c.project.brand);
        }

        const indexProject = this.projects.indexOf(c.project);
        if (indexProject === -1) {
          this.projects.push(c.project);
        }
      });

    });


  }

  assign() {
    this.modalAssign.openModal();
  }
  tableRemoveCore(core: Core) {
    this.modalUnlink.openModal(core, this.workspaceAccess);
  }
  modalOnUnlink(result) {
    console.log('unlink', result);
  }
  ngOnDestroy() {
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
  }

}

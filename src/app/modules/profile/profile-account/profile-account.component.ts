import { Component, OnInit } from '@angular/core';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { ISubscription } from 'rxjs/Subscription';
import { Rol } from '../../../models/workspace/rol';
import { WorkspaceAccessStrategyService } from '../../../services/workspace/workspace-access-strategy.service';
import { RolStrategyService } from '../../../services/roles/rol-strategy.service';
import { UserStrategyService } from '../../../services/users/user-strategy.service';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { RolService } from '../../../services/roles/rol.service';
import { ToastrService } from 'ngx-toastr';
import { TeamWorkflowService } from '../../shared-team/services/team-workflow.service';
import { User } from 'src/app/models/users/user';
@Component({
  selector: 'app-profile-account',
  templateUrl: './profile-account.component.html',
  styleUrls: ['./profile-account.component.scss']
})
export class ProfileAccountComponent implements OnInit {
  public currentWorkspaceAccess: WorkspaceAccess;
  public workspaceAccess: WorkspaceAccess;
  public waArray: Array<WorkspaceAccess>;
  public roles: Array<Rol>;
  public canEditPhoto = false;
  public btnDisabled = false;
  public user: User;
  // Services
  private _workspaceAccessService;
  private _rolService;
  private _userService;
  // Subscriptions
  public subscriptionParams: ISubscription;

  constructor(
    private _authService: AuthenticationService,
    private _ativatedRoute: ActivatedRoute,
    private _workspaceAccessStrategyService: WorkspaceAccessStrategyService,
    private _rolStrategyService: RolStrategyService,
    private _userStrategyService: UserStrategyService,
    private _toastrService: ToastrService,
    private _teamWorkflowService: TeamWorkflowService
  ) {
    // Services
    this._workspaceAccessService = this._workspaceAccessStrategyService.getService();
    this._rolService = this._rolStrategyService.getService();
    this._userService = this._userStrategyService.getService();

    // Roles
    this._rolService.getAllRoles().subscribe(roles => {
      this.roles = roles;
    });
    this.currentWorkspaceAccess = this._authService.getAuthWorkspaceAccess();
    this.canEditPhoto = RolService.isAdminRol(this.currentWorkspaceAccess.rol.key);

    // Id
    this.subscriptionParams = this._ativatedRoute.parent.params.subscribe(params => {
      const paramId = params.id;
 
      if(paramId){
        //this.workspaceAccess = this._workspaceAccessService.getById(paramId);
      this._workspaceAccessService.getById(paramId).subscribe(wa => {
        //this.waArray = wa;
        this.workspaceAccess = wa;
        console.log('WA',wa);
        
      });
      }else{
        this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
      }
      
    });
  }

  ngOnInit() {
   
  }


  onChangeImage(file: File) {
    this._userService.changephotoUrl(this.workspaceAccess.user, file).subscribe(change => {
      if (change) {
        this._toastrService.info('Imagen de perfil cambiada con éxito');
      } else {
        this._toastrService.error('No se pudo cambiar la imagen de perfil');
      }
    });
  }
  /**Reset password */
  resetPassword() {
    this._userService.requestResetPassword(this.workspaceAccess.user.id).subscribe(success => {
      if (success) {
        this._toastrService.info('Se ha enviado un mail para <br> resetear la contraseña.');
      }
    });
  }
  save() {
    this.btnDisabled = true;
    this._workspaceAccessService.updateWorkspaceAccess(this.workspaceAccess).subscribe(wa => {
      this.btnDisabled = false;
      this._toastrService.info('Se han actualizado correctamente los cambios');
    });
  }

  suspend($event) {
    setTimeout(() => {
      if (this.workspaceAccess.accountStatus.key !== 'suspended') {
        // this.onSuspend.emit(this.user);
        this._teamWorkflowService.suspendAccount(this.workspaceAccess);
      }
    });
  }
  eliminate($event) {

    if (this.workspaceAccess.accountStatus.key !== 'eliminated') {
      // this.onSuspend.emit(this.user);
      this._teamWorkflowService.eliminateAccount(this.workspaceAccess);
    }
  }

  activate($event) {

    if (this.workspaceAccess.accountStatus.key !== 'active') {

      this._workspaceAccessService.activateWorkspaceAccess(this.workspaceAccess).subscribe(wa => {
        this.workspaceAccess.accountStatus = wa.accountStatus;
        this._toastrService.info('Cuenta activada');
      });
    }
  }

  onSuspend(wa: WorkspaceAccess) {
    console.log(wa);
    this.workspaceAccess.accountStatus = wa.accountStatus;
  }
  onEliminate(wa: WorkspaceAccess) {
    console.log(wa);
    this.workspaceAccess.accountStatus = wa.accountStatus;
  }

}

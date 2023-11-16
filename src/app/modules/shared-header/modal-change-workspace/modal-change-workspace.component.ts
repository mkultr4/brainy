import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AnimateModalComponent } from '../../shared-modal/animate-modal/animate-modal.component';
import { User } from '../../../models/users/user';
import { AuthenticationService } from '../../../services/auth/authentication.service';
import { ModalChangeWorkspaceService } from './modal-change-workspace.service';
import { ISubscription } from 'rxjs/Subscription';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { WorkspaceAccessStrategyService } from '../../../services/workspace/workspace-access-strategy.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-modal-change-workspace',
  templateUrl: './modal-change-workspace.component.html',
  styleUrls: ['./modal-change-workspace.component.scss']
})
export class ModalChangeWorkspaceComponent implements OnInit {
  public currentUser: User
  public password;
  public subscriptionShow: ISubscription;
  public btnDisabled = false;
  // Service
  private _workspaceAccessService;

  @ViewChild('modal') modal: AnimateModalComponent;
  constructor(
    private _router: Router,
    private _toastrService: ToastrService,
    private _authService: AuthenticationService,
    private _modalChangeWorkspaceService: ModalChangeWorkspaceService,
    private _workspaceAccessStrategyService: WorkspaceAccessStrategyService
  ) {
    this.currentUser = this._authService.getAuthUser();
    this._workspaceAccessService = this._workspaceAccessStrategyService.getService();
    this.subscriptionShow = this._modalChangeWorkspaceService.observableShow.subscribe(show => {
      if (show) {
        this.showModal();
      } else {
        this.closeModal();
      }
    });
  }

  ngOnInit() {
  }
  // show modal
  showModal() {

    this.modal.showModal();
  }
  closeModal() {

    this.modal.closeModal();
  }
  // On show modal
  modalOnShow() {

  }
  // close modal
  modalOnHide() {
    setTimeout(() => {
      this.password = '';
    });
  }
  // Change the workspace
  changeWorkspace() {
    this.btnDisabled = true;
    this._workspaceAccessService
      .changeWorkspace(this.currentUser.id, this.password)
      .subscribe((change) => {
        this.btnDisabled = false;
        if (change) {
          this.modal.closeModal();
          this._router.navigate(['/workspaces']);

        } else {
          this._toastrService.error('No se pudo cambiar de workspace <br> Compruebe su contraseña')
        }
      })


  }
}

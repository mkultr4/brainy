import { Component, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { Core } from '../../../models/cores/core';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { MzModalComponent } from 'ngx-materialize';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';
import { Notification } from '../../../models/notifications/notification';

@Component({
  selector: 'app-modal-request-permission-accept,[app-modal-request-permission-accept]',
  templateUrl: './modal-request-permission-accept.component.html',
  styleUrls: ['./modal-request-permission-accept.component.scss']
})
export class ModalRequestPermissionAcceptComponent implements OnInit {


  public notification = undefined;
  public core: Core;
  public btnDisabled = false;
  public applicant: WorkspaceAccess;
  public showMenu = false;
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: true,
    ready: (modal, trigger) => { },
    complete: () => {
      this.notification = undefined;
      this.core = undefined;
      this.btnDisabled = false;
    }
  };
  private _coreService;
  // Ouput
  @Output() modalOnAcceptPermission = new EventEmitter();

  // View chilld
  @ViewChild('modal') public modal: MzModalComponent;
  constructor(
    private _coreStrategyService: CoreStrategyService,
    private _toastrService: ToastrService
  ) { 
    this._coreService = this._coreStrategyService.getService();
  }
  ngOnInit() {

  }
  /**
   * Open modal
   * @param applicant 
   * @param notification 
   * @param core 
   */
  openModal(applicant: WorkspaceAccess, notification: Notification, core: Core) {
    this.applicant = applicant;
    this.notification = notification;
    this.core = core;
    this.modal.openModal();
  }
  /**
   * Accept 
   */
  accept() {
    this.btnDisabled = true;
    this._coreService.acceptPermission(this.applicant, this.notification, this.core).subscribe(resp => {
      this.btnDisabled = false;
      if (resp) {
        this.modal.closeModal();
        setTimeout(() => {
          this.modalOnAcceptPermission.emit();
        }, 350);

      } else {
        this._toastrService.error('No se pudieron actualizar los permisos');
      }
    });
  }
}

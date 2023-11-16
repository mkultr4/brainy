import { Component, OnInit, EventEmitter, ViewChild, Output } from '@angular/core';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { Invitation } from '../../../models/invitations/invitation';
import { Notification } from '../../../models/notifications/notification';
import { Core } from '../../../models/cores/core';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { MzModalComponent } from 'ngx-materialize';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';

@Component({
  selector: 'app-modal-request-modification,[app-modal-request-modification]',
  templateUrl: './modal-request-modification.component.html',
  styleUrls: ['./modal-request-modification.component.scss']
})
export class ModalRequestModificationComponent implements OnInit {
  public showMenu = false;
  public notification = new Notification();
  public requestTo: Invitation;
  public core: Core;
  public btnDisabled = false;
  public applicant: WorkspaceAccess;
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: true,
    ready: (modal, trigger) => { },
    complete: () => {
      this.notification.message = '';
      this.requestTo = undefined;
      this.core = undefined;
      this.btnDisabled = false;
    }
  };
  // Services
  private _coreService;
  // Ouput
  @Output() modalOnRequestModification = new EventEmitter();
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
  openModal(applicant: WorkspaceAccess, soliciteTo: Invitation, core: Core) {
    this.applicant = applicant;
    this.requestTo = soliciteTo;
    this.core = core;
    this.modal.openModal();
  }
  /**
   * Request modificaction
   */
  requestModification() {
    this.btnDisabled = true;
    this._coreService.requestModification(
      this.applicant,
      this.requestTo.workspaceAccess,
      this.core, 
      this.notification).subscribe(resp => {
        this.modal.closeModal();
        this.btnDisabled = false;
        if (resp) {
          this._toastrService.info('Se han enviado la solicitud de modificación.');
          this.modalOnRequestModification.emit();
        } else {
          this._toastrService.error('No ha podido ser enviada la solicitud.');
        }
      });
  }
}

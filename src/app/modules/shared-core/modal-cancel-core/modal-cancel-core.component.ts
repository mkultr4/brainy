import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Core } from '../../../models/cores/core';
import { MzModalComponent } from 'ngx-materialize';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';

@Component({
  selector: 'app-modal-cancel-core',
  templateUrl: './modal-cancel-core.component.html',
  styleUrls: ['./modal-cancel-core.component.scss']
})
export class ModalCancelCoreComponent implements OnInit {
  // Publics
  public canceling = false;
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: false,
    ready: (modal, trigger) => { },
    complete: () => {
      this.canceling = false;
    }
  };
  // Services
  private _coreService;
  // Inputs
  @Input() core: Core;
  // Output
  @Output() modalOnCancel = new EventEmitter();
  // View childs
  @ViewChild('modal') public modal: MzModalComponent;
  constructor(
    private _coreStrategyService: CoreStrategyService
  ) {
    this._coreService = this._coreStrategyService.getService();
  }

  ngOnInit() {
  }

  openModal(core?: Core) {
    if (core) {
      this.core = core;
    }
    this.modal.openModal();
  }
  cancel() {
    this.canceling = true;
    this._coreService.cancelCore(this.core).subscribe(core => {
      this.canceling = false;
      this.modal.closeModal();
      this.modalOnCancel.emit();
    });
  }
}

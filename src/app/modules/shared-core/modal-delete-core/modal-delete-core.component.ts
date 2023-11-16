import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MzModalComponent } from 'ngx-materialize';
import { Core } from '../../../models/cores/core';
import { CoreService } from '../../../services/cores/core.service';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';

@Component({
  selector: 'app-modal-delete-core',
  templateUrl: './modal-delete-core.component.html',
  styleUrls: ['./modal-delete-core.component.scss']
})
export class ModalDeleteCoreComponent implements OnInit {
  // Publics
  public deleting = false;
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: false,
    complete: () => {
      this.deleting = false;
    }
  };
  // Services
  private _coreService;
  // Inputs
  @Input() core: Core;
  // Output
  @Output() modalOnDelete = new EventEmitter();
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
  delete() {
    this.deleting = true;
    this._coreService.deleteCore(this.core).subscribe(core => {
      this.deleting = false;
      this.modal.closeModal();
      this.modalOnDelete.emit();
    });
  }
}

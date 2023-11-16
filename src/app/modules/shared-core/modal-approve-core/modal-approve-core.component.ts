import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Core } from '../../../models/cores/core';
import { MzModalComponent } from 'ngx-materialize';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';

@Component({
  selector: 'app-modal-approve-core',
  templateUrl: './modal-approve-core.component.html',
  styleUrls: ['./modal-approve-core.component.scss']
})
export class ModalApproveCoreComponent implements OnInit {
  // Publics
  public approving = false;
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: false,
    complete: () => {
      this.approving = false;
    }
  };
  // Services
  private _coreService;
  // Inputs
  @Input() core: Core;
  @Input() key = '';
  // Output
  @Output() modalOnApprove = new EventEmitter();
  // View childs
  @ViewChild('modal') public modal: MzModalComponent;
  constructor(
    private _coreStrategyService: CoreStrategyService
  ) {
    this._coreService = this._coreStrategyService.getService();
  }

  ngOnInit() {
  }
  openModal() {
    this.modal.openModal();
  }

  approve() {
    this.approving = true;
    this._coreService.approveCore(this.core).subscribe(core => {
      this.approving = false;
      this.modalOnApprove.emit();
      this.modal.closeModal();
    });
  }


}

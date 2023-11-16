import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { MzModalComponent } from 'ngx-materialize';
import { Core } from '../../../models/cores/core';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';

@Component({
  selector: 'app-modal-disapprove-core',
  templateUrl: './modal-disapprove-core.component.html',
  styleUrls: ['./modal-disapprove-core.component.scss']
})
export class ModalDisapproveCoreComponent implements OnInit {
  // Publics
  public disapproving = false;
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: false,
    complete: () => {
      this.disapproving = false;
    }
  };
  // Services
  private _coreService;
  // Inputs
  @Input() core: Core;
  // Output
  @Output() modalOnDisapprove = new EventEmitter();
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

  disapprove() {
    this.disapproving = true;
    this._coreService.disapproveCore(this.core).subscribe(core => {
      this.modalOnDisapprove.emit(core.status);
      this.disapproving = false;
      this.modal.closeModal();
    });
  }

}

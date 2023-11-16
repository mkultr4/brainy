import { Component, OnInit, Input, Output, ViewChild, EventEmitter } from '@angular/core';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';
import { Core } from '../../../models/cores/core';
import { MzModalComponent } from 'ngx-materialize';

@Component({
  selector: 'app-modal-alert-approve-core,[app-modal-alert-approve-core]',
  templateUrl: './modal-alert-approve-core.component.html',
  styleUrls: ['./modal-alert-approve-core.component.scss']
})
export class ModalAlertApproveCoreComponent implements OnInit {
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



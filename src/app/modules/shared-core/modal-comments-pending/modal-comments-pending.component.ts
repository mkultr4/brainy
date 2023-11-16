import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Core } from '../../../models/cores/core';
import { MzModalComponent } from 'ngx-materialize';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';


@Component({
  selector: 'app-modal-comments-pending,[app-modal-comments-pending]',
  templateUrl: './modal-comments-pending.component.html',
  styleUrls: ['./modal-comments-pending.component.scss']
})
export class ModalCommentsPendingComponent implements OnInit {
  public commentsPending = [];
  public approving = false;
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: true,
    ready: (modal, trigger) => { },
    complete: () => {
      this.approving = false;
      this.commentsPending = [];
    }
  };
  // Services
  private _coreService;
  // inputs
  @Input()  core: Core;
  // Ouput
  @Output() modalOnApprove = new EventEmitter();
  // View chilld
  @ViewChild('modal') public modal: MzModalComponent;
  
  constructor(
    private _coreStrategyService: CoreStrategyService
  ) { 
    this._coreService = this._coreStrategyService.getService();
  }

  ngOnInit() {
  }
  openModal(commentsPending) {
    this.commentsPending = commentsPending;
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

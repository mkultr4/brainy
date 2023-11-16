import { Component, OnInit, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { MzModalComponent } from 'ngx-materialize';

@Component({
  selector: 'app-modal-alert-can-upload-proposal',
  templateUrl: './modal-alert-can-upload-proposal.component.html',
  styleUrls: ['./modal-alert-can-upload-proposal.component.scss']
})
export class ModalAlertCanUploadProposalComponent implements OnInit {
  // Publics
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: true,
    ready: (modal, trigger) => { },
    complete: () => {
    }
  };
  // Inputs
  @Input() dateOfProposals: Date;
  // Outputs
  @Output() onShowUploadProposal = new EventEmitter();
  // View childs
  @ViewChild('modal') public modal: MzModalComponent;
  // Constructor
  constructor() { }
  // Init
  ngOnInit() {
  }
  // Open modal
  openModal() {
    this.modal.openModal();
  }
  // Upload proposal
  uploadProposals() {
    this.modal.closeModal();
    this.onShowUploadProposal.emit();
  }
}

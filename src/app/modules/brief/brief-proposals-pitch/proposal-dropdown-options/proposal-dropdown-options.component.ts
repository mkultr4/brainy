import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ProposalMessage } from 'src/app/models/brief/proposal-message';
import { Proposal } from 'src/app/models/brief/proposal';
import { ModalFloatingComponent } from 'src/app/modules/shared/modal-floating/modal-floating.component';

@Component({
  selector: 'app-proposal-dropdown-options',
  templateUrl: './proposal-dropdown-options.component.html',
  styleUrls: ['./proposal-dropdown-options.component.scss']
})
export class ProposalDropdownOptionsComponent implements OnInit {
  // Input
  @Input() dropdownId;
  @Input() proposal: Proposal;
  @Input() proposalMessage: ProposalMessage;
  // Output
  @Output() onSetStauts = new EventEmitter();
  // ViewChilds
  @ViewChild(ModalFloatingComponent) modalFloating : ModalFloatingComponent;
  // Constructor
  constructor() { }
  // Init
  ngOnInit() {
  }
  // On set status
  setStatus(status) {
    this.modalFloating.hideModal();
    setTimeout(() => {
      this.onSetStauts.emit({ status: status, proposalMessage: this.proposalMessage });
    }, 300);
  }

}

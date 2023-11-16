import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';
import { Proposal } from 'src/app/models/brief/proposal';
import { ProposalMessage } from 'src/app/models/brief/proposal-message';

@Component({
  selector: 'app-proposal-block',
  templateUrl: './proposal-block.component.html',
  styleUrls: ['./proposal-block.component.scss'],
  host: {
    'class': 'brief-proposal-block'
  }
})
export class ProposalBlockComponent implements OnInit {
  public proposalMessage = new ProposalMessage();
  // Host binding
  @Input() @HostBinding('class.declined') declined = false;
  @Input() canEdit = false;
  // Inputs
  @Input() proposal: Proposal;
  @Input() finalist = false;
  // Output
  @Output() onUpdateProposal = new EventEmitter();
  // Constructor
  constructor() { }
  // Init
  ngOnInit() {
  }

  dropdownOnHide() {
    this.proposalMessage = new ProposalMessage();
  }

  setStatus(data) {
    const status = data.status;
    const proposalMessage = data.proposalMessage;
    this.proposal.status = status;
    this.proposal.proposalMessages.push(proposalMessage);

    this.onUpdateProposal.emit(this.proposal);


  }
}

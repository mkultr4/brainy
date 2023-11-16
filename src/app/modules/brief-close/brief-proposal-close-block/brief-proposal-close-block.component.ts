import { Component, OnInit, Input } from '@angular/core';
import { Proposal } from 'src/app/models/brief/proposal';

@Component({
  selector: 'app-brief-proposal-close-block',
  templateUrl: './brief-proposal-close-block.component.html',
  styleUrls: ['./brief-proposal-close-block.component.scss'],
  host: {
    'class': 'brief-proposal-block'
  }
})
export class BriefProposalCloseBlockComponent implements OnInit {
  @Input() proposal: Proposal;
  
  constructor() { }

  ngOnInit() {
  }

}

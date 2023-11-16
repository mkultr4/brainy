import { Component, OnInit, Input } from '@angular/core';
import { DATEPICKER_CONFIG } from 'src/app/config/app.config';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { Proposal } from 'src/app/models/brief/proposal';

@Component({
  selector: 'app-brief-proposals-pitch',
  templateUrl: './brief-proposals-pitch.component.html',
  styleUrls: ['./brief-proposals-pitch.component.scss']
})
export class BriefProposalsPitchComponent implements OnInit {
  // Public vars
  public datePickerOptionsProposals: any = Object.assign({}, DATEPICKER_CONFIG);
  public hasChangedDate = false;
  // Services
  private _briefService;
  // Inputs
  @Input() proposals = [];
  @Input() workflowMenu = false;
  @Input() isTemplate = true;
  @Input() dateOfProposals;
  @Input() canEditDate = false;
  @Input() canEditProposals = false;
  @Input() canUploadProposal = false;
  @Input() proposalOfGuest:Proposal;
  constructor(
    private _briefStrategyService: BriefStrategyService
  ) {
    // Services
    this._briefService = this._briefStrategyService.getService();
    // Date proposals
    this.datePickerOptionsProposals.container = 'body';
    this.datePickerOptionsProposals.format = 'dd/mm/yyyy';
    this.datePickerOptionsProposals.min = new Date();
    this.datePickerOptionsProposals.onClose = () => {
      if (this.hasChangedDate) {
        this._briefService.updateDates(null, this.dateOfProposals, null).subscribe(resp => {
          this.hasChangedDate = false;
        });
      }
    }
  }

  ngOnInit() {
  }

  // On change date
  onChangeDate(date) {
    this.hasChangedDate = true;
  }

  onUpdateProposal(proposal:Proposal){
    this._briefService.updateProposal(proposal).subscribe(proposal => {
      console.log(proposal);
    });
  }
}

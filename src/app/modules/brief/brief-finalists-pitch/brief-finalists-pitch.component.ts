import { Component, OnInit, Input } from '@angular/core';
import { DATEPICKER_CONFIG } from 'src/app/config/app.config';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { Proposal } from 'src/app/models/brief/proposal';

@Component({
  selector: 'app-brief-finalists-pitch',
  templateUrl: './brief-finalists-pitch.component.html',
  styleUrls: ['./brief-finalists-pitch.component.scss']
})
export class BriefFinalistsPitchComponent implements OnInit {
  // Public vars
  public datePickerOptionsResults: any = Object.assign({}, DATEPICKER_CONFIG);
  public hasChangedDate = false;
  // Services
  private _briefService;
  // Inputs
  @Input() finalists = [];
  @Input() workflowMenu = false;
  @Input() isTemplate = true;
  @Input() dateOfResults;
  @Input() canEditDate = false;
  @Input() canEditProposals = false;
  // Constructor
  constructor(
    private _briefStrategyService: BriefStrategyService
  ) {
    // Services
    this._briefService = this._briefStrategyService.getService();
    // Date proposals
    this.datePickerOptionsResults.container = 'body';
    this.datePickerOptionsResults.format = 'dd/mm/yyyy';
    this.datePickerOptionsResults.min = new Date();
    this.datePickerOptionsResults.onClose = () => {
      if (this.hasChangedDate) {
        this._briefService.updateDates(null, null, this.dateOfResults).subscribe(resp => {
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
  /**
   * On change proposal
   * @param proposal 
   */
  onUpdateProposal(proposal:Proposal){
    this._briefService.updateProposal(proposal).subscribe(proposal => {
      console.log(proposal);
    });
  }


}

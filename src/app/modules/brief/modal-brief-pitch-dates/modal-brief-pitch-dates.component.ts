import { Component, OnInit, ViewChild } from '@angular/core';
import { MzModalComponent } from 'ngx-materialize';
import { DATEPICKER_CONFIG } from 'src/app/config/app.config';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';

@Component({
  selector: 'app-modal-brief-pitch-dates',
  templateUrl: './modal-brief-pitch-dates.component.html',
  styleUrls: ['./modal-brief-pitch-dates.component.scss']
})
export class ModalBriefPitchDatesComponent implements OnInit {
  // Public vars
  public dateOfGivebacks;
  public dateOfProposals;
  public dateOfResults;
  public btnDisabled = false;
  public modalOptions: Materialize.ModalOptions = {
    endingTop: '50%',
    dismissible: true,
    ready: () => {
    },
    complete: () => { 
      this.btnDisabled = false;
    }
  };
  public datePickerOptionsGivebacks: any = Object.assign({}, DATEPICKER_CONFIG);
  public datePickerOptionsProposals: any = Object.assign({}, DATEPICKER_CONFIG);
  public datePickerOptionsResults: any = Object.assign({}, DATEPICKER_CONFIG);
  // Services
  private _briefService;
  // View childs
  @ViewChild('modal') public modal: MzModalComponent;
  constructor(
    private _briefStrategyService: BriefStrategyService
  ) { 
    // Services
    this._briefService = this._briefStrategyService.getService();
    // Date givebacks
    this.datePickerOptionsGivebacks.container = 'body';
    this.datePickerOptionsGivebacks.format = 'dd/mm/yy';
    this.datePickerOptionsGivebacks.min = new Date();
    // Date proposals
    this.datePickerOptionsProposals.container = 'body';
    this.datePickerOptionsProposals.format = 'dd/mm/yy';
    this.datePickerOptionsProposals.min = new Date();
    // Date results
    this.datePickerOptionsResults.container = 'body';
    this.datePickerOptionsResults.format = 'dd/mm/yy';
    this.datePickerOptionsResults.min = new Date();
  }

  ngOnInit() {
  }
  // Open modal
  openModal() {
    this.modal.openModal();
  }
  // Close modal
  closeModal() {
    this.modal.closeModal();
  }

  updateDates(){
    this.btnDisabled = true;
    this._briefService.updateDates(this.dateOfGivebacks,this.dateOfProposals,this.dateOfResults).subscribe(()=>{
      this.btnDisabled = false;
      this.modal.closeModal();
    });

  }


}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MzModalComponent } from 'ngx-materialize';
import { BriefTemplate } from 'src/app/models/brief/brief-template';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-modal-alert-template-library',
  templateUrl: './modal-alert-template-library.component.html',
  styleUrls: ['./modal-alert-template-library.component.scss']
})
export class ModalAlertTemplateLibraryComponent implements OnInit {
  // Public vars
  public btnLoading = false;
  public briefTemplate: BriefTemplate;
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: false,
    complete: () => {
      this.btnLoading = false;
      this.briefTemplate = undefined;
    }
  };
  // Services
  private _briefService;
  // View childs
  @ViewChild('modal') modal: MzModalComponent;
  constructor(
    private _briefStrategyService: BriefStrategyService,
    private _toastrService: ToastrService
  ) {
    this._briefService = this._briefStrategyService.getService();
  }

  ngOnInit() {
  }

  showModal(briefTemplate: BriefTemplate) {
    this.briefTemplate = briefTemplate;
    this.modal.openModal();
  }
  accept() {
    const isLibrary = !this.briefTemplate.isLibrary;
    this.btnLoading = true;
    //briefTemplate.isLibrary = !briefTemplate.isLibrary ;
    this._briefService.makeLibraryTemplate(this.briefTemplate.id, isLibrary).subscribe(briefTemplateResponse => {
      this.btnLoading = false;
      this.modal.closeModal();
      setTimeout(() => {
        
        if (briefTemplateResponse.isLibrary) {
          this._toastrService.info('Se agrego el template a tu librería tu equipo podrá visualizarlo');

        } else {
          this._toastrService.info('Se removio el template de tu librería');
        }
      }, 200);
    });
  }
}

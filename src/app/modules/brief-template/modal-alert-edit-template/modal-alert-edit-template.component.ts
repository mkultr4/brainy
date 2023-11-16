import { Component, OnInit, ViewChild } from '@angular/core';
import { BriefTemplate } from 'src/app/models/brief/brief-template';
import { MzModalComponent } from 'ngx-materialize';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-alert-edit-template',
  templateUrl: './modal-alert-edit-template.component.html',
  styleUrls: ['./modal-alert-edit-template.component.scss']
})
export class ModalAlertEditTemplateComponent implements OnInit {
  // Public vars
  public briefTemplate: BriefTemplate;
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: false,
    complete: () => {
      setTimeout(()=>{
      this.briefTemplate = undefined;
      },300);
    }
  };
  // Services
  // View childs
  @ViewChild('modal') modal: MzModalComponent;
  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }
  showModal(briefTemplate: BriefTemplate) {
    this.briefTemplate = briefTemplate;
    this.modal.openModal();
  }
  accept() {
    
    this.modal.closeModal();
    const id = this.briefTemplate.id;
    setTimeout(()=>{
      this._router.navigate(['/brief/edit/template/' + id])
    },300);
  }
}

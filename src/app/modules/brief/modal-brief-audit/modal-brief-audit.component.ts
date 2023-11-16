import { Component, OnInit, ViewChild } from '@angular/core';
import { MzModalComponent } from 'ngx-materialize';

@Component({
  selector: 'app-modal-brief-audit',
  templateUrl: './modal-brief-audit.component.html',
  styleUrls: ['./modal-brief-audit.component.scss']
})
export class ModalBriefAuditComponent implements OnInit {
  public audits = [];
  @ViewChild('modal') public modal: MzModalComponent;
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: true,
    complete: () => {
    }
  };
  constructor() { }

  ngOnInit() {
  }

  openModal(audits) {
    this.audits = audits;
    this.modal.openModal();
  }


}

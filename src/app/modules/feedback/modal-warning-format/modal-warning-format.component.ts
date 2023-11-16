import { Component, OnInit, ViewChild } from '@angular/core';
import { MzModalComponent } from 'ngx-materialize';

@Component({
  selector: 'app-modal-warning-format',
  templateUrl: './modal-warning-format.component.html',
  styleUrls: ['./modal-warning-format.component.scss']
})
export class ModalWarningFormatComponent implements OnInit {
  public title = '';
  public description = '';
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: true,
    ready: (modal, trigger) => { },
    complete: () => {
    }
  };
  @ViewChild('modal') public modal: MzModalComponent;
  constructor() { }

  ngOnInit() {
  }

  openModal(title,description) {
    this.title = title;
    this.description = description;
    this.modal.openModal();
  }
  closeModal() {
    this.modal.closeModal();
  }

}

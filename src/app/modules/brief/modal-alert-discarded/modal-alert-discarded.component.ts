import { Component, OnInit, ViewChild } from '@angular/core';
import { MzModalComponent } from 'ngx-materialize';

@Component({
  selector: 'app-modal-alert-discarded',
  templateUrl: './modal-alert-discarded.component.html',
  styleUrls: ['./modal-alert-discarded.component.scss']
})
export class ModalAlertDiscardedComponent implements OnInit {
  // Publics
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: true,
    ready: (modal, trigger) => { },
    complete: () => {
    }
  };
  // View childs
  @ViewChild('modal') public modal: MzModalComponent;
  constructor() { }

  ngOnInit() {
  }
  openModal() {
    this.modal.openModal();
  }
}

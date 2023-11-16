import { Component, OnInit, ViewChild } from '@angular/core';
import { MzModalComponent } from 'ngx-materialize';

@Component({
  selector: 'app-modal-alert-pre-finalist',
  templateUrl: './modal-alert-pre-finalist.component.html',
  styleUrls: ['./modal-alert-pre-finalist.component.scss']
})
export class ModalAlertPreFinalistComponent implements OnInit {
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

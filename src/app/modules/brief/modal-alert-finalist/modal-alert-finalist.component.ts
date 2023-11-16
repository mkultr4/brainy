import { Component, OnInit, ViewChild } from '@angular/core';
import { MzModalComponent } from 'ngx-materialize';

@Component({
  selector: 'app-modal-alert-finalist',
  templateUrl: './modal-alert-finalist.component.html',
  styleUrls: ['./modal-alert-finalist.component.scss']
})
export class ModalAlertFinalistComponent implements OnInit {
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

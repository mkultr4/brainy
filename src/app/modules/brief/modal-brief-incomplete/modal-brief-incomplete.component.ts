import { Component, OnInit, ViewChild } from '@angular/core';
import { MzModalComponent } from 'ngx-materialize';

@Component({
  selector: 'app-modal-brief-incomplete',
  templateUrl: './modal-brief-incomplete.component.html',
  styleUrls: ['./modal-brief-incomplete.component.scss']
})
export class ModalBriefIncompleteComponent implements OnInit {
  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: false,
    complete: () => {
    }
  };
  // View childs
  @ViewChild('modal') public modal: MzModalComponent;
  constructor() { }
  // Init
  ngOnInit() {
  }
  // Open modal
  openModal() {
    this.modal.openModal();
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MzModalComponent } from 'ngx-materialize';

@Component({
  selector: 'app-modal-meeting-note-audit',
  templateUrl: './modal-meeting-note-audit.component.html',
  styleUrls: ['./modal-meeting-note-audit.component.scss']
})
export class ModalMeetingNoteAuditComponent implements OnInit {
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

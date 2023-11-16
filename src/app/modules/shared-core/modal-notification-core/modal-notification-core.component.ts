import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MzModalComponent } from 'ngx-materialize';
import { Notification } from '../../../models/notifications/notification';


@Component({
  selector: 'app-modal-notification-core,[app-modal-notification-core]',
  templateUrl: './modal-notification-core.component.html',
  styleUrls: ['./modal-notification-core.component.scss']
})
export class ModalNotificationCoreComponent implements OnInit {

  public notification = undefined;
  // Output
  @Output() modalNotificationOnClose = new EventEmitter();
  // View chilld
  @ViewChild('modal') public modal: MzModalComponent;

  public modalOptions: Materialize.ModalOptions = {
    opacity: 1,
    endingTop: '50%',
    dismissible: true,
    ready: (modal, trigger) => { },
    complete: () => {
      this.modalNotificationOnClose.emit(this.notification);
    }
  };
  constructor() { }
  ngOnInit() {}
  
  openModal(notification: Notification) {
    this.notification = Object.assign({}, notification);
    this.modal.openModal();
  }

}

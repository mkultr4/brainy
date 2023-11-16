import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { ModalFloatingComponent } from 'src/app/modules/shared/modal-floating/modal-floating.component';
import ResponseTypeSetting from 'src/app/interface/brief/ResponseTypeSetting';

@Component({
  selector: 'app-contextual-brief-response',
  templateUrl: './contextual-brief-response.component.html',
  styleUrls: ['./contextual-brief-response.component.scss']
})
export class ContextualBriefResponseComponent implements OnInit {
  public acceptFiles = { video: false, file: false, audio: false, link: false };
  // Inputs
  @Input() responseSettings: ResponseTypeSetting;
  @Input() briefCategoryItemId: string;
  // Output
  @Output() onCancel = new EventEmitter();
  @Output() onAccept = new EventEmitter();
  // View child
  @ViewChild(ModalFloatingComponent) modal : ModalFloatingComponent;
  // Constructor
  constructor() { }
  // Init
  ngOnInit() {
    this.acceptFiles = Object.assign({},this.responseSettings.acceptFiles);

  }
  onHide(){  
  }
  onShow(){
    this.acceptFiles = Object.assign({},this.responseSettings.acceptFiles);
  }
  accept() {
    this.modal.hideModal();
    this.onAccept.emit(this.acceptFiles);
  }
  cancel() {
    this.modal.hideModal();
    this.acceptFiles = Object.assign({},this.responseSettings.acceptFiles);
  }
}

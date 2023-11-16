import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ResponseType } from 'src/app/models/brief/response-type';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { ModalFloatingComponent } from 'src/app/modules/shared/modal-floating/modal-floating.component';


@Component({
  selector: 'app-contextual-brief-category-item-response',
  templateUrl: './contextual-brief-category-item-response.component.html',
  styleUrls: ['./contextual-brief-category-item-response.component.scss']
})
export class ContextualBriefCategoryItemResponseComponent implements OnInit {
  // Inputs
  @Input() briefCategoryItem: BriefCategoryItem;
  @Input() responseTypes: ResponseType[];
  // Outputs
  @Output() onShowContextualResponse = new EventEmitter();
  @Output() onChangeResponseType = new EventEmitter();
  // View Child
  @ViewChild(ModalFloatingComponent) modal: ModalFloatingComponent;
  constructor() { }

  ngOnInit() {
  }
  // On change
  changeResponseType($event, type) {
    $event.preventDefault();
    $event.stopPropagation();
    this.onChangeResponseType.emit(type);
    this.modal.hideModal();
  }
  // Show/Hide modal
  onShowModal(show: boolean) {
    this.onShowContextualResponse.emit(show);
  }
}

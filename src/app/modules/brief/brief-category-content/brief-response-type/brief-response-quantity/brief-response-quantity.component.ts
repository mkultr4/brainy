import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { QUANTITY_TYPES } from 'src/app/data/mock-brief';

@Component({
  selector: '[app-brief-response-quantity]',
  templateUrl: './brief-response-quantity.component.html',
  styleUrls: ['./brief-response-quantity.component.scss']
})
export class BriefResponseQuantityComponent implements OnInit {
  // Inputs
  @Input() briefCategoryItem: BriefCategoryItem;
  @Input() editable = false;
  @Input() refillable = false;
  @Input() focusResponse = false;
  // Outpus
  @Output() onSettingsChange = new EventEmitter();
  @Output() onContentChange = new EventEmitter();
  @Output() onContentFocus = new EventEmitter();
  // Constructor
  constructor() { }

  ngOnInit() {
  }

  changeType(type) {
    const quantityType = QUANTITY_TYPES.filter(t => t.type === type)[0];
    this.briefCategoryItem.responseSettings.quantity = quantityType;
    this.onSettingsChange.emit(this.briefCategoryItem.responseSettings);
    setTimeout(() => {
      this.briefCategoryItem.responseContent.quantity = '';
      this.onContentChange.emit(this.briefCategoryItem.responseContent);
    });
  }

}

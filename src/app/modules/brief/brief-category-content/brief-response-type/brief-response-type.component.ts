import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { TableCellType } from 'src/app/models/brief/table-cell-type';


@Component({
  selector: '[app-brief-response-type]',
  templateUrl: './brief-response-type.component.html',
  styleUrls: ['./brief-response-type.component.scss']
})
export class BriefResponseTypeComponent implements OnInit {
  // Input
  @Input() briefCategoryItem: BriefCategoryItem;
  @Input() refillable = false;
  @Input() focusResponse = false;
  @Input() editable = false;
  @Input() tableCellTypes: TableCellType[];
  // Output
  @Output() onResponseContentChange = new EventEmitter();
  @Output() onResponseSettingsChange = new EventEmitter();
  @Output() onResponseFocus = new EventEmitter();
  // Constructor
  constructor() { }
  // Init
  ngOnInit() {
  }
  // Change response content
  changeResponseContent(responseContent) {
    this.onResponseContentChange.emit(this.briefCategoryItem.responseContent);
  }
  // Change response settings
  changeResponseSettings(responseSettings) {
    this.onResponseSettingsChange.emit(this.briefCategoryItem.responseSettings);
  }
  
  // Response focus
  responseFocus() {
    this.onResponseFocus.emit();
  }
}

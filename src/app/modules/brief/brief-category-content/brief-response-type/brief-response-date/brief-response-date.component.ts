import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { Option } from 'src/app/models/brief/option';
import * as uuid from 'uuid/v4';

@Component({
  selector: '[app-brief-response-date]',
  templateUrl: './brief-response-date.component.html',
  styleUrls: ['./brief-response-date.component.scss']
})
export class BriefResponseDateComponent implements OnInit {
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
  // Add time
  addTime($event) {
    $event.preventDefault();
    $event.stopPropagation();
    const optionTime = Object.assign(new Option(), <Option>{ id: uuid(), value: '', type: 'time', order: 2 });
    this.briefCategoryItem.responseSettings.options.push(optionTime);
    this.onSettingsChange.emit(this.briefCategoryItem.responseSettings);
  }
  // Add date
  addDate($event) {
    $event.preventDefault();
    $event.stopPropagation();
    const optionDate = Object.assign(new Option(), <Option>{ id: uuid(), value: '', type: 'date', order: 1 });    
    this.briefCategoryItem.responseSettings.options.unshift(optionDate);
    this.onSettingsChange.emit(this.briefCategoryItem.responseSettings);
  }
  // delete option
  deleteOption(option: Option) {
    
    const index = this.briefCategoryItem.responseSettings.options.findIndex(o => o.id === option.id);
    this.briefCategoryItem.responseSettings.options.splice(index, 1);
    // Emit update
    this.onSettingsChange.emit(this.briefCategoryItem.responseSettings);
  
  }
  // Change options
  onChangeSettings() {
    this.onSettingsChange.emit(this.briefCategoryItem.responseSettings);
  }
}

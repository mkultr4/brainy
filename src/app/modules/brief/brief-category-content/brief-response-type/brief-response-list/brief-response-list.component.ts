import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { ToastrService } from 'ngx-toastr';
import { Option } from 'src/app/models/brief/option';
import * as uuid from 'uuid/v4';
@Component({
  selector: '[app-brief-response-list]',
  templateUrl: './brief-response-list.component.html',
  styleUrls: ['./brief-response-list.component.scss']
})
export class BriefResponseListComponent implements OnInit {
  // Inputs
  @Input() briefCategoryItem: BriefCategoryItem;
  @Input() editable = false;
  @Input() refillable = false;
  @Input() focusResponse = false;
  // Outpus
  @Output() onSettingsChange = new EventEmitter();
  @Output() onContentChange = new EventEmitter();
  @Output() onContentFocus = new EventEmitter();

  constructor(
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
  }

  // delete option
  deleteOption(option: Option) {
    const index = this.briefCategoryItem.responseSettings.options.findIndex(o => o.id === option.id);
    this.briefCategoryItem.responseSettings.options.splice(index, 1);
    // Emit update
    this.onSettingsChange.emit(this.briefCategoryItem.responseSettings);
    
  }
  // Add option
  addOption() {
    if (this.editable || this.refillable) {
      if (this.briefCategoryItem.responseSettings.options.length === 12) {
        this._toastrService.info('El límite es de 12 items');
        return;
      }
      // Add option
      var lengthOpt = this.briefCategoryItem.responseSettings.options.length + 1;
      var newOption = <Option>{ id: uuid(), type: 'list', order: lengthOpt, value: '' };
      this.briefCategoryItem.responseSettings.options.push(Object.assign(new Option(), newOption));
      // Emit update
      this.onSettingsChange.emit(this.briefCategoryItem.responseSettings);
    }
  }
  // Change options
  onChangeSettings() {
    this.onSettingsChange.emit(this.briefCategoryItem.responseSettings);
  }


}

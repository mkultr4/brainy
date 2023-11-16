import { Component, OnInit, Output, EventEmitter, Input,  QueryList, ViewChildren } from '@angular/core';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { Option } from 'src/app/models/brief/option';
import { ToastrService } from 'ngx-toastr';
import * as uuid from 'uuid/v4';
import { OptionYesNoComponent } from './option-yes-no/option-yes-no.component';

@Component({
  selector: '[app-brief-response-yes-no]',
  templateUrl: './brief-response-yes-no.component.html',
  styleUrls: ['./brief-response-yes-no.component.scss']
})
export class BriefResponseYesNoComponent implements OnInit {
  // Inputs
  @Input() briefCategoryItem: BriefCategoryItem;
  @Input() editable = false;
  @Input() refillable = false;
  @Input() focusResponse = false;
  // Outpus
  @Output() onSettingsChange = new EventEmitter();
  @Output() onContentChange = new EventEmitter();
  @Output() onContentFocus = new EventEmitter();
  // View childs
  @ViewChildren(OptionYesNoComponent) optionsComp : QueryList<OptionYesNoComponent>;
  // Constructor
  constructor(
    private _toastrService: ToastrService
  ) { }

  ngOnInit() {
  }
  
  // delete option
  deleteOption(option: Option) {
    const index = this.briefCategoryItem.responseSettings.options.findIndex(o => o.id === option.id);
    const indexResponseContent = this.briefCategoryItem.responseContent.options.findIndex(o => o.id === option.id);
    this.briefCategoryItem.responseSettings.options.splice(index, 1);
    // Emit update
    this.onSettingsChange.emit(this.briefCategoryItem.responseSettings);
    if (indexResponseContent >= 0) {
      this.briefCategoryItem.responseContent.options.splice(indexResponseContent, 1);
      this.onContentChange.emit(this.briefCategoryItem.responseContent);
    }
  }
  // Add option
  addOption($event) {
    $event.preventDefault();
    $event.stopPropagation();

    if (this.briefCategoryItem.responseSettings.options.length === 3 ) {
      return;
    }
    // Add option
    var lengthOpt = this.briefCategoryItem.responseSettings.options.length + 1;
    var newOption = <Option>{ id: uuid(), label: ``, type: 'yes-no', icon: undefined, order: lengthOpt };
    this.briefCategoryItem.responseSettings.options.push(Object.assign(new Option(), newOption));
    
    setTimeout(()=>{
      console.log(this.optionsComp);
      const optionComp = this.optionsComp.filter(o => o.option.id === newOption.id)[0];
      optionComp.editor.nativeElement.focus();
    });
    
    // Emit update
    this.onSettingsChange.emit(this.briefCategoryItem.responseSettings);
  }
  // Change options
  onChangeSettings() {
    this.onSettingsChange.emit(this.briefCategoryItem.responseSettings);
  }

    // Toggle selection
    toggleSelection(option: Option) {
      const index = this.briefCategoryItem.responseContent.options.findIndex(o => o.id === option.id);
      // Addd
      if (index === -1) {
        this.briefCategoryItem.responseContent.options[0] = option;
      } else {
        // remove
        this.briefCategoryItem.responseContent.options.splice(index, 1);
      }
    }
}

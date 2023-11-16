import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BriefCategoryItem } from 'src/app/models/brief/brief-category-item';
import { Option } from 'src/app/models/brief/option';
import * as uuid from 'uuid/v4';

@Component({
  selector: '[app-brief-response-assessment]',
  templateUrl: './brief-response-assessment.component.html',
  styleUrls: ['./brief-response-assessment.component.scss']
})
export class BriefResponseAssessmentComponent implements OnInit {
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
    if (this.briefCategoryItem.responseSettings.assessment.type === 'number') {
      if (this.briefCategoryItem.responseSettings.options.length === 10) {
        this._toastrService.info('El límite es de 10 casillas');
        return;
      }
      // Add option
      var lengthOpt = this.briefCategoryItem.responseSettings.options.length + 1;
      var newOption = <Option>{ id: uuid(), label: `Opción ${lengthOpt}`, type: 'assessment-number', icon: undefined, order: lengthOpt };
      this.briefCategoryItem.responseSettings.options.push(Object.assign(new Option(), newOption));
      // Emit update
      this.onSettingsChange.emit(this.briefCategoryItem.responseSettings);
    } else if (this.briefCategoryItem.responseSettings.assessment.type === 'text') {
      if (this.briefCategoryItem.responseSettings.options.length === 4) {
        this._toastrService.info('El límite es de 4 casillas');
        return;
      }
      var lengthOpt = this.briefCategoryItem.responseSettings.options.length + 1;
      var newOption = <Option>{ id: uuid(), label: `Opción ${lengthOpt}`, type: 'assessment-text', icon: undefined, order: lengthOpt };
      this.briefCategoryItem.responseSettings.options.push(Object.assign(new Option(), newOption));
      this.onSettingsChange.emit(this.briefCategoryItem.responseSettings);
    }
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
    this.onContentChange.emit(this.briefCategoryItem.responseSettings);
  }
  // Change type
  changeType(type: string) {
    this.briefCategoryItem.responseSettings.assessment.type = type;
    let options: Option[] = [];
    if (type === 'text') {
      options = this.generateOptionsAssessmentText();
    } else if (type === 'number') {
      options = this.generateOptionsAssessmentNumber();
    }
    this.briefCategoryItem.responseSettings.options = options;
    // console.log(this.briefCategoryItem);
  }
  // Generate number
  generateOptionsAssessmentNumber() {
    let options: Option[] = [];
    for (let i = 0; i < 10; i++) {
      const option = Object.assign(new Option(), <Option>{ id: uuid(), type: 'assessment-number', icon: undefined, order: i + 1 })
      options.push(option);
    }
    return options;
  }
  // Generate text
  generateOptionsAssessmentText() {
    return <Option[]>[
      Object.assign(new Option(), <Option>{ id: uuid(), label: 'Mala', type: 'assessment-text', icon: { font: 'material-icons', value: "sentiment_very_dissatisfied" },order:1 }),
      Object.assign(new Option(), <Option>{ id: uuid(), label: 'Regular', type: 'assessment', icon: { font: 'material-icons', value: "sentiment_neutral" },order:2}),
      Object.assign(new Option(),<Option>{ id: uuid(), label: 'Buena', type: 'assessment', icon: { font: 'material-icons', value: "sentiment_satisfied" },order:3 }),
      Object.assign(new Option(),<Option>{ id: uuid(), label: 'Excelente', type: 'assessment', icon: { font: 'material-icons', value: "sentiment_very_satisfied"}, order:4 })

    ]
  }
}

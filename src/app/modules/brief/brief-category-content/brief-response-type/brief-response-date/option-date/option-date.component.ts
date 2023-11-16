import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Option } from 'src/app/models/brief/option';
import { TIMEPICKER_CONFIG, DATEPICKER_CONFIG } from 'src/app/config/app.config';

@Component({
  selector: 'app-option-date',
  templateUrl: './option-date.component.html',
  styleUrls: ['./option-date.component.scss']
})
export class OptionDateComponent implements OnInit {
  // Public vars
  public datePickerOptions = Object.assign({}, DATEPICKER_CONFIG);
  public timePickerOptions = Object.assign({}, TIMEPICKER_CONFIG);
  // Inputs
  @Input() option: Option;
  @Input() editable = false;
  @Input() refillable = false;
  @Input() focusResponse = false;
  // Outpus
  @Output() onDelete = new EventEmitter();
  @Output() onChange = new EventEmitter();

  // Contructor
  constructor() {
    //this.datePickerOptions.min = new Date();
    this.datePickerOptions.container = 'body';
    this.datePickerOptions.format = "dd / mm / yyyy"
    this.datePickerOptions.default = 'now';
    this.datePickerOptions.setDefaultDate = true;
    //this.timePickerOptions.min = new Date();
    this.timePickerOptions.twelvehour = true;
  }

  ngOnInit() {
  }

  onChangeDate($event, option) {
    this.onChange.emit();
  }
  onChangeHour($event) {
    if (this.option.value || this.option.value !== '') {
      var newHour = this.option.value.substring(0, 2) + ' : ' + this.option.value.substring(3, 5) + ' ' + this.option.value.substring(5, 7).toLowerCase();
      this.option.value = newHour;
    }

    this.onChange.emit();
  }
  // Delete option
  deleteOption($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.onDelete.emit(this.option);
  }


}

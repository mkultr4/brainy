import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Option } from 'src/app/models/brief/option';

@Component({
  selector: 'app-option-radio',
  templateUrl: './option-radio.component.html',
  styleUrls: ['./option-radio.component.scss']
})
export class OptionRadioComponent implements OnInit {
  // Public vars
  public showContextualIcon = false;
  // Inputs
  @Input() option: Option;
  @Input() selected = false;
  @Input() editable = false;
  @Input() refillable = false;
  @Input() focusResponse = false;
  @Input() contextualResponseIconShow = false;
  // Outpus
  @Output() onToggleSelection = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Output() onChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  // Toogle selection
  toggleSelection($event) {
    if (this.editable) {
      const target = $($event.target);
      if (target.closest('.brief-radio-option').length === 0) {
        this.onToggleSelection.emit(this.option);
      }
    } else {
      this.onToggleSelection.emit(this.option);
    }

  }
  // Delete option
  deleteOption($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.onDelete.emit(this.option);
  }
  // Label change
  labelChange() {
    this.onChange.emit();
  }

}

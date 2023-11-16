import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Option } from 'src/app/models/brief/option';

@Component({
  selector: 'app-option-select',
  templateUrl: './option-select.component.html',
  styleUrls: ['./option-select.component.scss']
})
export class OptionSelectComponent implements OnInit {
  // Inputs
  @Input() option: Option;
  @Input() selected = false;
  @Input() editable = false;
  @Input() refillable = false;
  @Input() focusResponse = false;
  @Input() contextualResponseIconShow = false;
  // Outpus
  @Output() onDelete = new EventEmitter();
  @Output() onChange = new EventEmitter();
  
  // Contructor
  constructor() { }

  ngOnInit() {
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

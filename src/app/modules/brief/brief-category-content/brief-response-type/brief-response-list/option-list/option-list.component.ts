import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Option } from 'src/app/models/brief/option';

@Component({
  selector: '[app-option-list]',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss']
})
export class OptionListComponent implements OnInit {
  
  // Inputs
  @Input() option: Option;
  @Input() editable = false;
  @Input() refillable = false;
  @Input() focusResponse = false;

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
  valueChange() {
    this.onChange.emit();
  }

}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Option } from 'src/app/models/brief/option';

@Component({
  selector: 'app-option-checkbox',
  templateUrl: './option-checkbox.component.html',
  styleUrls: ['./option-checkbox.component.scss']
})
export class OptionCheckboxComponent implements OnInit {
  // Public vars
  public showContextualIcon = false;
  // Inputs
  @Input() option: Option;
  @Input() checked = false;
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
    if (this.refillable) {
      if (this.editable) {
        const target = $($event.target);
        if (target.closest('.brief-checkbox-option-content').length === 0) {
          this.onToggleSelection.emit(this.option);
        }
      } else {
        this.onToggleSelection.emit(this.option);
      }
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
  // On show contextual icon
  onShowContextualIcon(show) {
    this.showContextualIcon = show;
  }
  onChangeIco(icon) {
    this.option.icon = icon;
    this.onChange.emit();
  }
}

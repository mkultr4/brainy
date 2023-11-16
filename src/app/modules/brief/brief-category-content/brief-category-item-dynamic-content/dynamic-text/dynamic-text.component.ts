import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dynamic-text',
  templateUrl: './dynamic-text.component.html',
  styleUrls: ['./dynamic-text.component.scss'],
  host: {
    'class': 'dynamic-editor-default dynamic-editor-text'
  }
})
export class DynamicTextComponent implements OnInit {
  // Public  vars
  focusText = false;
  // Input
  @Input() text: string = '';
  @Input() editable = false;
  @Input() focused = false;
  // Outputs
  @Output() onFocus = new EventEmitter();
  @Output() onChangeText = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  // On change text
  onChangeTextFn() {
    this.onChangeText.emit(this.text);
  }
  // On focus
  onFocusText(focus) {
    this.focusText = focus;
    this.onFocus.emit();
  }

}

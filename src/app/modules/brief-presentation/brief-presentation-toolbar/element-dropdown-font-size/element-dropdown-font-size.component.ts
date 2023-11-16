import { Component, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-element-dropdown-font-size',
  templateUrl: './element-dropdown-font-size.component.html',
  styleUrls: ['./element-dropdown-font-size.component.scss']
})
export class ElementDropdownFontSizeComponent implements OnInit {
  // Outputs
  @Output() onSetFontSize = new EventEmitter();
  fontSizes = [12,18,20,36,48,60]
  constructor() { }

  ngOnInit() {
  }
  setFontSize($event,f){
    this.onSetFontSize.emit(f);
  }

}

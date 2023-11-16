import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { GeneralService } from 'src/app/services/general/general.service';

@Component({
  selector: 'app-element-dropdown-colors',
  templateUrl: './element-dropdown-colors.component.html',
  styleUrls: ['./element-dropdown-colors.component.scss']
})
export class ElementDropdownColorsComponent implements OnInit {
  // Public vars
  public colors: Array<string>;
  public cmd = 'forecolor';
  // Input
  @Input() focusedType = undefined;
  // Outputs
  @Output() onSetBackcolor = new EventEmitter();
  @Output() onSetForecolor = new EventEmitter();
  @Output() onRemoveFormat = new EventEmitter();
  constructor(
    private _generalService: GeneralService,
  ) { }

  ngOnInit() {
  }
  ngAfterContentInit() {
    this.colors = this._generalService.getColors();
  }
  // Change cmd
  changeCmd($event, cmd) {
    $event.preventDefault();
    $event.stopPropagation();
    this.cmd = cmd;
  }
  // Excecute
  execute($event, cmd: string, arg: string) {
    $event.preventDefault();
    $event.stopPropagation();
    if (cmd === 'forecolor') {
      this.setForeColorStyle(arg);
    } else if (cmd === 'backcolor') {
      this.setBackgroundStyle(arg);
    } else if (cmd === 'removeFormat') {
      this.removeFormat(arg);
    }
  }
  // Set fore color
  setForeColorStyle(color) {
    this.onSetForecolor.emit(color);
  }
  // Set backgorund color
  setBackgroundStyle(color) {
    this.onSetBackcolor.emit(color);
  }
  // Remove format
  removeFormat(arg) {
    this.onRemoveFormat.emit(arg);    
  }
}

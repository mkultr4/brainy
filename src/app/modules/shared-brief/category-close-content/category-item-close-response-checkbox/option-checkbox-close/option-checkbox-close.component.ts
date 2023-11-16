import { Component, OnInit, Input } from '@angular/core';
import { Option } from 'src/app/models/brief/option';

@Component({
  selector: 'app-option-checkbox-close',
  templateUrl: './option-checkbox-close.component.html',
  styleUrls: ['./option-checkbox-close.component.scss']
})
export class OptionCheckboxCloseComponent implements OnInit {
  @Input() option: Option;
  @Input() checked = false;
  constructor() { }

  ngOnInit() {
  }

}

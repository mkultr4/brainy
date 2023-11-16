import { Component, OnInit, Input } from '@angular/core';
import { Option } from 'src/app/models/brief/option';

@Component({
  selector: 'app-option-radio-close',
  templateUrl: './option-radio-close.component.html',
  styleUrls: ['./option-radio-close.component.scss']
})
export class OptionRadioCloseComponent implements OnInit {
  @Input() option: Option;
  @Input() selected = false;
  constructor() { }

  ngOnInit() {
  }

}

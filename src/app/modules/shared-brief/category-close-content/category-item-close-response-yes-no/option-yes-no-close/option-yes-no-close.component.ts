import { Component, OnInit, Input } from '@angular/core';
import { Option } from 'src/app/models/brief/option';

@Component({
  selector: 'app-option-yes-no-close',
  templateUrl: './option-yes-no-close.component.html',
  styleUrls: ['./option-yes-no-close.component.scss']
})
export class OptionYesNoCloseComponent implements OnInit {
  @Input() option: Option;
  @Input() checked = false;
  
  constructor() { }

  ngOnInit() {
  }

}

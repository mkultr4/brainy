import { Component, OnInit, Input } from '@angular/core';
import { Option } from 'src/app/models/brief/option';

@Component({
  selector: 'app-option-date-close',
  templateUrl: './option-date-close.component.html',
  styleUrls: ['./option-date-close.component.scss']
})
export class OptionDateCloseComponent implements OnInit {
  @Input() option: Option;
  constructor() { }

  ngOnInit() {
  }

}

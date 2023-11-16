import { Component, OnInit, Input } from '@angular/core';
import { Option } from 'src/app/models/brief/option';

@Component({
  selector: '[app-option-list-close]',
  templateUrl: './option-list-close.component.html',
  styleUrls: ['./option-list-close.component.scss']
})
export class OptionListCloseComponent implements OnInit {
  @Input() option: Option;

  constructor() { }

  ngOnInit() {
  }

}

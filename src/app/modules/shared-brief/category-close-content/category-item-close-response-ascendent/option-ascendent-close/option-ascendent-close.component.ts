import { Component, OnInit, Input } from '@angular/core';
import { Option } from 'src/app/models/brief/option';

@Component({
  selector: 'app-option-ascendent-close',
  templateUrl: './option-ascendent-close.component.html',
  styleUrls: ['./option-ascendent-close.component.scss']
})
export class OptionAscendentCloseComponent implements OnInit {

  @Input() option: Option;
  
  constructor() { }

  ngOnInit() {
  }

}

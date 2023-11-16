import { Component, OnInit, Input } from '@angular/core';
import { Option } from 'src/app/models/brief/option';

@Component({
  selector: 'app-option-assessment-number-close',
  templateUrl: './option-assessment-number-close.component.html',
  styleUrls: ['./option-assessment-number-close.component.scss']
})
export class OptionAssessmentNumberCloseComponent implements OnInit {
  @Input() option: Option;
  @Input() checked = false;
  @Input() number;
  constructor() { }

  ngOnInit() {
  }

}

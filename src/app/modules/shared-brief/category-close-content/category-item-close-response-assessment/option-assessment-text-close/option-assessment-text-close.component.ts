import { Component, OnInit, Input } from '@angular/core';
import { Option } from 'src/app/models/brief/option';

@Component({
  selector: 'app-option-assessment-text-close',
  templateUrl: './option-assessment-text-close.component.html',
  styleUrls: ['./option-assessment-text-close.component.scss']
})
export class OptionAssessmentTextCloseComponent implements OnInit {
  @Input() option: Option;
 @Input() checked = false;
  constructor() { }

  ngOnInit() {
  }

}

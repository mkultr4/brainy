import { Component, OnInit, Input } from '@angular/core';
import { Giveback } from 'src/app/models/brief/giveback';

@Component({
  selector: 'app-brief-giveback-close-block',
  templateUrl: './brief-giveback-close-block.component.html',
  styleUrls: ['./brief-giveback-close-block.component.scss'],
  host: {
    'class': 'brief-giveback-close-block'
  }
})
export class BriefGivebackCloseBlockComponent implements OnInit {
  // Inputs
  @Input() giveback: Giveback;
  constructor() { }

  ngOnInit() {
  }

}

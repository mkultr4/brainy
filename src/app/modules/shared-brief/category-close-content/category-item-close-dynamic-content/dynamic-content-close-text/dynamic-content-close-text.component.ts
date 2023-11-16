import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dynamic-content-close-text',
  templateUrl: './dynamic-content-close-text.component.html',
  styleUrls: ['./dynamic-content-close-text.component.scss'],
  host: {
    'class': 'dynamic-editor-default dynamic-editor-text'
  }
})
export class DynamicContentCloseTextComponent implements OnInit {
  @Input() text:string;
  constructor() { }

  ngOnInit() {
  }

}

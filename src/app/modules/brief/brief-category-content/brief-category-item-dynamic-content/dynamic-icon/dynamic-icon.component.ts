import { Component, OnInit, Input } from '@angular/core';
import { Icon } from 'src/app/models/icons/Icon';

@Component({
  selector: 'app-dynamic-icon',
  templateUrl: './dynamic-icon.component.html',
  styleUrls: ['./dynamic-icon.component.scss'],
  host: {
    'class': 'dynamic-editor-default dynamic-editor-icon'
  }
})
export class DynamicIconComponent implements OnInit {
  @Input() icon: Icon;
  @Input() focused = false;
  
  constructor() { }

  ngOnInit() {
  }

}

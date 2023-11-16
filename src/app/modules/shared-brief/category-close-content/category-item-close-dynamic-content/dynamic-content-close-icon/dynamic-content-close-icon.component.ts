import { Component, OnInit, Input } from '@angular/core';
import { Icon } from 'src/app/models/icons/Icon';

@Component({
  selector: 'app-dynamic-content-close-icon',
  templateUrl: './dynamic-content-close-icon.component.html',
  styleUrls: ['./dynamic-content-close-icon.component.scss'],
  host: {
    'class': 'dynamic-editor-default dynamic-editor-icon'
  }
})
export class DynamicContentCloseIconComponent implements OnInit {
  @Input() icon:Icon;
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Core } from '../../../models/cores/core';

@Component({
  selector: 'app-dashboard-box-preview',
  templateUrl: './dashboard-box-preview.component.html',
  styleUrls: ['./dashboard-box-preview.component.scss']
})
export class DashboardBoxPreviewComponent implements OnInit {
  @Input() core: Core;
  @Input() showDelete;
   constructor() { }

  ngOnInit() {
  }

}

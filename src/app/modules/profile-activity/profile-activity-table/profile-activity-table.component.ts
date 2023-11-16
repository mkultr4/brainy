import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-profile-activity-table',
  templateUrl: './profile-activity-table.component.html',
  styleUrls: ['./profile-activity-table.component.scss']
})
export class ProfileActivityTableComponent implements OnInit {
  @Input() audits;
  constructor() { }
  ngOnInit() { }

}

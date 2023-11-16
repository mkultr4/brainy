import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-left-sidenav-empty',
  templateUrl: './feedback-left-sidenav-empty.component.html',
  styleUrls: ['./feedback-left-sidenav-empty.component.scss']
})
export class FeedbackLeftSidenavEmptyComponent implements OnInit {
  @Input() compressed;
  constructor() { }

  ngOnInit() {
  }

}

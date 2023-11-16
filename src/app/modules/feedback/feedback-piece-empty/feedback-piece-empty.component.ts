import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-feedback-piece-empty',
  templateUrl: './feedback-piece-empty.component.html',
  styleUrls: ['./feedback-piece-empty.component.scss']
})
export class FeedbackPieceEmptyComponent implements OnInit {
  public feedbackAction = 'pin';
  public zoom = 100;
  public urlQuery = '';
  @Input() leftSidenavCompressed: boolean;
  @Input() rightSidenavCompressed: boolean;
  constructor() { }

  ngOnInit() {
  }

}

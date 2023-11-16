import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Feedback } from 'src/app/models/feedback/feedback';

@Component({
  selector: '[app-feedback-associated-header]',
  templateUrl: './feedback-associated-header.component.html',
  styleUrls: ['./feedback-associated-header.component.scss']
})
export class FeedbackAssociatedHeaderComponent implements OnInit {
  @Input() feedback: Feedback;
  @Output() headerOnMinimze = new EventEmitter();
  @Output() headerOnClose = new EventEmitter();
  constructor(
  ) { }

  ngOnInit() {
  }

  close(){
    this.headerOnClose.emit();
  }
  minimize(){
    this.headerOnMinimze.emit();
  }
}

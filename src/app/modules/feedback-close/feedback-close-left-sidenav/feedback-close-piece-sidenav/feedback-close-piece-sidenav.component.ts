import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Piece } from '../../../../models/feedback/piece';

@Component({
  selector: 'app-feedback-close-piece-sidenav,[app-feedback-close-piece-sidenav]',
  templateUrl: './feedback-close-piece-sidenav.component.html',
  styleUrls: ['./feedback-close-piece-sidenav.component.scss']
})
export class FeedbackClosePieceSidenavComponent implements OnInit {
  // Input
  @Input() piece: Piece;
  @Input() pieceShow: Piece;
  // Output
  @Output() pieceOnSelect = new EventEmitter();

  constructor() { }
  // on select pieces
  select() {
    this.pieceOnSelect.emit(this.piece);
  }
  ngOnInit() {
  }

}

import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Piece } from 'src/app/models/feedback/piece';

@Component({
  selector: '[app-feedback-associated-piece-sidenav]',
  templateUrl: './feedback-associated-piece-sidenav.component.html',
  styleUrls: ['./feedback-associated-piece-sidenav.component.scss']
})
export class FeedbackAssociatedPieceSidenavComponent implements OnInit {

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

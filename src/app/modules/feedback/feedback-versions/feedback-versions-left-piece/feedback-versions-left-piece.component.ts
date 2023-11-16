import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Piece } from '../../../../models/feedback/piece';



@Component({
  selector: 'app-feedback-versions-left-piece,[app-feedback-versions-left-piece]',
  templateUrl: './feedback-versions-left-piece.component.html',
  styleUrls: ['./feedback-versions-left-piece.component.scss']
})
export class FeedbackVersionsLeftPieceComponent implements OnInit {
  // Inputs
  @Input() pieceShow: Piece;
  @Input() compareVersion;
  @Input() piece: Piece;
  @Output() onSelect = new EventEmitter();
  constructor() { }
  ngOnInit() {
  }
  select() {
    this.onSelect.emit(this.piece);
  }
}

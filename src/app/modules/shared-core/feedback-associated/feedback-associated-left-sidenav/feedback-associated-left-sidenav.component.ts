import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Piece } from 'src/app/models/feedback/piece';

@Component({
  selector: 'app-feedback-associated-left-sidenav',
  templateUrl: './feedback-associated-left-sidenav.component.html',
  styleUrls: ['./feedback-associated-left-sidenav.component.scss']
})
export class FeedbackAssociatedLeftSidenavComponent implements OnInit {
  // Inputs
  @Input() pieces: Piece[];
  @Input() pieceShow: Piece;
  @Input() compressed = false;
  @Input() paginationConfig: any;
  // Outputs
  @Output() onSelectPiece = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  selectPiece(piece: Piece) {
    this.onSelectPiece.emit(piece);
  }

}

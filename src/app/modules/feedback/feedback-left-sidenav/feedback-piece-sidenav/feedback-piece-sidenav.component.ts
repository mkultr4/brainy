import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Piece } from '../../../../models/feedback/piece';

@Component({
  selector: 'app-feedback-piece-sidenav,[app-feedback-piece-sidenav]',
  templateUrl: './feedback-piece-sidenav.component.html',
  styleUrls: ['./feedback-piece-sidenav.component.scss']
})
export class FeedbackPieceSidenavComponent implements OnInit {
  @Input() piece: Piece;
  @Input() pieceShow: Piece;
  @Input() editable: boolean;
  @Output() pieceOnSelect = new EventEmitter();
  @Output() pieceOnDelete = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }
  mouseDownDelete($event) {
    $event.preventDefault();
    $event.stopPropagation();
  }
  select() {
    this.pieceOnSelect.emit(this.piece);
  }
  delete(){
    this.pieceOnDelete.emit(this.piece);
  }

}

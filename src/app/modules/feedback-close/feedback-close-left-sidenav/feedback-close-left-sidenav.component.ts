import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Piece } from '../../../models/feedback/piece';
import { WorkflowService } from '../../../services/workflow/workflow.service';


@Component({
  selector: 'app-feedback-close-left-sidenav,[app-feedback-close-left-sidenav]',
  templateUrl: './feedback-close-left-sidenav.component.html',
  styleUrls: ['./feedback-close-left-sidenav.component.scss']
})
export class FeedbackCloseLeftSidenavComponent implements OnInit {
  // Inputs
  @Input() pieces: Piece[];
  @Input() pieceShow: Piece;
  @Input() compressed = false;
  @Input() paginationConfig: any;
  // Outputs
  @Output() onSelectPiece = new EventEmitter();
  constructor(
    private _workflowService: WorkflowService
  ) { }

  ngOnInit() {
  }

  selectPiece(piece: Piece) {
    this.onSelectPiece.emit(piece);
  }
  // Compress
  compress() {
    this._workflowService.compressLeftSidenav(!this.compressed);
  }

}

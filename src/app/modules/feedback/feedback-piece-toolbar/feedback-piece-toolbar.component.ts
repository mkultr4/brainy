import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FeedbackWorkflowService } from '../services/feedback-workflow.service';
import { CommentThreadComunicationInfo } from '../../comment-thread/services/comment-comunication.service';


@Component({
  selector: 'app-feedback-piece-toolbar',
  templateUrl: './feedback-piece-toolbar.component.html',
  styleUrls: ['./feedback-piece-toolbar.component.scss']
})
export class FeedbackPieceToolbarComponent implements OnInit {
  // Input
  @Input() pieceType = 'image';
  @Input() rightSidenavCompressed = false;
  @Input() leftSidenavCompressed = false;
  @Input() zoom = 100;
  @Input() feedbackAction;
  @Input() popupInformation: CommentThreadComunicationInfo;
  // Outputs
  @Output() toolbarOnChangeAction = new EventEmitter();

  constructor(private _feedbackWorkflowService: FeedbackWorkflowService) { }

  ngOnInit() {
  }
  /**
   * Set feedback action
   * @param $event 
   * @param action 
   */
  setFeedbackAction($event, action: string) {
    if (action !== 'pin') {
      if (this.popupInformation.show) {
        $event.preventDefault();
        $event.stopPropagation();
        // Change shape
        if (this.popupInformation.commentThread.type !== action) {
          this.popupInformation.commentThread.type = action;
        }
      }
    }
    this.toolbarOnChangeAction.emit(action);
  }

  // Zoom increase
  increaseZoom() {
    if (this.zoom < 300) {
      this.zoom += 10;
    }
    // this.onChangeZoom.emit(this.zoom);
    this._feedbackWorkflowService.setZoom(this.zoom);
  }
  // Zoom decrease zoom
  decreaseZoom() {
    if (this.zoom > 80) {
      this.zoom -= 10;
    }
    // this.onChangeZoom.emit(this.zoom);
    this._feedbackWorkflowService.setZoom(this.zoom);
  }

}

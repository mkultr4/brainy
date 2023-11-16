import { Component, OnInit, AfterContentInit, Input, ViewChild, ElementRef, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Piece } from '../../../models/feedback/piece';
import { ISubscription } from 'rxjs/Subscription';
import { FeedbackWorkflowService } from '../services/feedback-workflow.service';
import { ParticipantType } from '../../../models/participants/participant-type';
import { CommentThreadStatus } from '../../../models/comments/comment-thread-status';
import { CoreWorkflowService } from '../../shared-core/services/core-workflow.service';
import { ModalChangeFeedbackPieceComponent } from '../modal-change-feedback-piece/modal-change-feedback-piece.component';

@Component({
  selector: 'app-feedback-piece-header',
  templateUrl: './feedback-piece-header.component.html',
  styleUrls: ['./feedback-piece-header.component.scss']
})
export class FeedbackPieceHeaderComponent implements OnInit, AfterContentInit, OnDestroy {
  public isShowBrief = false;
  public isShowMeetingNote = false;
  public paddingLeft = 0;
  public paddingRight = 0;
  public pieceWidth = 0;
  public maxWidth = 'auto';
  public _zoom = 100;
  // Subscriptions
  public subcriptionPieceWidth: ISubscription;
  public subListBrief: ISubscription;
  public subListMeetingNote: ISubscription;
  // Inputs
  @Input() piece: Piece;
  @Input() commentThreadStatuses: Array<CommentThreadStatus>;
  @Input() participantTypes: Array<ParticipantType>;
  @Input() editable: boolean;
  @Input() rightSidenavCompressed: boolean;
  @Input() leftSidenavCompressed: boolean;
  @Input() forceError = true;
  @Input() set zoom(zoom) {
    this._zoom = zoom;
    this.calcuateRatio();
  }
  // Ouput
  @Output() headerWarningFormat = new EventEmitter();
  // View child
  @ViewChild('modalChange') modalChange: ModalChangeFeedbackPieceComponent;
  constructor(
    private _feedbackWorkflowService: FeedbackWorkflowService,
    private _coreWorkflowService: CoreWorkflowService
  ) {
  }

  ngOnInit() {
  }
  ngAfterContentInit() {
    this.subcriptionPieceWidth = this._feedbackWorkflowService.pieceWidth.subscribe(width => {
      this.pieceWidth = width;
      this.calcuateRatio();

    });
    this.subListBrief = this._coreWorkflowService.sidenavListBrief.subscribe(show => {
      this.isShowBrief = show;
    });
    this.subListMeetingNote = this._coreWorkflowService.sidenavListMeetingNote.subscribe(show => {
      this.isShowMeetingNote = show;
    });
  }

  calcuateRatio() {
    if (this.pieceWidth > 0) {
      const pieceWidthCalc = (this.pieceWidth * (this._zoom / 100));
      const leftWidth = this.leftSidenavCompressed ? 0 : 240;
      const rightWidth = this.rightSidenavCompressed ? 80 : 350;
      const padding = 40;
      const containerWidth = window.innerWidth - (leftWidth + rightWidth + padding);
      if (containerWidth >= pieceWidthCalc) {
        const pieceWidthThin = containerWidth * 0.5;
        if (pieceWidthCalc <= pieceWidthThin) {
          this.maxWidth = pieceWidthThin + 'px';
        } else {
          this.maxWidth = pieceWidthCalc + 'px';
        }
      } else {
        this.maxWidth = '100%';
      }
    } else {

      this.maxWidth = 'calc(100% - 40px)';


    }
  }

  // Change piece
  changePiece() {
    this.modalChange.openModal();
  }
  // Show sidenav of brief
  showListBrief() {
    this._coreWorkflowService.showSidenavListBrief(true);
  }
  // Show sidenav of draft
  showListMeetingNote() {
    this._coreWorkflowService.showSidenavListMeetingNote(true);
  }
  onChangeImage(piece: Piece) {
    console.log(piece);
    setTimeout(() => {
      this._feedbackWorkflowService.showPiece(piece);
    }, 1500)
     
  }
  showModalWarning(data){
    this.headerWarningFormat.emit(data);
  }
  // On destroy
  ngOnDestroy() {
    // Show sidenav
    if (this.subListMeetingNote) {
      this.subListMeetingNote.unsubscribe();
    }
    if (this.subListBrief) {
      this.subListBrief.unsubscribe();
    }
    if (this.subcriptionPieceWidth) {
      this.subcriptionPieceWidth.unsubscribe();
    }
  }

}

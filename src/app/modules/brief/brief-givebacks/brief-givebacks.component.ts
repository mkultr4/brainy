import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Giveback } from 'src/app/models/brief/giveback';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { ParticipantType } from 'src/app/models/participants/participant-type';
import { CommentThreadStatus } from 'src/app/models/comments/comment-thread-status';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { BriefWorkflowService } from '../services/brief-workflow.service';

@Component({
  selector: 'app-brief-givebacks',
  templateUrl: './brief-givebacks.component.html',
  styleUrls: ['./brief-givebacks.component.scss']
})
export class BriefGivebacksComponent implements OnInit, AfterViewInit {
  // Services
  private _briefService;
  // Inputs
  @Input() givebacks = new Array<Giveback>();
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() commentThreadStatuses: CommentThreadStatus[];
  @Input() participantTypes: ParticipantType[];
  // Outputs
  @Output() givebackDelete = new EventEmitter();
  @Output() givebackEdit = new EventEmitter();
  @Output() givebackReply = new EventEmitter();
  @Output() givebackOnRemoveReply = new EventEmitter();
  @Output() onReadReplies = new EventEmitter();
  


  // Constructor
  constructor(
    private _briefStrategyService: BriefStrategyService,
    private _briefWorkflowService : BriefWorkflowService
  ) {
    this._briefService = this._briefStrategyService.getService();
  }
  // Init
  ngOnInit() {
  }
  // After view init
  ngAfterViewInit() {
    setTimeout(()=>{
      this.onReadReplies.emit();
    });
    
  }

  // On delete giveback
  onDeleteGiveback(giveback: Giveback) {
    this._briefService.deleteGiveback(giveback).subscribe((resp) => {
      this.givebackDelete.emit(giveback);
    });
  }
  // On edit giveback
  onEditGiveback(giveback: Giveback) {
    this.givebackEdit.emit(giveback);
  }
  onReplyGiveback(giveback: Giveback) {
    this.givebackReply.emit(giveback);
  }
  onDeleteReplyGiveback(giveback: Giveback) {
    this._briefService.deleteReplyGiveback(giveback).subscribe((resp) => {
      this.givebackOnRemoveReply.emit(giveback);
    });
  }
  // Go to question
  onGoToQuestion(giveback: Giveback){
    this._briefWorkflowService.onShowBriefCategoryItemId(giveback.briefCategoryId, giveback.briefCategoryItemId);
  }


}

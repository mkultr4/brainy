import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ParticipantType } from 'src/app/models/participants/participant-type';
import { CommentThreadStatus } from 'src/app/models/comments/comment-thread-status';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { Giveback } from 'src/app/models/brief/giveback';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';
import { DATEPICKER_CONFIG } from 'src/app/config/app.config';
import { BriefWorkflowService } from '../services/brief-workflow.service';

@Component({
  selector: 'app-brief-giveback-pitch',
  templateUrl: './brief-giveback-pitch.component.html',
  styleUrls: ['./brief-giveback-pitch.component.scss']
})
export class BriefGivebackPitchComponent implements OnInit {
  // Services
  private _briefService;
  public datePickerOptionsGivebacks: any = Object.assign({}, DATEPICKER_CONFIG);
  public hasChangedDate = false;
  // Inputs
  @Input() givebacks = new Array<Giveback>();
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() commentThreadStatuses: CommentThreadStatus[];
  @Input() participantTypes: ParticipantType[];
  @Input() workflowMenu = false;
  @Input() isTemplate = true;
  @Input() dateOfGivebacks;
  @Input() canEditDate = false;
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
    // Date givebacks
    this.datePickerOptionsGivebacks.container = 'body';
    this.datePickerOptionsGivebacks.format = 'dd/mm/yyyy';
    this.datePickerOptionsGivebacks.min = new Date();
    this.datePickerOptionsGivebacks.onClose = () => {
      if (this.hasChangedDate) {
        this._briefService.updateDates(this.dateOfGivebacks, null, null).subscribe(resp => {
          this.hasChangedDate = false;
        });
      }
    }
  }
  // Init
  ngOnInit() {
  }
  // After view init
  ngAfterViewInit() {
    this.onReadReplies.emit();
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
  // On change date
  onChangeDate(date) {
    this.hasChangedDate = true;
  }
  // Go to question
  onGoToQuestion(giveback: Giveback){
    this._briefWorkflowService.onShowBriefCategoryItemId(giveback.briefCategoryId, giveback.briefCategoryItemId);
  }
}

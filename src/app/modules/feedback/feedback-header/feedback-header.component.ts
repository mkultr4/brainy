import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { Feedback } from '../../../models/feedback/feedback';
import { CoreStatus } from '../../../models/cores/core-status';
import { WorkflowHeaderComponent } from '../../shared-core/workflow-header/workflow-header.component';
import { DownloadProjectService } from '../../shared-core/services/download-project.service';
import { Router, RouterModule } from '@angular/router';
import { ModalCancelCoreComponent } from '../../shared-core/modal-cancel-core/modal-cancel-core.component';
import { ModalDeleteCoreComponent } from '../../shared-core/modal-delete-core/modal-delete-core.component';
import { ModalDisapproveCoreComponent } from '../../shared-core/modal-disapprove-core/modal-disapprove-core.component';
import { RoutingStateService } from '../../../services/routing-state.service';
import { environment } from '../../../../environments/environment';
import { ModalShareParticipantsComponent } from '../../shared-participants/modal-share-participants/modal-share-participants.component';
import { CommentThreadSidenavSearchComponent } from '../../comment-thread/comment-thread-sidenav-search/comment-thread-sidenav-search.component';
import { CommentThreadStatus } from '../../../models/comments/comment-thread-status';
import { CommentThreadType } from '../../../models/comments/comment-thread-type';
import { FeedbackWorkflowService } from '../services/feedback-workflow.service';
import { Piece } from '../../../models/feedback/piece';

@Component({
  selector: 'app-feedback-header,[app-feedback-header]',
  templateUrl: './feedback-header.component.html',
  styleUrls: ['./feedback-header.component.scss']
})
export class FeedbackHeaderComponent implements OnInit {
  public coreInfo = '';
  public approveAndShare = false;
  @Input() feedback: Feedback;
  @Input() pieceShow: Piece;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() coreStatuses = [];
  @Input() editable = false;
  @Input() canShare = false;
  @Input() canApprove = false;
  @Input() isApprover = false;
  @Input() isAdmin = false;
  @Input() commentThreadStatuses: Array<CommentThreadStatus>;
  @Input() commentThreadTypes: Array<CommentThreadType>;
  // Outputs
  @Output() headerOnApprove = new EventEmitter();
  @Output() headerOnDisapprove = new EventEmitter();
  @Output() headerOnChangeStatus = new EventEmitter();
  // View childs
  @ViewChild(WorkflowHeaderComponent) workflowHeaderComponent: WorkflowHeaderComponent;
  @ViewChild('modalCancel') modalCancel: ModalCancelCoreComponent;
  @ViewChild('modalDelete') modalDelete: ModalDeleteCoreComponent;
  @ViewChild('modalDisapprove') modalDisapprove: ModalDisapproveCoreComponent;
  @ViewChild('modalShare') modalShare: ModalShareParticipantsComponent;
  @ViewChild('sidenavSearchComments') sidenavSearchComments: CommentThreadSidenavSearchComponent;

  constructor(
    private _downloadProjectService: DownloadProjectService,
    private _feedbackWorkflowService: FeedbackWorkflowService,
    private _router: Router,
    private _routingState: RoutingStateService
  ) {
  }

  ngOnInit() {
  }

  goBack() {
    if (environment.envName === 'design') {
      this._router.navigate(['/index']);
    } else {
      this._router.navigate(['/dashboard']);
    }
  }

  workflowOnChangeStatus(status: CoreStatus) {
    this.headerOnChangeStatus.emit(status);
  }
  workflowOnDisapprove() {
    if (this.feedback.status.id !== 'disapproved') {
      this.modalDisapprove.openModal();
    }
  }
  modalOnDisapprove(status: CoreStatus) {
    this.headerOnChangeStatus.emit(status);
  }
  workflowOnApprove() {
    this.headerOnApprove.emit();
  }

  workflowOnShare() {

  }
  /**
   * Edit title
   */
  editTitle() {
    this.workflowHeaderComponent.editTitle();
  }
  share() {
    this.modalShare.showModal();
  }

  delete() {
    this.modalDelete.openModal();
  }
  download() {
    this._downloadProjectService.downloadProjectShow(this.feedback);
  }
  searchComments() {
    this.sidenavSearchComments.showSidenav();
  }
  showVersions() {
    this._feedbackWorkflowService.showVersions(this.pieceShow, true);
  }
  cancel() {
    this.modalCancel.openModal();
  }
  /**
   * On cancel modal
   */
  modalOnCancel() {
    setTimeout(() => {
      this._router.navigate(['/dashboard']);
    }, 200);
  }
  modalOnDelete() {
    setTimeout(() => {
      this._router.navigate(['/dashboard']);
    }, 200);
  }

}

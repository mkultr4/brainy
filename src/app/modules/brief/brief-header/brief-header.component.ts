import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { WorkflowHeaderComponent } from '../../shared-core/workflow-header/workflow-header.component';
import { ModalDeleteCoreComponent } from '../../shared-core/modal-delete-core/modal-delete-core.component';
import { ModalDisapproveCoreComponent } from '../../shared-core/modal-disapprove-core/modal-disapprove-core.component';
import { ModalShareParticipantsComponent } from '../../shared-participants/modal-share-participants/modal-share-participants.component';
import { CommentThreadSidenavSearchComponent } from '../../comment-thread/comment-thread-sidenav-search/comment-thread-sidenav-search.component';
import { DownloadProjectService } from '../../shared-core/services/download-project.service';
import { CoreStrategyService } from 'src/app/services/cores/core-strategy.service';
import { Router } from '@angular/router';
import { RoutingStateService } from 'src/app/services/routing-state.service';
import { CommentThreadType } from 'src/app/models/comments/comment-thread-type';
import { CommentThreadStatus } from 'src/app/models/comments/comment-thread-status';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { Brief } from 'src/app/models/brief/brief';
import { environment } from 'src/environments/environment';
import { CoreStatus } from 'src/app/models/cores/core-status';
import { ModalCancelCoreComponent } from '../../shared-core/modal-cancel-core/modal-cancel-core.component';

@Component({
  selector: '[app-brief-header]',
  templateUrl: './brief-header.component.html',
  styleUrls: ['./brief-header.component.scss']
})
export class BriefHeaderComponent implements OnInit {
  // Services
  private _coreService;
  //  Inputs
  @Input() brief: Brief;
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
  @Output() headerOnShare = new EventEmitter();
  // View childs
  @ViewChild(WorkflowHeaderComponent) workflowHeaderComponent: WorkflowHeaderComponent;
  @ViewChild('modalDelete') modalDelete: ModalDeleteCoreComponent;
  @ViewChild('modalCancel') modalCancel: ModalCancelCoreComponent;
  @ViewChild('modalDisapprove') modalDisapprove: ModalDisapproveCoreComponent;
  @ViewChild('modalShare') modalShare: ModalShareParticipantsComponent;
  @ViewChild('sidenavSearchComments') sidenavSearchComments: CommentThreadSidenavSearchComponent;
  constructor(
    private _downloadProjectService: DownloadProjectService,
    private _coreStrategyService: CoreStrategyService,
    private _router: Router,
    private _routingState: RoutingStateService
  ) {
    this._coreService = this._coreStrategyService.getService();
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
    if (this.brief.status.id !== 'disapproved') {
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
  cancel() {
    this.modalCancel.openModal();
  }
  delete() {
    this.modalDelete.openModal();
  }
  download() {
    this._downloadProjectService.downloadProjectShow(this.brief);
  }
  searchComments() {
    this.sidenavSearchComments.showSidenav();
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
  // Close modal share
  onCloseModalShare(invitations) {
    console.log(invitations);
    if (invitations && invitations.length > 0) {
      this.headerOnShare.emit(invitations);
    }
  }



}

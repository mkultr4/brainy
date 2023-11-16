import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { BriefPresentation } from 'src/app/models/brief-presentation/brief-presentation';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { CommentThreadStatus } from 'src/app/models/comments/comment-thread-status';
import { CommentThreadType } from 'src/app/models/comments/comment-thread-type';
import { WorkflowHeaderComponent } from '../../shared-core/workflow-header/workflow-header.component';
import { ModalCancelCoreComponent } from '../../shared-core/modal-cancel-core/modal-cancel-core.component';
import { ModalDeleteCoreComponent } from '../../shared-core/modal-delete-core/modal-delete-core.component';
import { ModalDisapproveCoreComponent } from '../../shared-core/modal-disapprove-core/modal-disapprove-core.component';
import { ModalShareParticipantsComponent } from '../../shared-participants/modal-share-participants/modal-share-participants.component';
import { CommentThreadSidenavSearchComponent } from '../../comment-thread/comment-thread-sidenav-search/comment-thread-sidenav-search.component';
import { DownloadProjectService } from '../../shared-core/services/download-project.service';
import { Router } from '@angular/router';
import { RoutingStateService } from 'src/app/services/routing-state.service';
import { environment } from 'src/environments/environment.design';
import { CoreStatus } from 'src/app/models/cores/core-status';

@Component({
  selector: '[app-brief-presentation-header]',
  templateUrl: './brief-presentation-header.component.html',
  styleUrls: ['./brief-presentation-header.component.scss']
})
export class BriefPresentationHeaderComponent implements OnInit {
  public coreInfo = '';
  public approveAndShare = false;
  @Input() briefPresentation: BriefPresentation;
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
    if (this.briefPresentation.status.id !== 'disapproved') {
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
    this._downloadProjectService.downloadProjectShow(this.briefPresentation);
  }
  searchComments() {
    this.sidenavSearchComments.showSidenav();
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

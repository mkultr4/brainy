import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MeetingNote } from '../../../models/meeting-note/meeting-note';
import { CommentThreadType } from '../../../models/comments/comment-thread-type';
import { CommentThreadStatus } from '../../../models/comments/comment-thread-status';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { CommentThreadSidenavSearchComponent } from '../../comment-thread/comment-thread-sidenav-search/comment-thread-sidenav-search.component';
import { ModalShareParticipantsComponent } from '../../shared-participants/modal-share-participants/modal-share-participants.component';
import { ModalDisapproveCoreComponent } from '../../shared-core/modal-disapprove-core/modal-disapprove-core.component';
import { ModalDeleteCoreComponent } from '../../shared-core/modal-delete-core/modal-delete-core.component';
import { environment } from '../../../../environments/environment';
import { DownloadProjectService } from '../../shared-core/services/download-project.service';
import { Router } from '@angular/router';
import { RoutingStateService } from '../../../services/routing-state.service';
import { CoreStatus } from '../../../models/cores/core-status';
import { ModalCancelMeetingNoteComponent } from '../../shared-core/modal-cancel-meeting-note/modal-cancel-meeting-note.component';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';
import { MeetingNoteWorkflowHeaderComponent } from '../meeting-note-workflow-header/meeting-note-workflow-header.component';

@Component({
  selector: 'app-meeting-note-header,[app-meeting-note-header]',
  templateUrl: './meeting-note-header.component.html',
  styleUrls: ['./meeting-note-header.component.scss']
})
export class MeetingNoteHeaderComponent implements OnInit {
  // Services
  private _coreService;
  //  Inputs
  @Input() meetingNote: MeetingNote;
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
  @ViewChild(MeetingNoteWorkflowHeaderComponent) workflowHeaderComponent: MeetingNoteWorkflowHeaderComponent;
  @ViewChild('modalCancel') modalCancel: ModalCancelMeetingNoteComponent;
  @ViewChild('modalDelete') modalDelete: ModalDeleteCoreComponent;
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
    if (this.meetingNote.status.id !== 'disapproved') {
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
    if (this.meetingNote.meetingNoteType.key === 'scheduled') {
      this.workflowHeaderComponent.makeHeaderEditable();
    } else {
      this.workflowHeaderComponent.editTitle();
    }

  }
  share() {
    this.modalShare.showModal();
  }

  delete() {
    this.modalDelete.openModal(this.meetingNote);
  }
  download() {
    this._downloadProjectService.downloadProjectShow(this.meetingNote);
  }
  searchComments() {
    this.sidenavSearchComments.showSidenav();
  }
  cancel() {
    this.modalCancel.openModal(this.meetingNote);
  }
  /**
   * On cancel modal
   */
  modalOnCancel() {
    setTimeout(() => {
      this._router.navigate(['/dashboard']);
    }, 200);
  }
  modalOnProgram() {
    setTimeout(() => {
      this._router.navigate(['/dashboard']);
    }, 200);
  }
  modalOnDelete() {
    setTimeout(() => {
      this._router.navigate(['/dashboard']);
    }, 200);
  }
  /**
   * Resume meeting note
   */
  resume() {
    this._coreService.resumeCore(this.meetingNote).subscribe(resumeCore => {
      this.headerOnChangeStatus.emit(resumeCore.status);
    });
  }

}

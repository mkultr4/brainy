import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { BriefTemplate } from 'src/app/models/brief/brief-template';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { ModalShareParticipantsComponent } from '../../shared-participants/modal-share-participants/modal-share-participants.component';
import { WorkflowHeaderComponent } from '../../shared-core/workflow-header/workflow-header.component';
import { ModalDeleteCoreComponent } from '../../shared-core/modal-delete-core/modal-delete-core.component';
import { ModalCancelCoreComponent } from '../../shared-core/modal-cancel-core/modal-cancel-core.component';
import { ModalDisapproveCoreComponent } from '../../shared-core/modal-disapprove-core/modal-disapprove-core.component';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CoreStatus } from 'src/app/models/cores/core-status';
import { DownloadProjectService } from '../../shared-core/services/download-project.service';


@Component({
  selector: '[app-brief-template-header]',
  templateUrl: './brief-template-header.component.html',
  styleUrls: ['./brief-template-header.component.scss']
})
export class BriefTemplateHeaderComponent implements OnInit {
  // Inputs
  @Input() briefTemplate: BriefTemplate;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() coreStatuses = [];
  @Input() editable = false;
  @Input() canShare = false;
  @Input() canApprove = false;
  @Input() isApprover = false;
  @Input() isAdmin = false;
  // Outputs
  @Output() headerOnApprove = new EventEmitter();
  @Output() headerOnDisapprove = new EventEmitter();
  @Output() headerOnChangeStatus = new EventEmitter();
  // View childs
  @ViewChild(WorkflowHeaderComponent) workflowHeaderComponent: WorkflowHeaderComponent;
  @ViewChild('modalDelete') modalDelete: ModalDeleteCoreComponent;
  @ViewChild('modalCancel') modalCancel: ModalCancelCoreComponent;
  @ViewChild('modalDisapprove') modalDisapprove: ModalDisapproveCoreComponent;
  @ViewChild('modalShare') modalShare: ModalShareParticipantsComponent;
  // Constructor
  constructor(
    private _router: Router,
    private _downloadProjectService: DownloadProjectService
  ) { }

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
    if (this.briefTemplate.status.id !== 'disapproved') {
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
    this._downloadProjectService.downloadProjectShow(this.briefTemplate);
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

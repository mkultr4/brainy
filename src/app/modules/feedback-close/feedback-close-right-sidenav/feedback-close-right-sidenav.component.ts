import { Component, OnInit, Input, ViewChild } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { CommentThreadSidenavSearchComponent } from '../../comment-thread/comment-thread-sidenav-search/comment-thread-sidenav-search.component';
import { Router } from '../../../../../node_modules/@angular/router';
import { ToastrService } from '../../../../../node_modules/ngx-toastr';
import { ModalShareParticipantsComponent } from '../../shared-participants/modal-share-participants/modal-share-participants.component';
import { WorkflowService } from '../../../services/workflow/workflow.service';
import { DownloadProjectService } from '../../shared-core/services/download-project.service';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { Feedback } from '../../../models/feedback/feedback';
import { Invitation } from '../../../models/invitations/invitation';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';
import { ModalShareByEmailComponent } from '../../shared-core/modal-share-by-email/modal-share-by-email.component';
import { ModalRequestModificationComponent } from '../../shared-core/modal-request-modification/modal-request-modification.component';
import { ModalRequestPermissionComponent } from '../../shared-core/modal-request-permission/modal-request-permission.component';
import { CoreStatus } from '../../../models/cores/core-status';


@Component({
  selector: 'app-feedback-close-right-sidenav,[app-feedback-close-right-sidenav]',
  templateUrl: './feedback-close-right-sidenav.component.html',
  styleUrls: ['./feedback-close-right-sidenav.component.scss']
})
export class FeedbackCloseRightSidenavComponent implements OnInit {
  // Services
  private _coreService;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() feedback: Feedback;
  @Input() invitations: Invitation[];
  @Input() compressed = false;
  @Input() canShare = false;
  @Input() canRequestModification = false;
  @Input() canRequestOpen = false;
  @Input() canRequestOpenDirect = false;
  @Input()coreStatuses: CoreStatus[];
  // View childs
  @ViewChild('modalShare') modalShare: ModalShareParticipantsComponent;
  @ViewChild('sidenavSearchComments') sidenavSearchComments: CommentThreadSidenavSearchComponent;
  @ViewChild('modalRequestModification') modalRequestModification: ModalRequestModificationComponent;
  @ViewChild('modalRequestPermission') modalRequestPermission: ModalRequestPermissionComponent;
  @ViewChild('modalShareByEmail') modalShareByEmail: ModalShareByEmailComponent;
  constructor(
    private _router: Router,
    private _toastrService: ToastrService,
    private _workflowService: WorkflowService,
    private _downloadProjectService: DownloadProjectService,
    private _coreStrategyService: CoreStrategyService
  ) {
    this._coreService = this._coreStrategyService.getService();
  }

  ngOnInit() {
  }

  // Compress
  compress() {
    this._workflowService.compressRightSidenav(!this.compressed);
  }
  onShare() {
    this.modalShare.showModal();
  }
  onDownload() {
    this._downloadProjectService.downloadProjectShow(this.feedback);
  }
  onSendByEmail() {
    this.modalShareByEmail.showModal();
  }
  onSearchComments() {
    this.sidenavSearchComments.showSidenav();
  }
  /**
   * On user request a modification
   */
  onRequestModification() {
    const editor =this.invitations.filter(i => i.groupReference === 'editor')[0];
    this.modalRequestModification.openModal(this.workspaceAccess, editor, this.feedback);

  }
  /**
   * On user request a open the feedabck
   */
  onRequestOpen() {
    
    if (!this.canRequestOpenDirect) {
      const approver = this.invitations.filter(i => i.groupReference === 'approver');
       if (approver.length > 0) {
         this.modalRequestPermission.openModal(this.workspaceAccess, approver[0], this.feedback);
       } else {
         this.modalRequestPermission.openModal(this.workspaceAccess, this.feedback.approvedBy, this.feedback);
       }

    } else {
      this._coreService.
      updateStatus(this.feedback.id, this.coreStatuses.filter(s => s.key === 'process')[0])
      .subscribe(resp => {
        
        if (resp) {
          this._router.navigate(['/feedback/', this.feedback.id]);
        } else {
          this._toastrService.error('No se pudo actualizar el estado');
        }
      });
    }
  }
}

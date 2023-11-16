import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MeetingNote } from 'src/app/models/meeting-note/meeting-note';
import { Invitation } from 'src/app/models/invitations/invitation';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { ModalShareParticipantsComponent } from '../../shared-participants/modal-share-participants/modal-share-participants.component';
import { CommentThreadSidenavSearchComponent } from '../../comment-thread/comment-thread-sidenav-search/comment-thread-sidenav-search.component';
import { ModalRequestModificationComponent } from '../../shared-core/modal-request-modification/modal-request-modification.component';
import { ModalRequestPermissionComponent } from '../../shared-core/modal-request-permission/modal-request-permission.component';
import { ModalShareByEmailComponent } from '../../shared-core/modal-share-by-email/modal-share-by-email.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { DownloadProjectService } from '../../shared-core/services/download-project.service';
import { CoreStrategyService } from 'src/app/services/cores/core-strategy.service';
import { CoreStatus } from 'src/app/models/cores/core-status';
import { Topic } from 'src/app/models/meeting-note/topic';
import { Task } from 'src/app/models/meeting-note/task';

@Component({
  selector: 'app-meeting-note-close-visual',
  templateUrl: './meeting-note-close-visual.component.html',
  styleUrls: ['./meeting-note-close-visual.component.scss']
})
export class MeetingNoteCloseVisualComponent implements OnInit {
 // Services
 private _coreService;
 @Input() workspaceAccess: WorkspaceAccess;
 @Input() meetingNote: MeetingNote;
 @Input() topics: Topic[];
 @Input() tasks: Task[];
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
   private _downloadProjectService: DownloadProjectService,
   private _coreStrategyService: CoreStrategyService
 ) {
   this._coreService = this._coreStrategyService.getService();
 }

 ngOnInit() {
 }

 
 onShare() {
   this.modalShare.showModal();
 }
 onDownload() {
   this._downloadProjectService.downloadProjectShow(this.meetingNote);
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
   this.modalRequestModification.openModal(this.workspaceAccess, editor, this.meetingNote);

 }
 /**
  * On user request a open the feedabck
  */
 onRequestOpen() {
   
   if (!this.canRequestOpenDirect) {
     const approver = this.invitations.filter(i => i.groupReference === 'approver');
      if (approver.length > 0) {
        this.modalRequestPermission.openModal(this.workspaceAccess, approver[0], this.meetingNote);
      } else {
        this.modalRequestPermission.openModal(this.workspaceAccess, this.meetingNote.approvedBy, this.meetingNote);
      }

   } else {
     this._coreService.
     updateStatus(this.meetingNote.id, this.coreStatuses.filter(s => s.key === 'process')[0])
     .subscribe(resp => {
       
       if (resp) {
         this._router.navigate(['/meeting-note/', this.meetingNote.id]);
       } else {
         this._toastrService.error('No se pudo actualizar el estado');
       }
     });
   }
 }
}

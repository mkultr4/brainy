import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { Brief } from 'src/app/models/brief/brief';
import { BriefCategory } from 'src/app/models/brief/brief-category';
import { Invitation } from 'src/app/models/invitations/invitation';
import { CoreStatus } from 'src/app/models/cores/core-status';
import { ModalShareParticipantsComponent } from '../../shared-participants/modal-share-participants/modal-share-participants.component';
import { CommentThreadSidenavSearchComponent } from '../../comment-thread/comment-thread-sidenav-search/comment-thread-sidenav-search.component';
import { ModalRequestModificationComponent } from '../../shared-core/modal-request-modification/modal-request-modification.component';
import { ModalRequestPermissionComponent } from '../../shared-core/modal-request-permission/modal-request-permission.component';
import { ModalShareByEmailComponent } from '../../shared-core/modal-share-by-email/modal-share-by-email.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DownloadProjectService } from '../../shared-core/services/download-project.service';
import { CoreStrategyService } from 'src/app/services/cores/core-strategy.service';

@Component({
  selector: 'app-brief-close-visual',
  templateUrl: './brief-close-visual.component.html',
  styleUrls: ['./brief-close-visual.component.scss']
})
export class BriefCloseVisualComponent implements OnInit {
 // Services
 private _coreService;
 // Inputs
 @Input() workspaceAccess: WorkspaceAccess;
 @Input() brief: Brief;
 @Input() categories: BriefCategory[];
 @Input() invitations: Invitation[];
 @Input() compressed = false;
 @Input() canShare = false;
 @Input() canRequestModification = false;
 @Input() canRequestOpen = false;
 @Input() canRequestOpenDirect = false;
 @Input()coreStatuses: CoreStatus[];
 @Input() givebacks = [];
 @Input() finalists = [];
 @Input() showBrand = false;
 // View childs
 @ViewChild('modalShare') modalShare: ModalShareParticipantsComponent;
 @ViewChild('sidenavSearchComments') sidenavSearchComments: CommentThreadSidenavSearchComponent;
 @ViewChild('modalRequestModification') modalRequestModification: ModalRequestModificationComponent;
 @ViewChild('modalRequestPermission') modalRequestPermission: ModalRequestPermissionComponent;
 @ViewChild('modalShareByEmail') modalShareByEmail: ModalShareByEmailComponent;
 // Constructor
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
   this._downloadProjectService.downloadProjectShow(this.brief);
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
   this.modalRequestModification.openModal(this.workspaceAccess, editor, this.brief);

 }
 /**
  * On user request a open the feedabck
  */
 onRequestOpen() {
   
   if (!this.canRequestOpenDirect) {
     const approver = this.invitations.filter(i => i.groupReference === 'approver');
      if (approver.length > 0) {
        this.modalRequestPermission.openModal(this.workspaceAccess, approver[0], this.brief);
      } else {
        this.modalRequestPermission.openModal(this.workspaceAccess, this.brief.approvedBy, this.brief);
      }

   } else {
     this._coreService.
     updateStatus(this.brief.id, this.coreStatuses.filter(s => s.key === 'process')[0])
     .subscribe(resp => {
       
       if (resp) {
         this._router.navigate(['/brief/project/', this.brief.id]);
       } else {
         this._toastrService.error('No se pudo actualizar el estado');
       }
     });
   }
 }
}

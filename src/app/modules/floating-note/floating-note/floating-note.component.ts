import { Component, OnInit, ViewChild, Input, AfterContentInit } from '@angular/core';
import { FloatingNotePopupComponent } from '../floating-note-popup/floating-note-popup.component';
import { User } from 'src/app/models/users/user';
import { Note } from 'src/app/models/notes/note';
import { RangyService } from 'src/app/services/utils/rangy.service';
import { FloatingNoteWorkflowService } from '../services/floating-note-workflow.service';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { ISubscription } from 'rxjs/Subscription';
import { NoteStrategyService } from 'src/app/services/notes/note-strategy.service';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { Core } from 'src/app/models/cores/core';
import { CoreStrategyService } from 'src/app/services/cores/core-strategy.service';
import { InvitationStrategyService } from 'src/app/services/invitations/invitation-strategy.service';
import { ModalDownloadProjectComponent } from '../../shared-core/modal-download-project/modal-download-project.component';
@Component({
  selector: 'app-floating-note',
  templateUrl: './floating-note.component.html',
  styleUrls: ['./floating-note.component.scss'],
  providers: [
    RangyService,
    NoteStrategyService,
    InvitationStrategyService
  ]
})
export class FloatingNoteComponent implements OnInit, AfterContentInit {

  // Public vars
  public open: boolean = false;
  public coreTypes  = [];
  // Services
  private _noteService;
  private _coreService;
  //Subscription create note of comment thread
  public subscriptionCommentThread: ISubscription;
  // Inputs
  @Input() currentUser: User;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() core: Core;
  @Input() empty = false;
  // Viewchild
  @ViewChild('popup') popup: FloatingNotePopupComponent;
  @ViewChild('modalDownload') modalDownload: ModalDownloadProjectComponent;
  // Constructor
  constructor(
    private _noteStrategyService: NoteStrategyService,
    private _coreStrategyService: CoreStrategyService,
    private _rangy: RangyService,
    private _floatingNoteWorkflowService: FloatingNoteWorkflowService,
    private _authService: AuthenticationService

  ) {
    // Services
    this._noteService = this._noteStrategyService.getService();
    this._coreService = this._coreStrategyService.getService();
    // User
    this.currentUser = this._authService.getAuthUser();
    // Workspace Access
    this.workspaceAccess = this._authService.getAuthWorkspaceAccess();
  }


  ngOnInit() {

  }

  ngAfterViewInit() {
    this.subscriptionCommentThread = this._floatingNoteWorkflowService.subjectCreateNoteCommentThreadObs.subscribe((note: Note) => {
      note.type = this.coreTypes.filter(t => t.key === 'note')[0];
      this._noteService.create(note).subscribe(resp => {
        this.popup.openPopupEdit(resp);
      });
    });
  }
  ngAfterContentInit(){
    this._coreService.getAllTypes().subscribe(types => {
      this.coreTypes = types.filter(t => t.key !== 'brief-template' && t.key !== 'note');
    });
  }


  openPopup() {
    this.popup.openPopup();
  }

  onOpenPopup() {

  }
  onClosePopup() {

  }
  /**
   * On create note toolbar
   * @param note 
   */
  onCreateNoteToolbar(note: Note) {
    this._noteService.create(note).subscribe(resp => {
      this.popup.openPopupEdit(resp);
    });

  }

  // On export
  onExport(note:Note){
    this.modalDownload.showModal(note);
  }
  ngOnDestroy() {
    if (this.subscriptionCommentThread) {
      this.subscriptionCommentThread.unsubscribe();
    }
  }
}

import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { User } from 'src/app/models/users/user';
import { ISubscription } from 'rxjs/Subscription';
import { NoteReminder } from 'src/app/models/notes/note-reminder';
import { Note } from 'src/app/models/notes/note';
import { FloatingNoteWorkflowService } from '../services/floating-note-workflow.service';
import { NoteStrategyService } from 'src/app/services/notes/note-strategy.service';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { Core } from 'src/app/models/cores/core';
import { ModalShareParticipantsComponent } from '../../shared-participants/modal-share-participants/modal-share-participants.component';
import { ModalShareByEmailComponent } from '../../shared-core/modal-share-by-email/modal-share-by-email.component';

@Component({
  selector: 'app-floating-note-popup',
  templateUrl: './floating-note-popup.component.html',
  styleUrls: ['./floating-note-popup.component.scss'],
  providers: [

  ]
})
export class FloatingNotePopupComponent implements OnInit {

  // Note to share
  public noteToShare = new Note();
  // Note list
  public notes: Array<Note> = new Array<Note>();
  // Search
  public query = '';
  // Note to edit
  public noteEdit: Note = new Note();
  // Note reminder edit
  public noteReminderEdit: NoteReminder;
  // Subscription
  public subscriptionNotes: ISubscription;
  // Expand
  public maximize = false;
  // Services
  private _noteService;
  // Input
  @Input() open = false;
  @Input() currentUser: User;
  @Input() core: Core;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() view = 'list';
  @Input() coreTypes;
  @Input() empty = false;
  // Outputs
  @Output() onOpen = new EventEmitter();
  @Output() onClose = new EventEmitter();
  @Output() onExportNote = new EventEmitter();
  // Viewchild
  @ViewChild('modalShare') modalShare: ModalShareParticipantsComponent;
  @ViewChild('modalShareByEmail') modalShareByEmail: ModalShareByEmailComponent;
  

  constructor(
    private _noteStrategyService: NoteStrategyService,
    private _floatingNoteWorkflowService: FloatingNoteWorkflowService
  ) {
    this._noteService = this._noteStrategyService.getService();

  }
  // Init
  ngOnInit() {
  }
  // After view init
  ngAfterViewInit() {
    this.subscriptionNotes = this._noteService.notes.subscribe(notes => {
      console.log(notes);
      this.notes = Object.assign([], notes);
    });
    this._noteService.loadAll(this.empty).subscribe();
  }

  openPopup() {
    this.open = true;
    this.onOpen.emit();
  }
  openPopupEdit(note: Note) {
    this.view = "edit";
    this.noteEdit = note;
    this.open = true;
    this.onOpen.emit();
  }
  closePopup() {
    this.open = false;
    this.maximize = false;
    this.view = 'list';
    this.onClose.emit();
  }
  //On create new note
  onNewNote() {
    this.view = 'add';
  }
  //Go back adavance
  back() {
    if (this.view === 'reminder-create' || this.view === 'reminder-list' || this.view === 'share-edit') {
      this.view = 'edit';
    } else {
      this.view = 'list';
    }
  }

  onAdd(note: Note) {
    this.view = 'edit';
    //this.notes.push(note);
    this.noteEdit = note;
  }

  onEdit(note: Note) {
    this.view = 'edit';
    this.noteEdit = note;
  }
  //On create reminder
  onCreateReminder(note: Note) {
    this.noteEdit = note;
    this.noteReminderEdit = new NoteReminder();

    if (this.noteEdit.reminders.length > 0) {
      this.view = 'reminder-list'
    } else {
      this.view = 'reminder-create';
    }

  }
  //On edit note reminder
  onEditNoteReminder(noteReminder: NoteReminder) {
    this.noteReminderEdit = noteReminder;
    this.view = 'reminder-create';
  }

  onDeleteNoteEdit() {
    this.view = 'list';

  }

  //On update Reminder 
  onUpdateReminder() {
    this.view = 'reminder-list';
  }
  //Maximize
  maximizePopup() {
    this.maximize = !this.maximize;
  }
  // #region Share
  // On share with participants
  onShareWithParticipants(note: Note) {
    this.noteToShare = note;
    this.modalShare.showModal();
  }
  onCloseModalShare(invitations) {
    console.log(invitations);
    const index = this.notes.findIndex(n => n.id === this.noteToShare.id);
    this.notes[index].invitations.push(...invitations);
    console.log(this.notes);
  }
  // On share with emails
  onShareWithEmails(note: Note) {
    this.noteToShare = note;
    this.modalShareByEmail.showModal();
  }
  // #endregion
  // On export
  onExport(note: Note) {
    this.onExportNote.emit(note);
  }
  ngOnDestroy() {
    if (this.subscriptionNotes) {
      this.subscriptionNotes.unsubscribe();
    }

  }
}

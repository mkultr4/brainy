import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Note } from 'src/app/models/notes/note';
import { NoteStrategyService } from 'src/app/services/notes/note-strategy.service';
import { Core } from 'src/app/models/cores/core';

@Component({
  selector: 'app-floating-note-popup-list',
  templateUrl: './floating-note-popup-list.component.html',
  styleUrls: ['./floating-note-popup-list.component.scss']
})
export class FloatingNotePopupListComponent implements OnInit {
  public query = '';
  public isShowDeleteAlert = false;
  public noteToDelete: Note;
  // Services
  private _noteService;
  // Inputs
  @Input() notes: Array<Note>;
  @Input() core: Core;
  // Outputs
  @Output() onNewNote = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  @Output() onShareWithParticipants = new EventEmitter();
  @Output() onShareWithEmails = new EventEmitter();
  // Constructor
  constructor(private _noteStrategyService: NoteStrategyService) {
    this._noteService = this._noteStrategyService.getService();
  }

  ngOnInit() {
  }
  /**
   * New note
   */
  newNote() {
    if (this.core) {
      const noteOfCore = new Note();
      noteOfCore.title = this.core.title;
      noteOfCore.project = this.core.project;
      noteOfCore.content ='';
      this._noteService.create(noteOfCore).subscribe(note => {
        this.onEdit.emit(note);
      });
    } else {
      this.onNewNote.emit();
    }

  }
  /**
   * Edit
   * @param note 
   */
  edit(note: Note) {
    this.onEdit.emit(note);
  }
  /**
   * Share with participants
   * @param note 
   */
  shareWithParticipants(note: Note) {
    this.onShareWithParticipants.emit(note)
  }
  // Share with emails
  shareWithEmails(note: Note) {
    this.onShareWithEmails.emit(note)
  }
  delete(note: Note) {
    this.noteToDelete = note;
    this.isShowDeleteAlert = true;
  }
  acceptDelete() {
    this._noteService.remove(this.noteToDelete).subscribe(note => {
      this.noteToDelete = null;
    })
    this.isShowDeleteAlert = false;
  }
  cancelDelete() {
    this.isShowDeleteAlert = false;
  }

}

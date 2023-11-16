import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Note } from 'src/app/models/notes/note';

@Injectable()
export class FloatingNoteWorkflowService {

  private subjectScroll: Subject<boolean>;
  public subjectScrollObs: Observable<boolean>;
  //Share participants
  private subjectModalShare: Subject<Note>;
  public subjectModalShareObs: Observable<Note>;
  //Share emails
  private subjectModalShareEmail: Subject<Note>;
  public subjectModalShareEmailObs: Observable<Note>;
  //Export note
  private subjectModalExport: Subject<Note>;
  public subjectModalExportObs: Observable<Note>;
  // Show toolbar floating note
  private _showToolbar: Subject<any>;
  public showToolbar: Observable<any>;
  //Comment Thread
  private subjectCreateNoteCommentThread: Subject<Note>;
  public subjectCreateNoteCommentThreadObs: Observable<Note>;

  constructor() {
    //Scroll
    this.subjectScroll = new Subject<boolean>()
    this.subjectScrollObs = this.subjectScroll.asObservable();
    //Share
    this.subjectModalShare = new Subject<Note>();
    this.subjectModalShareObs = this.subjectModalShare.asObservable();
    //Share email
    this.subjectModalShareEmail = new Subject<Note>();
    this.subjectModalShareEmailObs = this.subjectModalShareEmail.asObservable();
    //Export
    this.subjectModalExport = new Subject<Note>();
    this.subjectModalExportObs = this.subjectModalExport.asObservable();
    // Toolbar floating note
    this._showToolbar = new Subject<any>();
    this.showToolbar = this._showToolbar.asObservable();
    //Comment Thread
    this.subjectCreateNoteCommentThread = new Subject<Note>();
    this.subjectCreateNoteCommentThreadObs = this.subjectCreateNoteCommentThread.asObservable();
  }
  /**
   * On scroll
   */
  onScroll() {
    this.subjectScroll.next(Object.assign({}, true));
  }
  /**
   * Modal share with participants
   * @param note 
   */
  shareWithParticipants(note: Note) {
    this.subjectModalShare.next(Object.assign({}, note));
  }
  /**
   * Modal share with email
   * @param note 
   */
  shareWithEmail(note: Note) {
    this.subjectModalShareEmail.next(Object.assign({}, note));
  }
  /**
   * Modal export to pdf
   * @param note 
   */
  exportToPdf(note: Note) {
    this.subjectModalExport.next(Object.assign({}, note));
  }
  /**
   * Show toolbar floating note
   * @param event 
   */
  onShowToolbarFloatingNote(event){
    this._showToolbar.next(event);
  }
  /**
   * Create a note of comment thread sidenav
   * @param note 
   */
  createCommentOfCommentThread(note: Note) {
    console.log(note);
    this.subjectCreateNoteCommentThread.next(Object.assign({}, note));
  }


}

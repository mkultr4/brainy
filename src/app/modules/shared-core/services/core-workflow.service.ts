import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Core } from '../../../models/cores/core';

@Injectable()
export class CoreWorkflowService {
  // Brief List
  private _sidenavListBrief: Subject<boolean> = new Subject();
  public sidenavListBrief: Observable<boolean>;
  // Brief
  private _sidenavBrief: Subject<Core> = new Subject();
  public sidenavBrief: Observable<Core>;
  // Draft List
  private _sidenavListMeetingNote: Subject<boolean> = new Subject();
  public sidenavListMeetingNote: Observable<boolean>;
  // Draft
  private _sidenavMeetingNote: Subject<Core> = new Subject();
  public sidenavMeetingNote: Observable<Core>;
  // Feedback list
  private _sidenavListFeedback: Subject<boolean> = new Subject();
  public sidenavListFeedback: Observable<boolean>;
  // Feedback
  private _sidenavFeedback: Subject<Core> = new Subject();
  public sidenavFeedback: Observable<Core>;

  constructor() {
    // Brief List
    this.sidenavListBrief = this._sidenavListBrief.asObservable();
    // Brief
    this.sidenavBrief = this._sidenavBrief.asObservable();
    // Meeting List
    this.sidenavListMeetingNote = this._sidenavListMeetingNote.asObservable();
    // Meeting
    this.sidenavMeetingNote = this._sidenavMeetingNote.asObservable();
    // Feedback list
    this.sidenavListFeedback = this._sidenavListFeedback.asObservable();
    // Feedback
    this.sidenavFeedback = this._sidenavFeedback.asObservable();
  }
  /*
  * Show sidenav of list of brief
  * @param {boolean} show
  */
  showSidenavListBrief(show: boolean) {
    this._sidenavListBrief.next(show);
  }
  /**
   * Shoe sidenav of brief
   * @param {boolean} show
   */
  showSidenavBrief(core: Core) {
    this._sidenavBrief.next(core);
  }
  /**
   * Show sidenav of list of draft
   * @param {boolean} show
   */
  showSidenavListMeetingNote(show: boolean) {
    this._sidenavListMeetingNote.next(show);
  }
  /**
   * Show sidenav of  draft
   * @param {boolean} show
   */
  showSidenavMeetingNote(core: Core) {
    this._sidenavMeetingNote.next(core);
  }
  /**
   * Show sidenav list of feebdack
   * @param show
   */
  showSidenavListFeedback(show: boolean) {
    this._sidenavListFeedback.next(show);
  }
  /**
   * Show sidenav of feedback
   * @param core
   */
  showSidenavFeedback(core: Core) {
    this._sidenavFeedback.next(core);
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { MeetingNote } from '../../../models/meeting-note/meeting-note';
import { ISubscription } from 'rxjs/Subscription';
import { AsidenavComponent } from '../../shared-sidenav/asidenav/asidenav.component';
import { CoreWorkflowService } from '../services/core-workflow.service';
import { CORE_STATUSES } from '../../../data/mock-cores';
import { MeetingNoteStrategyService } from 'src/app/services/meeting-note/meeting-note-strategy.service';
@Component({
  selector: 'app-meeting-note-associated',
  templateUrl: './meeting-note-associated.component.html',
  styleUrls: ['./meeting-note-associated.component.scss']
})
export class MeetingNoteAssociatedComponent implements OnInit {
  // Public vars
  public meetingNote: MeetingNote;
  // Subscription
  private subscriptionShowSidenav: ISubscription;
  // Services
  private _meetingNoteService;

  @ViewChild('meetingNoteSidenav') meetingNoteSidenav: AsidenavComponent;

  constructor(
    private _coreWorkflowService: CoreWorkflowService,
    private _meetingNoteStrategyService: MeetingNoteStrategyService
  ) {
    this._meetingNoteService = this._meetingNoteStrategyService.getService();
  }

  ngOnInit() {

  }
  ngAfterContentInit() {
    this.subscriptionShowSidenav =
      this._coreWorkflowService.sidenavMeetingNote.subscribe(core => {
        if (core) {
          this._meetingNoteService.loadById(core.id, 'scheduled').subscribe(meetingNote => {
            this.meetingNote = meetingNote;
            this.showSidenav();
          });
        } else if (this.meetingNoteSidenav.getIsShow()) {
          this.hideSidenav();
        }
      });
  }
  showSidenav() {
    this.meetingNoteSidenav.showSidenav();
  }
  hideSidenav() {
    this.meetingNoteSidenav.hideSidenav();
  }
  onShow() {
  }
  onHide() {
    this.meetingNote = null;
    this._coreWorkflowService.showSidenavBrief(null);
  }

  ngOnDestroy() {
    if (!this.subscriptionShowSidenav.closed) {
      this.subscriptionShowSidenav.unsubscribe();
    }
  }
}

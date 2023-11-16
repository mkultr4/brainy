import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { MeetingNote } from '../../../models/meeting-note/meeting-note';
import { Core } from '../../../models/cores/core';
import { AsidenavComponent } from '../../shared-sidenav/asidenav/asidenav.component';
import { CoreStrategyService } from '../../../services/cores/core-strategy.service';
import { CoreWorkflowService } from '../services/core-workflow.service';
@Component({
  selector: 'app-meeting-note-list-associated',
  templateUrl: './meeting-note-list-associated.component.html',
  styleUrls: ['./meeting-note-list-associated.component.scss']
})
export class MeetingNoteListAssociatedComponent implements OnInit {

  private showSubs: ISubscription;
  public meetingNotes: Array<MeetingNote>;
  // Services
  private _coreService;
  @Input() core: Core;
  @ViewChild('meetingNoteListSidenav') meetingNoteSidenav: AsidenavComponent;
  // Constructor
  constructor(
    private _coreStrategyService: CoreStrategyService,
    private _coreWorkflowService: CoreWorkflowService
  ) {
    this._coreService = this._coreStrategyService.getService();
  }

  ngOnInit() {

  }
  ngAfterContentInit() {
    this.showSubs = this._coreWorkflowService.sidenavListMeetingNote.subscribe(show => {
      if (show) {
        this._coreService.findMeetingNoteAssociated(this.core).subscribe(meetingNotes => {
          this.meetingNotes = meetingNotes;
        })
        this.showSidenav();
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
  viewMeetingNote(core: Core) {
    this._coreWorkflowService.showSidenavMeetingNote(core);
  }
  onShow() {
  }
  onHide() {
    this._coreWorkflowService.showSidenavListMeetingNote(false);
  }

  ngOnDestroy() {
    if (!this.showSubs.closed) {
      this.showSubs.unsubscribe();
    }
  }
}

import { Component, OnInit, AfterContentInit, OnDestroy, Input, Inject, Output, EventEmitter } from '@angular/core';
import { CoreWorkflowService } from '../../shared-core/services/core-workflow.service';
import { ISubscription } from 'rxjs/Subscription';
import { MeetingNote } from 'src/app/models/meeting-note/meeting-note';
import { Topic } from 'src/app/models/meeting-note/topic';
import { MeetingNoteContentComponent } from '../meeting-note-content/meeting-note-content.component';
import { MeetingNoteStrategyService } from 'src/app/services/meeting-note/meeting-note-strategy.service';
import { ToastrService } from 'ngx-toastr';
import { Task } from 'src/app/models/meeting-note/task';
import { MeetingNoteWorkflowService } from '../services/meeting-note-workflow.service';
@Component({
  selector: 'app-topic-toolbar',
  templateUrl: './topic-toolbar.component.html',
  styleUrls: ['./topic-toolbar.component.scss']
})
export class TopicToolbarComponent implements OnInit, AfterContentInit, OnDestroy {
  // Public vars
  public isShowBrief = false;
  public isShowFeedback = false;
  public topic;
  // Services
  private _meetingNoteService;
  // Subscriptions
  public subcriptionListBrief: ISubscription;
  public subcriptionListFeedback: ISubscription;
  @Input() topicShow: Topic;
  @Input() editable = false;
  @Input() workspaceAccess;
  @Input() commentThreadStatuses;
  @Input() participantTypes;
  @Input() meetingNote: MeetingNote;
  // Outputs
  @Output() topicToolbarOnMarkPending = new EventEmitter();
  @Output() topicToolbarOnAddTask = new EventEmitter();

  constructor(
    private _coreWorkflowService: CoreWorkflowService,
    private _meetingNoteStrategyService: MeetingNoteStrategyService,
    private _meetingNoteWorkflowService: MeetingNoteWorkflowService,
    private _toastrService: ToastrService
  ) {
    this._meetingNoteService = this._meetingNoteStrategyService.getService();
  }

  ngOnInit() {
  }
  ngAfterContentInit() {
    this.subcriptionListBrief = this._coreWorkflowService.sidenavListBrief.subscribe(show => {
      this.isShowBrief = show;
    });
    this.subcriptionListFeedback = this._coreWorkflowService.sidenavListFeedback.subscribe(show => {
      this.isShowFeedback = show;
    })
    
  }
  markTopicPending() {
    const pending = !this.topic.pending;
    this._meetingNoteService.markPending(this.topic.id, pending).subscribe(t => {
      this.topic.pending  = t.pending;
      //  console.log(pending);
      if (t.pending) {
        const message = `Haz  marcado el tema como <br> pendiente para una próxima reunión.`
        this._toastrService.info(message);
      }else{
        this._meetingNoteWorkflowService.checkStatus(this.topic);
      }
    })
  }
  showListBrief() {
    this._coreWorkflowService.showSidenavListBrief(true);
  }
  showListFeedback() {
    this._coreWorkflowService.showSidenavListFeedback(true);
  }
  /**
   * Popup on add task
   * @param task 
   */
  popupOnAddTask(task:Task){
    this.topicToolbarOnAddTask.emit(task);
  }
  ngOnDestroy() {
    if (this.subcriptionListBrief) {
      this.subcriptionListBrief.unsubscribe();
    }
    if (this.subcriptionListFeedback) {
      this.subcriptionListFeedback.unsubscribe();
    }
  }


}

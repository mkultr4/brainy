import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, OnChanges, SimpleChanges, AfterContentInit } from '@angular/core';
import { MeetingNote } from '../../../models/meeting-note/meeting-note';
import { WorkflowService } from '../../../services/workflow/workflow.service';
import { Topic } from '../../../models/meeting-note/topic';
import { MeetingNoteStrategyService } from '../../../services/meeting-note/meeting-note-strategy.service';
import { MeetingNoteWorkflowService } from '../services/meeting-note-workflow.service';
import { ToastrService } from 'ngx-toastr';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { ISubscription } from 'rxjs/Subscription';
import { FilterTopicWithAgreementPipe } from '../pipes/filter-topic-with-agreement.pipe';

@Component({
  selector: 'app-meeting-note-left-sidenav',
  templateUrl: './meeting-note-left-sidenav.component.html',
  styleUrls: ['./meeting-note-left-sidenav.component.scss'],
  providers: [FilterTopicWithAgreementPipe]
})
export class MeetingNoteLeftSidenavComponent implements OnInit, OnChanges, AfterContentInit {
  // Public vars
  public sorting = false;
  public sortingSubTopic = false;
  public agreements = [];
  public tasks = [];
  // Services
  private _meetingNoteService;
  // Subscription

  // Input
  @Input() meetingNote: MeetingNote = new MeetingNote();
  @Input() topics: Topic[];
  @Input() topicShow: Topic;
  @Input() editable = false;
  @Input() scheduled;
  // Topic,Task, Agreement
  @Input() view;
  // Create action
  @Input() createAction = false;
  @Input() compressed = false;

  @Output() onViewChange = new EventEmitter();
  @Output() updateEditor = new EventEmitter();
  // View child
  @ViewChild('topicList', { read: PerfectScrollbarDirective }) topicList: PerfectScrollbarDirective;


  constructor(
    private _workflowService: WorkflowService,
    private _meetingNoteStrategyService: MeetingNoteStrategyService,
    private _meetingNoteWorkflowService: MeetingNoteWorkflowService,
    private _toastrService: ToastrService,
    private _filterTopicWithAgreement: FilterTopicWithAgreementPipe
  ) {
    this._meetingNoteService = this._meetingNoteStrategyService.getService();
  }

  ngOnInit() {
  }
  /**
   * On changes
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes.topics) {
      setTimeout(() => {
        this.agreements = this._filterTopicWithAgreement.transform(this.topics);
        this.tasks = [];

        this.topics.forEach((t: Topic) => {
          const tasksDescriptions = t.descriptionItems.filter(i => i.type === 'task');
          const tasksAgreements = t.agreementItems.filter(i => i.type === 'task');
          this.tasks = this.tasks.concat(...tasksDescriptions, ...tasksAgreements);
        });
      });
    }
  }
  // Compress
  compress() {
    setTimeout(() => {
      this._workflowService.compressLeftSidenav(!this.compressed);
    });

  }
  // After view init
  ngAfterContentInit() {

  }
  // Add topic
  addTopic() {
    this.onViewChange.emit('topic');
    this.checkTopics();
    this._meetingNoteService.addTopic().subscribe(topic => {
      setTimeout(() => {
        this.topicList.scrollToBottom();
        this._meetingNoteWorkflowService.showTopic(topic);
      });
    });
  }
  /**
   * Check topics
   */
  checkTopics() {
    let topicWithoutTitle = [];
    this.topics.forEach((t, index) => {
      if (t.title.length === 0) {
        // countWithoutTitle++;
        topicWithoutTitle.push(this.topics[index]);
      }
    });
    if (topicWithoutTitle.length > 0) {
      console.log(topicWithoutTitle);
      this._meetingNoteService.updateTopicListTitle(topicWithoutTitle).subscribe();
    }


  }
  /**
   * Show topic
   * @param topic
   */
  showTopic(topic: Topic) {
    this.checkTopics();
    if (this.view !== 'topic') {
      this.onViewChange.emit('topic');
    }
    this._meetingNoteWorkflowService.showTopic(topic);

  }
  /**
   * Remove topic
   * @param topic
   */
  removeTopic(topic: Topic) {
    this._meetingNoteService.removeTopic(topic.id).subscribe((topics) => {
      if (topic.id === this.topicShow.id) {
        setTimeout(() => {
          this._meetingNoteWorkflowService.showTopic(topics[0]);
        });
      }
    });
  }
  // On sort start
  onSortStart() {

    $(this.topicList.elementRef.nativeElement).addClass('sorting');
    this.sorting = true;

  }
  // On sort end
  onSortEnd() {

    $(this.topicList.elementRef.nativeElement).removeClass('sorting');
    this.sorting = false;

  }
  // On sort update
  onSortUpdate(event) {
    let order = 1;
    this.topics.forEach((piece, index) => {
      this.topics[index].order = order;
      order++;
    });
    this._meetingNoteService.updateOrderTopics(this.topics).subscribe(suc => {
    }, error => {
      this._toastrService.error('No se pudieron actualizar intente nuevamente');
    });
  }
  // When sorting subtopic list
  topicOnSortingSubTopic(sorting) {
    this.sortingSubTopic = sorting;

  }
  // On sorting sub topic update editor
  topicOnSortSubTopic() {
    this.updateEditor.emit();
  }
  // On drag over
  topicOnDragOver() {
    this.topicList.update();

  }

  showView(view) {
    if (view !== 'topic') {
      this.checkTopics();
    }
    this.onViewChange.emit(view);
  }
}

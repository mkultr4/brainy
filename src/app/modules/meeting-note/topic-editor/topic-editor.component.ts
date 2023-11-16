import { Component, OnInit, Input, Output, EventEmitter, ViewChild, Renderer2, ElementRef, HostListener, AfterContentInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Topic } from '../../../models/meeting-note/topic';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { MeetingNoteStrategyService } from '../../../services/meeting-note/meeting-note-strategy.service';
import { TopicEditorDescriptionComponent } from './topic-editor-description/topic-editor-description.component';
import { RangyService } from 'src/app/services/utils/rangy.service';
import * as uuid from 'uuid/v4';
import { CommentThreadStrategyService } from 'src/app/services/comments/comment-thread-strategy.service';
import { POINT_SIZE, CommentThread } from 'src/app/models/comments/comment-thread';
import { ISubscription } from 'rxjs/Subscription';
import { TopicEditorAgreementComponent } from './topic-editor-agreement/topic-editor-agreement.component';
import { MeetingNoteCommentsService } from '../services/meeting-note-comments.service';
import { MeetingNote } from 'src/app/models/meeting-note/meeting-note';
import { CommentComunicationService, CommentThreadFilter } from '../../comment-thread/services/comment-comunication.service';
import { CommentThreadStatus } from 'src/app/models/comments/comment-thread-status';
import { ParticipantType } from 'src/app/models/participants/participant-type';
import { Observable } from 'rxjs';
import { MeetingNoteWorkflowService } from '../services/meeting-note-workflow.service';
import { MeetingNoteTutorialComponent } from '../meeting-note-tutorial/meeting-note-tutorial.component';
import { TopicLineItem } from 'src/app/models/meeting-note/topic-line-item';
import { TopicLineItemReference } from 'src/app/models/meeting-note/topic-line-item-reference';
@Component({
  selector: 'app-topic-editor',
  templateUrl: './topic-editor.component.html',
  styleUrls: ['./topic-editor.component.scss']
})
export class TopicEditorComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  // Public vars
  public _topicShow: Topic;
  public topic: Topic;
  public topicEditionLogs = [];
  public filterStatuses: Array<CommentThreadStatus> = new Array<CommentThreadStatus>();
  public filterParticipantTypes: Array<ParticipantType> = new Array<ParticipantType>();
  // Clases
  private commentThreadPointClass = 'comment-thread-point-meeting-note';
  // Services
  private _meetingNoteService;
  private _commentThreadService;
  // Subscriptions
  public subscriptionComments: ISubscription;
  public subscriptionCommentThreadFilter: ISubscription;
  // Input
  @Input() set topicShow(topicShow: Topic) {
    this._topicShow = topicShow;
    this.findTopic();
  };
  @Input() meetingNote: MeetingNote;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() editable;
  @Input() enableComments;
  @Input() scheduled;
  @Input() commentThreadStatuses;
  @Input() participantTypes;
  @Input() showTour;
  // Outputs
  @Output() topicEditorOnFind = new EventEmitter();
  @Output() topicEditorOnEndTour = new EventEmitter();
  // View child
  @ViewChild('topicDescription', { read: TopicEditorDescriptionComponent })
  topicDescriptionComp: TopicEditorDescriptionComponent;
  @ViewChild('topicAgreement', { read: TopicEditorAgreementComponent })
  topicAgreementComp: TopicEditorAgreementComponent;
  @ViewChild('topicEditor') topicEditor: ElementRef;
  @ViewChild(MeetingNoteTutorialComponent) tutorial: MeetingNoteTutorialComponent;



  constructor(
    private _meetingNoteStrategyService: MeetingNoteStrategyService,
    private _meetingNoteWorkflowService: MeetingNoteWorkflowService,
    private _commentThreadSrategyService: CommentThreadStrategyService,
    private _commentComunicationService: CommentComunicationService
  ) {
    this._meetingNoteService = this._meetingNoteStrategyService.getService();
    this._commentThreadService = this._commentThreadSrategyService.getService();
  }

  ngOnInit() {
  }
  // After content init
  ngAfterContentInit() {
    // this.initEditorObserver();
    this.subscriptionCommentThreadFilter = this._commentComunicationService.commentThreadFilterObs.subscribe(
      (filter: CommentThreadFilter) => {

        this.filterStatuses = Object.assign([], filter.statuses);
        this.filterParticipantTypes = Object.assign([], filter.praticipantTypes);
      });
  }
  // After view init
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.showTour && this.editable) {
        this.tutorial.tourComp.startTour();
      }
    }, 200);
  }
  // Tutorial on end
  tutorialOnEnd() {
    this.topicEditorOnEndTour.emit();
  }
  /**
   * When editor has a change
   */
  editorOnChange() {
      // Trigger update position comments
      $('.' + this.commentThreadPointClass).trigger('resize');
  }
  // Find topic
  findTopic() {
    this._meetingNoteService.getTopicById(this._topicShow.id).subscribe(topic => {
      // Assign topic
      this.topic = Object.assign(new Topic(), topic);
      this.topicEditorOnFind.emit();
      setTimeout(() => {
        // Load lines
        this.topicDescriptionComp.loadItems();
        if (this.meetingNote.meetingNoteType.key !== 'scheduled') {
          this.topicAgreementComp.loadItems();
        }
        // Load comments
        this.loadCommentThreads();
        // Load edition log
        this.loadTopicEditionLog();
      });
    })
  }
  /**
   * Update editor
   * @param updateItems 
   * @param removeItems 
   */
  updateTopic(title, addedLines: TopicLineItem[], updateItems: TopicLineItem[], removeItems: TopicLineItem[]) {
    setTimeout(() => {
      if (title) {
        this.topic.title = title;
      }
      // Load lines
      this.topicDescriptionComp.updateItems(
        addedLines.filter(i => i.reference === TopicLineItemReference.DESCRIPTION),
        updateItems.filter(i => i.reference === TopicLineItemReference.DESCRIPTION),
        removeItems.filter(i => i.reference === TopicLineItemReference.DESCRIPTION)
      );
      if (this.meetingNote.meetingNoteType.key !== 'scheduled') {
        this.topicAgreementComp.updateItems(
          addedLines.filter(i => i.reference === TopicLineItemReference.AGREEMENT),
          updateItems.filter(i => i.reference === TopicLineItemReference.AGREEMENT),
          removeItems.filter(i => i.reference === TopicLineItemReference.AGREEMENT)
        );
      }
      // Load comments
      this.loadCommentThreads();
      setTimeout(() => {
        // Load edition log
        this.loadTopicEditionLog();
      });
    });
  }
  /**
   * Load comment thread
   */
  loadCommentThreads() {
    this._commentThreadService.loadAll('TOPIC', this.topic.id, this.topic.commentThreads).subscribe();
    this.subscriptionComments = this._commentThreadService.commentThreads.subscribe((commentThreads) => {
      console.log(commentThreads);
      this.topic.commentThreads = Object.assign([], commentThreads);
      // To update local storage
      this._meetingNoteService.updateTopicCommentThread(this.topic);
      // check if comments unsaved
      const unsaved = this.topic.commentThreads.filter(c => !c.saved).length > 0;

      if (!unsaved && this.topic.commentThreads.length > 0) {
        console.log('check status comments');
        // this._feedbackWorkflowService.checkStatus(commentThreads[commentThreads.length - 1]);
        this._meetingNoteWorkflowService.checkStatus(commentThreads[commentThreads.length - 1]);

      }

    });
  }
  /**
   * Load topic edition logs
   */
  loadTopicEditionLog() {
    this._meetingNoteService.findTopicEditionLog(this.topic.id).subscribe(response => {
      this.topicEditionLogs = response;
    });
  }

  //findTopicEditionLog
  /**
   * Update comment thread
   * @param commentThread 
   */
  updateCommentThread(commentThread: CommentThread) {
    const observable = new Observable(observer => {
      this._commentThreadService.update(commentThread).subscribe(resp => {
        observer.next(resp);
      });
    });
    return observable;

  }


  // Comments

  ngOnDestroy() {

  }

}

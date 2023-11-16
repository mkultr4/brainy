import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Topic } from '../../../../models/meeting-note/topic';
import { MeetingNoteStrategyService } from '../../../../services/meeting-note/meeting-note-strategy.service';
import { ParticipantType } from 'src/app/models/participants/participant-type';
import { CommentThreadStatus } from 'src/app/models/comments/comment-thread-status';

@Component({
  selector: 'app-topic-editor-title',
  templateUrl: './topic-editor-title.component.html',
  styleUrls: ['./topic-editor-title.component.scss']
})
export class TopicEditorTitleComponent implements OnInit, AfterViewInit {
  public topicTitleWidth = 0;
  public topicTitleHeight = 0;
  // Services
  private _meetingNoteService;
  // Input
  @Input() topic: Topic;
  @Input() editable = false;
  @Input() showTour = false;
  @Input() commentThreads = [];
  @Input() filterStatuses: Array<CommentThreadStatus> = new Array<CommentThreadStatus>();
  @Input() filterParticipantTypes: Array<ParticipantType> = new Array<ParticipantType>();
  // View child
  @ViewChild('topicTitle') topicTitleEl: ElementRef;
  @ViewChild('topicTitleClone') topicTitleClone: ElementRef;
  // Constructor
  constructor(
    private _meetingNoteStrategyService: MeetingNoteStrategyService
  ) {
    this._meetingNoteService = this._meetingNoteStrategyService.getService();
  }

  ngOnInit() {
  }

  // On blur
  onBlur() {
    if (this.topic.title && this.topic.title.length > 0) {
      this._meetingNoteService.updateTopicTitle(this.topic.id, this.topic.title).subscribe(
        (topic) => {
          // this.topic.saved = topic.saved;
        }

      );
    }else{
      setTimeout(() => {
        this.setSizes();
  
      });
    }
  }
  onInput() {
    $('.topic-edition-log').trigger('resize');
  }

  onChange() {
    console.log('change');
    setTimeout(() => {
      this.setSizes();

    });
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.setSizes();

    });
  }
  // Set sizes of layers
  setSizes() {
    console.log(this.topic.title.length);
    if (this.topic.title.length === 0) {
      this.topicTitleWidth = parseFloat(window.getComputedStyle(this.topicTitleEl.nativeElement, ':before').width.replace('px', ''));
    } else {
      this.topicTitleWidth = this.topicTitleClone.nativeElement.clientWidth;
    }

    this.topicTitleHeight = this.topicTitleEl.nativeElement.clientHeight;
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    setTimeout(() => {
      this.setSizes();
    })
  }



}

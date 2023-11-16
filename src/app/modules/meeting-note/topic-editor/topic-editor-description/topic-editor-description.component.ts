import { Component, Renderer2, ComponentFactoryResolver, AfterContentInit, HostListener, Input, ViewChild } from '@angular/core';

import { MeetingNoteStrategyService } from '../../../../services/meeting-note/meeting-note-strategy.service';
import { TopicEditorStrategyService } from '../../../../services/meeting-note/topic-editor-strategy.service';
import { OrderByPipe } from 'ngx-pipes';
import { UtilService } from 'src/app/services/utils/util.service';
import { TopicEditorDefaultComponent } from '../topic-editor-default/topic-editor-default.component';
import { RangyService } from 'src/app/services/utils/rangy.service';
import { CommentThreadStrategyService } from 'src/app/services/comments/comment-thread-strategy.service';
import { MeetingNoteCommentsService } from '../../services/meeting-note-comments.service';
import { TopicEditorTitleComponent } from '../topic-editor-title/topic-editor-title.component';

@Component({
  selector: 'app-topic-editor-description',
  templateUrl: './topic-editor-description.component.html',
  styleUrls: ['./topic-editor-description.component.scss'],
  providers: [OrderByPipe, TopicEditorStrategyService]
})
export class TopicEditorDescriptionComponent extends TopicEditorDefaultComponent implements AfterContentInit {
  
  // Input
  @Input() showTour = false;
  // View childs
  @ViewChild(TopicEditorTitleComponent) topicEditorTitleComp : TopicEditorTitleComponent;
  // Constructor
  constructor(
    _componentFactoryResolver: ComponentFactoryResolver,
    _orderBy: OrderByPipe,
    _renderer2: Renderer2,
    _utilService: UtilService,
    _rangyService: RangyService,
    _commentThreadSrategyService: CommentThreadStrategyService,
    _meetingNoteCommentsService: MeetingNoteCommentsService,
    private _meetingNoteStrategyService: MeetingNoteStrategyService,
    private _topicEditorStrategyService: TopicEditorStrategyService,
  ) {
    super(_componentFactoryResolver, _orderBy, _renderer2, _utilService, _rangyService, _commentThreadSrategyService, _meetingNoteCommentsService);
    this._meetingNoteService = this._meetingNoteStrategyService.getService();
    this._topicEditorService = this._topicEditorStrategyService.getService();
  }
  // After view init
  ngAfterContentInit() {
    setTimeout(() => {
      // topicLineItems
      this.subscriptionTopicItem = this._topicEditorService.topicLineItems.subscribe(items => {
        // console.log(items);
        this._meetingNoteService.updateStoreTopicDescriptionItems(this.topic, items);
      });
    })
  }

  // Load items
  loadItems() {

    this.beforeLoadItems();
    // Load
    setTimeout(() => {
      this._topicEditorService.loadAll(this.topic.id, this.referenceLine, this.topic.descriptionItems)
        .subscribe((items) => {

          this.afterLoadItems(items);
        });
    });

  }

  /**
   * On click
   * @param event
   */
  @HostListener('window:click', ['$event']) onWindowClick(event) {
    const target = $(event.target);
    if (
      target.closest('.topic-description-editor').length === 0 &&
      target.closest('#main-toolbar-menu-topic').length === 0 &&
      target.closest('.topic-editable-toolbar').length === 0 &&
      target.closest('#trigger-add-task').length === 0 &&
      target.closest('#popup-add-task').length === 0 &&
      target.closest('.picker').length === 0
    ) {
      this.focusEditor = false;
      this.topicEditorToolbar.focusToolbar(this.focusEditor, null);
    }
  }
}

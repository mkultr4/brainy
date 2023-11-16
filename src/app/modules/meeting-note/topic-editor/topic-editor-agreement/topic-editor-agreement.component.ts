
import { Component, AfterContentInit, Input, Renderer2, ComponentFactoryResolver, HostListener } from '@angular/core';
import { OrderByPipe } from 'ngx-pipes';
import { TopicEditorDefaultComponent } from '../topic-editor-default/topic-editor-default.component';
import { UtilService } from 'src/app/services/utils/util.service';
import { MeetingNoteStrategyService } from 'src/app/services/meeting-note/meeting-note-strategy.service';
import { TOPIC_LINE_TEXT_EMPTY } from 'src/app/data/mock-meeting-note';
import { TopicEditorStrategyService } from 'src/app/services/meeting-note/topic-editor-strategy.service';
import { RangyService } from 'src/app/services/utils/rangy.service';
import { CommentThreadStrategyService } from 'src/app/services/comments/comment-thread-strategy.service';
import { MeetingNoteCommentsService } from '../../services/meeting-note-comments.service';
import { TopicLineItemReference } from 'src/app/models/meeting-note/topic-line-item-reference';
import { TopicLineItem } from 'src/app/models/meeting-note/topic-line-item';
import { MeetingNoteWorkflowService } from '../../services/meeting-note-workflow.service';

@Component({
  selector: 'app-topic-editor-agreement',
  templateUrl: './topic-editor-agreement.component.html',
  styleUrls: ['./topic-editor-agreement.component.scss'],
  providers: [OrderByPipe, TopicEditorStrategyService]
})
export class TopicEditorAgreementComponent extends TopicEditorDefaultComponent implements AfterContentInit {
  public disabled = true;
  public topicLineTextEmpty = TOPIC_LINE_TEXT_EMPTY;
  public referenceLine = TopicLineItemReference.AGREEMENT;
  public editorId = 'editor-agreement';
  public scrollId = 'scroll-agreements';
  @Input() set topicTitle(title: string) {

    if (title.length === 0 &&
      (this.topicLineItems.length === 0 || (this.topicLineItems.length === 1
        && (this.topicLineItems[0].content.text === '' || this.topicLineItems[0].content.text === this.topicLineTextEmpty)))
    ) {
      this.disabled = true;
    } else {
      this.disabled = false;
    }
  }

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
    private _meetingNoteWorkflowService: MeetingNoteWorkflowService
  ) {
    super(_componentFactoryResolver, _orderBy, _renderer2, _utilService, _rangyService, _commentThreadSrategyService, _meetingNoteCommentsService);
    this._meetingNoteService = this._meetingNoteStrategyService.getService();
    this._topicEditorService = this._topicEditorStrategyService.getService();
  }

  ngAfterContentInit() {
    setTimeout(() => {
      // topicLineItems
      this.subscriptionTopicItem = this._topicEditorService.topicLineItems.subscribe((items: TopicLineItem[]) => {
        if (items.length > 0) {
          // Fix issue doesn´t resolve
          const itemFilter = items.filter(i => i.reference === TopicLineItemReference.AGREEMENT);
          this._meetingNoteWorkflowService.checkStatus(itemFilter);
          this._meetingNoteService.updateStoreAgreementDescriptionItems(this.topic, itemFilter);
        }
      });
    })
  }

  // Load items
  loadItems() {
    this.beforeLoadItems();
    // Load
    setTimeout(() => {
      this._topicEditorService.loadAll(this.topic.id, this.referenceLine, this.topic.agreementItems)
        .subscribe((items) => {
          console.log(items);
          this.afterLoadItems(items);
        });
    });

  }
  // Editor on blur
  editorOnFocusAgreement($event) {
    $event.preventDefault();
    $event.stopPropagation();
    if (this._editable && !this.disabled) {
      this.focusEditor = true;
    }
  }
  /**
 * On click editor
 * @param $event
 */
  editorClickAgreement($event) {
    if ($(event.target).closest('.' + this.topicLineClass).length > 0) {
      // Put the focus in this line to append another elements
      $(this.editorVCR.element.nativeElement).find('.topic-line').removeClass(this.topicLineFocusedClass);
      $(event.target).closest('.topic-line').addClass(this.topicLineFocusedClass);
      if (this._editable && !this.disabled) {
        this.focusEditor = true;
        const focusedLine = $(this.editorVCR.element.nativeElement).find('.' + this.topicLineFocusedClass).get(0);
        this.topicEditorToolbar.focusToolbar(this.focusEditor, focusedLine);
      }
    }

  }
  /**
   * On add comment title
   */
  onAddCommentTitle(){
    this.addCommentClickTextTitle(null, null, 'agreement-title');
  }
  /**
   * On click
   * @param event
   */
  @HostListener('window:click', ['$event']) onWindowClick(event) {
    const target = $(event.target);
    if (
      target.closest('.agreement-editor').length === 0 &&
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

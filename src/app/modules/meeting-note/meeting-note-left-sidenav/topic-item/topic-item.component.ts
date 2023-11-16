import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, HostListener, HostBinding } from '@angular/core';
import { Topic } from '../../../../models/meeting-note/topic';
import { MeetingNoteStrategyService } from '../../../../services/meeting-note/meeting-note-strategy.service';
import { MeetingNoteWorkflowService } from '../../services/meeting-note-workflow.service';
import { TopicLineItem } from 'src/app/models/meeting-note/topic-line-item';
import { TopicEditorStrategyService } from 'src/app/services/meeting-note/topic-editor-strategy.service';
import { SortablejsOptions } from 'angular-sortablejs';
import { OrderByPipe } from 'ngx-pipes';

@Component({
  selector: '[app-topic-item]',
  templateUrl: './topic-item.component.html',
  styleUrls: ['./topic-item.component.scss'],
  providers: [OrderByPipe]
})
export class TopicItemComponent implements OnInit {
  // Public vars
  public collapse = true;
  public iEditable = false;
  public sorting = false;
  public sortableOptions = {
    forceFallback: true,
    fallbackClass: 'sortable-fallback',
    draggable: '.sub-topic-item-draggable',
    disabled: false,
    handle: '.sub-topic-drag-handler',
    // Element is dropped into the list from another list
    onAdd: this.onSortAdd.bind(this),
    // Element is removed from the list into another list
    onStart: this.onSortStart.bind(this),
    onEnd: this.onSortEnd.bind(this),
    onUpdate: this.onSortUpdate.bind(this),
    group: {
      name: 'subtopic-list-group',
      pull: 'clone',
      put: true,
    },
    scroll: $('.topic-list-sidenav').get(0), // or HTMLElement
    scrollSensitivity: 30, // px, how near the mouse must be to an edge to start scrolling.
    scrollSpeed: 5, // px
  }
  // Services
  private _meetingNoteService;
  // Inputs
  @Input() topic: Topic;
  @Input() topicShow: Topic;
  @Input() view;
  @Input() editable;
  @Input() index;
  @Input() visible = true;
  @Input() sortingSubTopic = false;
  // Outputs
  @Output() topicOnSelect = new EventEmitter();
  @Output() topicOnRemove = new EventEmitter();
  @Output() topicOnDragOver = new EventEmitter();
  @Output() topicOnScroll = new EventEmitter();
  @Output() topicOnSortingSubTopic = new EventEmitter();
  @Output() topicOnSortSubTopic = new EventEmitter();
  @Output() topicOnSortAddSubTopic = new EventEmitter();
  // Host bindings
  @HostBinding('class.dragOver') dragOver = false;
  // View child
  @ViewChild('editor') editor: ElementRef;
  @ViewChild('subtopicList') subtopicList: ElementRef;
  constructor(
    private _meetingNoteStrategyService: MeetingNoteStrategyService,
    private _meetingNoteWorkflowService: MeetingNoteWorkflowService,
    private _orderByPipe: OrderByPipe
  ) {
    this._meetingNoteService = this._meetingNoteStrategyService.getService();
  }

  ngOnInit() {
    this.sortableOptions.disabled = !this.editable;
  }
  // Show topic
  showTopic() {
    if ((this.topic.id !== this.topicShow.id) || this.view !== 'topic') {
      this.topicOnSelect.emit(this.topic);
    }
  }
  subTopicClick() {
    this.showTopic();
  }
  /**
   * On change topic title
   * @param $event 
   */
  onChangeTopicTitle(topicTitle) {
    if (this.visible) {
      this._meetingNoteService.updateTopicTitle(this.topic.id, this.topic.title, false).subscribe(
        (topic) => {
          if (this.topicShow.id === this.topic.id) {
            this._meetingNoteWorkflowService.updateTopicTitle(this.topic.title);
          }
        });
    }

  }
  // Remove topic
  removeTopic() {
    this.topicOnRemove.emit(this.topic);
  }
  // Edit title
  editTitle() {
    this.iEditable = true;
    this.sortableOptions.disabled = this.iEditable;
    setTimeout(() => {
      this.placeCaretAtEnd(this.editor.nativeElement);
    });
  }
  // On blur
  blurEditor() {
    setTimeout(() => {
      this.iEditable = false;
      this.sortableOptions.disabled = this.iEditable;
      this._meetingNoteService.updateTopicTitle(this.topic.id, this.topic.title, true).subscribe(
        (topic) => {
          if (this.topicShow.id === this.topic.id) {
            this._meetingNoteWorkflowService.updateTopicTitle(this.topic.title);
          }
        });
    });



  }
  // Focus last character
  placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
      && typeof document.createRange != "undefined") {
      var range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }
  // Collapse
  collapseClick() {
    this.collapse = !this.collapse;
  }
  /**
   * Remove subtopic
   * @param topicLine
   */
  removeSubTopic(topicLine: TopicLineItem) {

    this._meetingNoteService.removeTopicLineItem(topicLine.idTopic, topicLine.id).subscribe((topicLines) => {
    });

  }

  updateSubTopic(topicLine: TopicLineItem) {
    console.log('updateSubTopic',topicLine);
    this._meetingNoteService.updateTopicLineItem(topicLine.idTopic, topicLine).subscribe((topicLines) => {
    });

  }
  // #region Order sub topic

  // Mouse over
  @HostListener('mouseover', ['$event']) mouseover($event) {
    if (this.sortingSubTopic) {
      this.dragOver = true;
      this.topicOnDragOver.emit();
    }

  }

  // Mouse leave
  @HostListener('mouseleave') dragendTopic($event) {
    this.dragOver = false;
    this.topicOnDragOver.emit();
  }

  // On sort start
  onSortStart() {

    $(this.subtopicList.nativeElement).addClass('sorting');
    this.sorting = true;
    this.topicOnSortingSubTopic.emit(this.sorting);

  }
  // On sort end
  onSortEnd() {

    $(this.subtopicList.nativeElement).removeClass('sorting');
    this.sorting = false;
    this.topicOnSortingSubTopic.emit(this.sorting);

  }
  // On sort update
  onSortUpdate(event) {
    // Sub topic updated
    const oldIndex = event.oldIndex;
    const newIndex = event.newIndex;
    // Get all subtopics
    const subtopicItems = this.topic.descriptionItems.filter(i => i.type === 'sub-topic');
    // Items sorter
    const newItem = subtopicItems[newIndex];
    const oldItem = subtopicItems[oldIndex];
    const oldOrder = newItem.order;
    const newOrder = oldItem.order;
    // Set orders
    newItem.order = newOrder;
    oldItem.order = oldOrder;
    // New array without these items
    console.log(this.topic
      .descriptionItems);
    const newArray = this.topic
      .descriptionItems
      .filter(
        i =>
          i.id !== newItem.id && i.idParent !== newItem.id
          && i.id !== oldItem.id && i.idParent !== oldItem.id);
    // New Subtopic array
    const newSubtopicArray = this.topic
      .descriptionItems
      .filter(i => i.idParent === newItem.id);
    // Add subtopic
    newSubtopicArray.unshift(newItem);
    // Append new array
    newArray.splice(newItem.order - 1, 0, ...newSubtopicArray);
    // Old Subtopic array
    const oldSubtopicArray = this.topic
      .descriptionItems
      .filter(i => i.idParent === oldItem.id);
    // Add subtopic
    oldSubtopicArray.unshift(oldItem);
    // Append new array
    newArray.splice(oldItem.order - 1, 0, ...oldSubtopicArray);
    // Order
    let order = 1;
    newArray.forEach((tl, index) => {
      //  console.log(tl, index);
      newArray[index].order = order
      order++;
    });
    console.log('onSortUpdate');
    this._meetingNoteService.updateTopicDescriptionItems(this.topic, newArray).subscribe(response => {
      this.topicOnSortSubTopic.emit();
    });
  }

  // On sort add
  async onSortAdd(event) {
    // Get data
    const itemDropped = event.item;
    const subtTopicId = itemDropped.dataset.id;
    const topicId = itemDropped.dataset.topicId;
    const newIndexEvent = event.newIndex;
    const subtopicItems = this.topic.descriptionItems.filter(i => i.type === 'sub-topic');
    // Get subtopic dragged
    let subtopicContent = [];
    await this._meetingNoteService.getSubtopicContent(topicId, subtTopicId).subscribe(items => {
      subtopicContent = Object.assign([], items);
      
    });
    // Set relationship
    subtopicContent.forEach((s, index) => {
      s.idTopic = this.topic.id;
    })
    // Subtopic old
    const subTopicOld = subtopicItems[newIndexEvent];
    let newIndex = 1;
    if (subTopicOld) {
      newIndex = subTopicOld.order - 1;
    } else {
      newIndex = newIndexEvent;
    }
    let subtTopicOldContent = [];
    if (subTopicOld) {
      subtTopicOldContent = this.topic
        .descriptionItems.filter(i => i.idParent === subTopicOld.id);
      subtTopicOldContent.unshift(subTopicOld);
    }
    console.log('subtTopicOldContent,', subtTopicOldContent);
    // Generate new array dropped
    let newArrayDropped = [];
    if (subTopicOld) {
      console.log('filtro por el old')
      newArrayDropped = this.topic.descriptionItems
        .filter(i => i.idParent !== subTopicOld.id && i.id !== subTopicOld.id);
    } else {
      console.log('no filtro por el old')
      newArrayDropped = this.topic.descriptionItems;
    }

    // Put the old
    if (subTopicOld) {
      // Add new topic
      newArrayDropped.splice(newIndex, -1, ...subtopicContent);
      // Add old content
      newArrayDropped.splice(newIndex + subtopicContent.length, 0, ...subtTopicOldContent);
    } else {
      // Push
      newArrayDropped.push(...subtopicContent);
    }
    let order = 1;
    newArrayDropped.forEach((tl, index) => {
      //  console.log(tl, index);
      newArrayDropped[index].order = order
      order++;
    });
    // Update dropped
    this._meetingNoteService.updateTopicDescriptionItems(this.topic.id, newArrayDropped).subscribe(response => {
      if (this.topicShow.id === this.topic.id) {
        this.topicOnSortSubTopic.emit();
      }

      this.showTopic()
      this.collapse = false;
    });
    // Remove old
    this._meetingNoteService.removeSubtopicContent(topicId, subtTopicId).subscribe();
  }
  // #endregion 
}

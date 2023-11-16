import {
  Component, Output, Input, ViewChild, ViewContainerRef, ElementRef, ComponentFactoryResolver,
  Renderer2, EventEmitter, HostListener, AfterContentInit, AfterViewInit, OnDestroy
} from '@angular/core';
import { TopicLineItem } from 'src/app/models/meeting-note/topic-line-item';
import { ISubscription } from 'rxjs/Subscription';
import * as uuid from 'uuid/v4';
import { WorkspaceAccess } from 'src/app/models/workspace/workspace-access';
import { Topic } from 'src/app/models/meeting-note/topic';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { TopicEditorToolbarComponent } from '../topic-editor-toolbar/topic-editor-toolbar.component';
import { OrderByPipe } from 'ngx-pipes';
import { UtilService } from 'src/app/services/utils/util.service';
import { TopicFile } from 'src/app/models/meeting-note/topic-file';
import { Task } from 'src/app/models/meeting-note/task';
import { RangyService } from 'src/app/services/utils/rangy.service';
import { CommentThreadStrategyService } from 'src/app/services/comments/comment-thread-strategy.service';
import { CommentThread, POINT_SIZE } from 'src/app/models/comments/comment-thread';
import { MeetingNoteCommentsService } from '../../services/meeting-note-comments.service';
import { TopicLineItemReference } from 'src/app/models/meeting-note/topic-line-item-reference';
import { CommentThreadStatus } from 'src/app/models/comments/comment-thread-status';
import { ParticipantType } from 'src/app/models/participants/participant-type';
import { createVerify } from 'crypto';
import { TopicLineLinkComponent } from 'src/app/modules/share-meeting-note/topic-line-link/topic-line-link.component';
import { TopicLineAttachmentComponent } from 'src/app/modules/share-meeting-note/topic-line-attachment/topic-line-attachment.component';
import { TopicLineImageGalleryComponent } from 'src/app/modules/share-meeting-note/topic-line-image-gallery/topic-line-image-gallery.component';
import { TopicLineSubTopicComponent } from 'src/app/modules/share-meeting-note/topic-line-sub-topic/topic-line-sub-topic.component';
import { TopicLineTextComponent } from 'src/app/modules/share-meeting-note/topic-line-text/topic-line-text.component';
import { TopicLineVideoComponent } from 'src/app/modules/share-meeting-note/topic-line-video/topic-line-video.component';
import { TopicLineTaskComponent } from 'src/app/modules/share-meeting-note/topic-line-task/topic-line-task.component';

@Component({
  selector: 'app-topic-editor-default',
  templateUrl: './topic-editor-default.component.html',
  styleUrls: ['./topic-editor-default.component.scss'],
  providers: [OrderByPipe]
})
export class TopicEditorDefaultComponent implements AfterViewInit, OnDestroy {
  // Editor
  public editorChangesObserver: MutationObserver;
  public editorId = 'editor-description';
  public scrollId = 'scroll-topic-description';
  public focusEditor = false;
  public subtTopicPlaceHolder = 'Escribe un subtema';
  public lastViewModel: any = null;
  public topicLineItems: Array<TopicLineItem> = new Array<TopicLineItem>();
  public sorting = false;
  public topicLineClass = 'topic-line';
  public topicLineFocusedClass = 'focused-in';
  private topicLineHoverClass = 'mouseover';
  public referenceLine = TopicLineItemReference.DESCRIPTION;
  public _editable = false;
  // Comments
  public _commentThreads = [];
  public _filterStatuses = [];
  public _filterParticipantTypes = [];
  public isShowToolbarComments = false;
  public forceShowToolbarComments = false;
  public enabledCommentsAction = false;
  public toolbarCommentsTop = 0;
  // Subscriptions
  public subscriptionToolbarAction: ISubscription;
  public subscriptionTopicItem: ISubscription;
  public subscriptionGalleryResize: ISubscription;
  // Services
  public _meetingNoteService;
  public _topicEditorService;
  public _commentThreadService;
  // Inputs
  @Input() topic: Topic;
  @Input() set commentThreads(commentThreads: CommentThread[]) {
    this._commentThreads = commentThreads;
    // Set the comment for gallery
    this.setCommentsGallery();
    // Set the comments for videos
    this.setCommentsVideos();
  };
  @Input() set editable(editable: boolean) {
    this._editable = editable;
    this.topicLineItems.forEach(items => {
      items.componentReference.instance.editable = this._editable;
    });
  };
  @Input() enableComments: boolean;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() commentThreadStatuses;
  @Input() participantTypes;
  @Input() set filterStatuses(filterStatuses: Array<CommentThreadStatus>) {
    this._filterStatuses = filterStatuses;
    this.topicLineItems.filter(i => i.type === 'gallery' || i.type === 'video').forEach(items => {
      items.componentReference.instance.filterStatuses = this._filterStatuses;
    });
  };
  @Input() set filterParticipantTypes(filterParticipantTypes: Array<ParticipantType>) {
    this._filterParticipantTypes = filterParticipantTypes;
    this.topicLineItems.filter(i => i.type === 'gallery' || i.type === 'video').forEach(items => {
      items.componentReference.instance.filterParticipantTypes = this.filterParticipantTypes;
    });
  };
  @Input() topicEditionLogs = [];
  // Outputs
  @Output() editorOnChange = new EventEmitter();
  // View childs
  @ViewChild('scrollDescription', { read: PerfectScrollbarDirective }) scrollDescription: PerfectScrollbarDirective;
  @ViewChild('editor', { read: ViewContainerRef }) editorVCR: ViewContainerRef;
  @ViewChild('taskList') taskList: ElementRef;
  @ViewChild('topicEditorToolbar') topicEditorToolbar: TopicEditorToolbarComponent;
  // Constructor
  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _orderBy: OrderByPipe,
    private _renderer2: Renderer2,
    private _utilService: UtilService,
    private _rangyService: RangyService,
    private _commentThreadSrategyService: CommentThreadStrategyService,
    private _meetingNoteCommentsService: MeetingNoteCommentsService
  ) {
    this._commentThreadService = this._commentThreadSrategyService.getService();
  }
  // After view init
  ngAfterViewInit() {
    setTimeout(() => {
      $(this.editorVCR.element.nativeElement).on('content-change', () => {
        console.log('change');
        this.editorRead('content-change-event');
      });
    });
  }
  /**
   *  On input content editable
   * @param $event 
   */
  editorRead($event?) {
    if (!this.sorting) {
      let html = null;
      html = this.editorVCR.element.nativeElement.innerHTML;
      const checkEmpty = html.replace(' ', '').replace('<br>', '');
      const topicLines = this.editorVCR.element.nativeElement.querySelectorAll('.topic-line');

      if (!html || html === '' || html.length === 0) {
        // Add empty line text
        this.addText();
        // Call read
        this.editorRead('recursive');

      } else if (topicLines.length === 1) {// If empty content

        const singleLine = topicLines[0];
        const cleanLine = this._utilService.cleanupTemplateString(singleLine.innerHTML);


        if (cleanLine === '<br>' || cleanLine === '<span></span>' || cleanLine === '<span><br></span>' || cleanLine === '') {
          this._renderer2.addClass(this.editorVCR.element.nativeElement, 'empty');
        } else {
          this._renderer2.removeClass(this.editorVCR.element.nativeElement, 'empty');
        }
      } else {
        this._renderer2.removeClass(this.editorVCR.element.nativeElement, 'empty');
      }
      // Update text
      this._topicEditorService.updateDescription(html).subscribe();
      // Order 
      this.orderItems();
      setTimeout(() => {
        // Check empty subtopic
        this.checkEmptySubTopic();
        // Check empty 
        this.fixEmptyText();
        // Trigger resize
        $('.comment-thread-point-meeting-note').trigger('resize');
        $('.topic-edition-log').trigger('resize');
      });
    }
  }
  // Check subtopic empty
  checkEmptySubTopic() {
    $(this.editorVCR.element.nativeElement).find('.topic-line-sub-topic')
      .each((index, topicLineItem) => {
        const cleanLine = topicLineItem.innerHTML;
        if (cleanLine === '<br>' || cleanLine === '<span></span>' || cleanLine === '<span><br></span>' || cleanLine === '') {
          $(topicLineItem).addClass('empty');
          if (cleanLine === '<br>' || cleanLine === '') {
            $(topicLineItem).get(0).innerHTML = '<span><br></span>'
          }
        } else {
          $(topicLineItem).removeClass('empty');
          // Normalize sub topic
          this.normalizeSubTopicContent(topicLineItem);
        }
        let showPlaceHolder = true;
        let countLinesSubTopic = 1;
        $(this.editorVCR.element.nativeElement)
          .find(`.topic-line[data-id-parent="${topicLineItem.id}"]`)
          .toArray().forEach((line, index2) => {
            if ($(line).hasClass('topic-line-text') && showPlaceHolder) {
              const cleanLine = line.innerHTML;
              if (cleanLine === '<br>' || cleanLine === '<span></span>' || cleanLine === '<span><br></span>' || cleanLine === '') {
                showPlaceHolder = true;
              } else {
                showPlaceHolder = false;
              }
            } else {
              showPlaceHolder = false;
            }
            if (!showPlaceHolder) {
              return false;
            }
          })
        // console.log(showPlaceHolder, 'showPlaceHolder');
        const firstLineText = $(this.editorVCR.element.nativeElement).find(`.topic-line-text[data-id-parent="${topicLineItem.id}"]:first`);
        // console.log(firstLineText);
        if (showPlaceHolder) {
          $(firstLineText).addClass('sub-topic-empty');
        } else {
          $(firstLineText).removeClass('sub-topic-empty');
        }

      });
  }
  // Normalize empty subtopic
  normalizeSubTopicContent(topicLineItem) {
    const innerHTML = topicLineItem.innerHTML;
    const div = document.createElement('div');
    div.innerHTML = innerHTML;
    if ($(div).find('> span').length > 1) {
      let newInnerHtml = '';
      $(div).find('span').each((index, span) => {
        newInnerHtml += span.innerText;
      });
      topicLineItem.innerHTML = `<span>${newInnerHtml}</span>`;
    }

  }
  // Fix empty text
  fixEmptyText() {
    $(this.editorVCR.element.nativeElement).find('.topic-line-text').each((index, topicLineItem) => {

      const cleanLine = topicLineItem.innerHTML;
      if (cleanLine === '<br>' || cleanLine === '') {
        $(topicLineItem).get(0).innerHTML = '<span><br></span>'
      }
    });
  }
  // Editor on blur
  editorOnFocus($event) {
    if (this._editable) {
      this.focusEditor = true;
    }
  }
  // Editor on blur
  editorOnBlur($event) {
    //  this.focusEditor = false;
    //    this.topicDescriptionOnFocus.emit(this.focusEditor);
    // this.topicEditorToolbar.focusToolbar(false, null);
  }
  // Editor on enter
  editorOnEnter($event) {
    let lineToFocus = null;
    const topicFocusList = this.editorVCR.
      element.nativeElement.querySelectorAll('.' + this.topicLineClass + '.' + this.topicLineFocusedClass);
    if (topicFocusList.length > 0) {
      lineToFocus = topicFocusList[topicFocusList.length - 1];
    }

    if (lineToFocus && $(lineToFocus).prev().hasClass('topic-line-text')) {
      // console.log('text on enter');
      $(lineToFocus).removeClass('sub-topic-empty');
      this.texOnEnter(lineToFocus);
      setTimeout(() => {
        this.editorRead();
      })
    } else if (lineToFocus && $(lineToFocus).prev().hasClass('topic-line-sub-topic')) {

      // console.log('sub topic  on enter');
      this.subTopicEnter(lineToFocus);
      setTimeout(() => {
        this.editorRead();
      })
    } else {
      const node = this.getSelectionStart();
      if ($(node).closest('.topic-line-text')) {
        this.editorEnterText($event, node);

      }
      // console.error('enter',this.getSelectionStart());
    }
  }
  // Editor on text enter
  editorEnterText($event, node) {
    // Check if div
    if (node.nodeName === 'DIV') {
      // If no has sibling
      const previusSiblinbg = node.previousSibling;
      console.log(previusSiblinbg);
      if (previusSiblinbg === null) {
        const topicLine = $(node).closest('.topic-line-text');
        topicLine.get(0).innerHTML = '<span><br></span>'
      } else if (previusSiblinbg.nodeName === 'OL' || previusSiblinbg.nodeName === 'UL') {
        $(node).remove();
        this.addText(null, true, false);
      }
    }


  }
  // Get selection
  getSelectionStart() {
    var node = document.getSelection().anchorNode;
    return (node.nodeType == 3 ? node.parentNode : node);
  }

  // Editor on key press
  editorKeyPress(event) {
    setTimeout(() => {
      // Enter
      if (event.keyCode === 13) {
        this.editorOnEnter(event);
      }
    });
  }
  /**
  * Navigate with key
  * @param event
  */
  navigateKey(event) {
    if (event.key === 'ArrowUp') {
      this.focusPreviousLine();
    } else if (event.key === 'ArrowDown') {
      this.focusNextLine();
    }
  }
  /**
   * Handle delete 
   * @param event 
   */
  handleDelete(event) {
    // When is backspace
    if (event.key === 'Backspace') {
      // Get focused line
      const line = this.getFocusedLine();
      if (line.hasClass('topic-line-sub-topic')) {
        const cleanLine = line.get(0).innerHTML;
        if (cleanLine === '<br>' || cleanLine === '<span></span>' || cleanLine === '<span><br></span>' || cleanLine === '') {
          const previusSiblinbg = line.prev();
          console.log(previusSiblinbg);
          if (previusSiblinbg.length === 0) {
            line.remove();
            setTimeout(() => {
              $(previusSiblinbg).click();
            })
          }

        }
      }
    } else if (event.key === 'Delete') {
      console.log(event);
    }
  }
  /**
   * Focus previous line
   * @param index
   */
  focusPreviousLine() {

    const line = this.getFocusedLine().prev();
    if (line) {
      setTimeout(() => {
        $(line).click();
        // this.seCaretPosition(line);
      });

    }
  }
  /**
   * Focus next line
   * @param index
   */
  focusNextLine() {
    const line = this.getFocusedLine().next();
    if (line) {
      setTimeout(() => {
        $(line).click();
        // this.seCaretPosition(line);
      });

    }

  }
  /**
   * Editor key up
   * @param event
   */
  editorKeyUp(event) {

  }
  /**
   * Editor key down
   * @param event 
   */
  editorKeyDown(event) {
    // console.log(event);
    // Navigate
    this.navigateKey(event)
    // Handle delete
    this.handleDelete(event);
    //Prevent enter in sub topic
    if (event.keyCode === 13) {
      const caretEl = this.getCaretPosition();
      if ($(caretEl).closest('.topic-line-sub-topic').length > 0) {
        event.preventDefault();
        event.stopPropagation();
        const topicLineSubTopic = $(caretEl).closest('.topic-line-sub-topic');
        this.seCaretPosition(topicLineSubTopic.next().get(0));
      }

    }


  }
  @HostListener('dragover', ['$event'])
  onDragover($event) {
    $event.preventDefault();
  }
  @HostListener('drop', ['$event'])
  onDrop($event) {
    $event.preventDefault();
  }
  @HostListener('paste', ['$event'])
  onPaste($event) {
    $event.preventDefault();
    let text = ($event.originalEvent || $event).clipboardData.getData('text/plain');
    console.log(text);
    this.insertTextAtCursor(text);
    //   document.execCommand('insertHTML', false, text);
    this.editorRead(null);
  }

  insertTextAtCursor(text) {
    let selection = window.getSelection();
    let range = selection.getRangeAt(0);
    range.deleteContents();
    let node = document.createTextNode(text);
    range.insertNode(node);
    selection.collapseToEnd();

  }

  // Observe Dom Changes
  observeDOMChanges() {
    this.editorChangesObserver = new MutationObserver(mutations => {
      mutations.forEach((mutation) => {
        // Added nodes
        if (mutation.addedNodes.length) {
          let triggerEditorRead = false;
          for (let i = 0; i < mutation.addedNodes.length; ++i) {
            const item = mutation.addedNodes[i];
            const itemId = item['id'];

            if ($(item).hasClass(`${this.topicLineClass}`)) {
              const topicLine = this.topicLineItems.filter(t => t.id === itemId)[0];
              const order = $('#' + itemId).index();
              if (topicLine && topicLine.order === order) {
                topicLine.order = order;
                this._topicEditorService.updateTopicLineItem(topicLine).subscribe();
              } else {
                triggerEditorRead = true;
                // Find ind draft and add
                const topicLineItemDraft = this._topicEditorService.getTopicLineItemDraft(itemId);
                if (topicLineItemDraft) {
                  //   console.log(this.referenceLine);
                  this._topicEditorService.addTopicLineItem(topicLineItemDraft).subscribe();
                  // this.editorVCR.insert(topicLineItemDraft.componentReference.hostView);
                  // Remove from draft
                  this._topicEditorService.removeTopicLineItemDraf(topicLineItemDraft.id);
                } else {
                  if ($(item).hasClass(`topic-line-text`)) {
                    console.log(this.topic.id === $(item).data('topic-id'));
                    // this.texOnPaste(item)
                  }
                }

              }
            } else {
              // If comment wrapper
              if ($(item).hasClass('comment-thread-selection') && !$(item).hasClass('not-saved')) {
                const commentThreadId = $(item).data('comment-id');
                if (this.topic.commentThreads.filter(c => c.id === commentThreadId).length === 0) {
                  $(item).contents().unwrap();
                }
              }
            }
          }
          setTimeout(() => {
            if (triggerEditorRead) {
              this.editorRead('observe dom changes');
            }
            this.scrollDescription.update();
          });
        }
        // Remove node
        if (mutation.removedNodes.length > 0) {
          let triggerEditorRead = false;
          // On remove
          for (let i = 0; i < mutation.removedNodes.length; ++i) {
            const item = mutation.removedNodes[i];
            const itemId = item['id'];
            if ($(item).hasClass(`${this.topicLineClass}`)) {
              if (!document.getElementById(itemId)) {
                // Find the topicline item remove
                const topicLine = this.topicLineItems.filter(t => t.id === itemId)[0];
                if (topicLine) {
                  triggerEditorRead = true;
                  // Remove of view reference
                  const hostView = topicLine.componentReference.hostView;
                  const index = this.editorVCR.indexOf(hostView);
                  this.editorVCR.detach(index);
                  // Remove topic line
                  this.removeLine(topicLine);
                  // Create draft
                  this._topicEditorService.addTopicLineItemDraf(topicLine);
                  // Check and focus
                  if (mutation.previousSibling && !$(item).hasClass('sort-remove')) {
                    const itemToFocusId = mutation.previousSibling['id'];
                    const topicLineItem =
                      this.topicLineItems.filter(i => i.id === itemToFocusId)[0];
                    if (topicLineItem) {
                      this.focusTopicLine(topicLineItem);
                    }
                  }
                  // If task element remove comment
                  if (topicLine.type === 'task') {
                    this.topic.commentThreads.filter(c => c.objectReference === 'task' && c.objectReferenceId === topicLine.id).forEach(c => {
                      this._commentThreadService.remove(c.id).subscribe();
                    });
                  }
                  if (topicLine.type === 'video') {
                    this.topic.commentThreads.filter(c => c.objectReference === 'video' && c.objectReferenceId === topicLine.id).forEach(c => {
                      this._commentThreadService.remove(c.id).subscribe();
                    });
                  }
                }
              }
            } else {
              // If item is not child
              if ($(item).hasClass('comment-thread-selection')) {
                triggerEditorRead = true;
                const commentThreadId = $(item).data('comment-id');
                if ($(this.editorVCR.element.nativeElement).find(`.comment-thread-selection-${commentThreadId}`).length === 0) {
                  // console.log('remove comment', commentThreadId);
                  this._commentThreadService.remove(commentThreadId).subscribe();
                }
              } else if ($(item).find('.comment-thread-selection').length > 0) {
                triggerEditorRead = true;
                // If item is child
                const commentThreadId = $(item).find('.comment-thread-selection').data('comment-id');
                if ($(this.editorVCR.element.nativeElement).find(`.comment-thread-selection-${commentThreadId}`).length === 0) {
                  // console.log('remove comment', commentThreadId);
                  this._commentThreadService.remove(commentThreadId).subscribe();
                }
              }


            }
          }
          setTimeout(() => {
            if (triggerEditorRead) {
              this.editorRead('remove node observe dom changes');
              this.scrollDescription.update();
            }
          });
        }

      });
    });
    const config = { childList: true, characterData: true, subtree: true };
    this.editorChangesObserver.observe(this.editorVCR.element.nativeElement, config);
  }

  getTopicLine(item, itemId) {
    const itemFind = this.topicLineItems.filter(t => t.id === itemId)[0];
    console.log(itemFind);
    console.log(item.innerHTML);
  }
  /**
   * On trigger action toolbar
   * @param meetingNoteToolbarAction
   */
  toolbarOnAction(meetingNoteToolbarAction) {
    // Toolbar actions
    if (meetingNoteToolbarAction) {
      // Text
      if (meetingNoteToolbarAction.type === 'text') {
        // Add text
        this.addText(null, true);
      }
      // Subcategory
      if (meetingNoteToolbarAction.type === 'sub-topic') {
        this.addSubTopic(null, true);
      }
      // Video
      if (meetingNoteToolbarAction.type === 'video') {
        this.addVideo(null, meetingNoteToolbarAction.args, true);
      }
      // Image
      if (meetingNoteToolbarAction.type === 'image') {
        this.addImage(null, meetingNoteToolbarAction.args, true);
      }
      // Link
      if (meetingNoteToolbarAction.type === 'link') {
        this.addLink(null, meetingNoteToolbarAction.args, true);
      }
      // Attachment
      if (meetingNoteToolbarAction.type === 'attachment') {
        this.addAttachment(null, meetingNoteToolbarAction.args, true);

      }
      // Read
      setTimeout(() => {
        this.editorRead('add line');
      });
    }
  }
  // After load items
  afterLoadItems(items: TopicLineItem[]) {
    setTimeout(() => {
      this.observeDOMChanges();
      this.editorVCR.element.nativeElement.blur();
      this.topicLineItems = this._orderBy.transform(items, ['order']);
      this.topicLineItems.forEach((i, index) => {
        // console.log('draw', i);
        const ref = this.drawTopicLineItem(i);
        this.topicLineItems[index].componentReference = ref;
        ref.instance.editable = this._editable;
        // Inser host view
        // this.editorVCR.insert(ref.hostView);
        // Append
        this._renderer2.appendChild(this.editorVCR.element
          .nativeElement, ref.instance.elementRef.nativeElement);
      });
      setTimeout(() => {
        // Set comments for gallery
        this.setCommentsGallery();
        // Set the comments for video
        this.setCommentsVideos();
        // Read
        this.editorRead('after load items');
        // Update
        this.scrollDescription.update();
      });
    });
  }
  // Load items
  beforeLoadItems() {
    this.topicLineItems = [];
    // Disconnect
    if (this.editorChangesObserver) {
      this.editorChangesObserver.disconnect();
    }
    // Clear view
    this.editorVCR.clear();
    // Inner html Empty
    this.editorVCR.element.nativeElement.innerHTML = '';

  }
  // Update items
  updateItems(addedLines: TopicLineItem[], updateItems: TopicLineItem[], removeItems: TopicLineItem[]) {
    addedLines.forEach((i: TopicLineItem) => {
      console.log('not implemented added');
    })
    updateItems.forEach((itemUpdated: TopicLineItem) => {
      const topicLineItem = this.topicLineItems.filter(i => i.id === itemUpdated.id)[0];
      if (topicLineItem.type === 'text' || topicLineItem.type === 'sub-topic') {
        topicLineItem.content.text = itemUpdated.content.text;
        topicLineItem.componentReference.instance.elementRef.nativeElement.innerHTML = itemUpdated.content.text;
      }
    })
    removeItems.forEach((i: TopicLineItem) => {
      console.log('not implemented remove');
    });
  }
  // Generate the components
  drawTopicLineItem(item: TopicLineItem) {
    let ref: any;
    // Text
    if (item.type === 'text') {
      let style = '';
      if (item.content.style) {
        style = item.content.style;
      }
      ref = this.generateLineText(item.id, item.content.text, null, style);
    }
    if (item.type === 'sub-topic') {
      ref = this.generateLineSubtopic(item.id, item.content.text);
    }
    if (item.type === 'link') {
      ref = this.generateLineLink(item.id);
      ref.instance.topicLineItem = item;
    }
    if (item.type === 'attachment') {
      ref = this.generateLineAttachment(item.id);
      ref.instance.topicLineItem = item;
    }
    // Line Video
    if (item.type === 'video') {
      ref = this.generateLineVideo(item.id);
      ref.instance.topicLineItem = item;
    }
    // Line gallery
    if (item.type === 'gallery') {
      ref = this.generateLineImageGallery(item.id);
      ref.instance.topicLineItem = item;
    }
    // Line tastk
    if (item.type === 'task') {
      ref = this.generateLineTask(item.id);
      ref.instance.topicLineItem = item;

    }
    return ref;
  }
  /**
   * On click editor
   * @param $event
   */
  editorClick($event) {
    if ($(event.target).closest('.' + this.topicLineClass).length > 0) {
      // Put the focus in this line to append another elements
      $(this.editorVCR.element.nativeElement).find('.topic-line').removeClass(this.topicLineFocusedClass);
      $(event.target).closest('.topic-line').addClass(this.topicLineFocusedClass);
      if (this._editable) {
        this.focusEditor = true;
        const focusedLine = $(this.editorVCR.element.nativeElement).find('.' + this.topicLineFocusedClass).get(0);
        this.topicEditorToolbar.focusToolbar(this.focusEditor, focusedLine);
      }
    }

  }
  /**
  * On Change line
  * @param topicLine
  */
  changeLine(topicLine: TopicLineItem) {
    this._topicEditorService.updateTopicLineItem(topicLine).subscribe((topicLine) => {
      this.editorOnChange.emit();
    });
  }
  /**
   * Remove line
   * @param topicLine
   */
  removeLine(topicLine: TopicLineItem) {
    console.log(topicLine);
    this._topicEditorService.removeTopicLineItem(topicLine.id).subscribe((topicLines) => {
      // Get index
      const index = this.topicLineItems.indexOf(topicLine);
      this.topicLineItems.splice(index, 1);
    });
  }
  /**
   * Orde node elements
   */
  orderItems() {
    // console.log(`order items ${this.referenceLine}`, this.topicLineItems);
    let order = 1;
    let idParent = undefined;
    setTimeout(() => {
      // Get all html topic lines
      $(this.editorVCR.element.nativeElement).find('.' + this.topicLineClass).each((index, topicLine) => {
        // Get node id
        const topicLineId = topicLine.id;
        // console.log(topicLineId);
        // Find item
        const topicLineItem = this.topicLineItems.filter(i => i.id == topicLineId)[0];
        if (topicLineItem) {
          // Check if subtopic
          if (topicLineItem.type === 'sub-topic') {
            idParent = topicLineItem.id;
          }
          // Check if not subtopic put parent id
          if (topicLineItem.type !== 'sub-topic') {
            topicLineItem.idParent = idParent;
            $(`#${topicLineId}`).attr('data-id-parent', idParent);
          }
          // Order
          topicLineItem.order = order;
        }
        order++;

      });
    });


    this._topicEditorService.updateItems(this.topicLineItems).subscribe();
  }
  /**
   * Resize editor
   */
  resizeEditor() {
    this.scrollDescription.update();
    // Resize videos
    this.topicLineItems.filter(i => i.type === 'video').forEach(items => {
      items.componentReference.instance.resizeVideo();
    });
  }

  /**
   * Get focused line
   * @param extraClass 
   */
  private getFocusedLine(extraClass = '') {
    const element = $(this.editorVCR.element.nativeElement).find('.' + this.topicLineFocusedClass + extraClass);
    return element;
  }
  /**
   * On text enter add topic line and focused
   * @param lineToFocus
   */
  texOnEnter(lineToFocus) {
    // Remove focus
    $(this.editorVCR.element.nativeElement).find('.' + this.topicLineClass).removeClass(this.topicLineFocusedClass);
    const newLineId = uuid();
    let cleanLine = this._utilService.cleanupTemplateString(lineToFocus.innerHTML);
    if (cleanLine === '<br>' || cleanLine === '' || cleanLine === '<span></span>') {
      cleanLine = '<span><br></span>';
    }
    const reference = this.generateLineText(newLineId, cleanLine, lineToFocus);
    const topicLineText = new TopicLineItem();
    topicLineText.componentReference = reference;
    topicLineText.id = newLineId;
    topicLineText.idTopic = this.topic.id;
    topicLineText.type = 'text';
    topicLineText.content = { text: reference.instance.elementRef.nativeElement.innerHTML };
    topicLineText.order = $('#' + newLineId).index();

    this._topicEditorService.addTopicLineItem(topicLineText).subscribe(t => {
      // Update array before add
      this.topicLineItems.push(t);
      // When add order items
      setTimeout(() => {
        $('#' + t.id).click();
        this.editorOnChange.emit();
      })
    });
  }

  texOnPaste(linePush) {
    // Remove focus
    const newLineId = uuid();
    let cleanLine = this._utilService.cleanupTemplateString(linePush.innerHTML);
    if (cleanLine === '<br>' || cleanLine === '' || cleanLine === '<span></span>') {
      cleanLine = '<span><br></span>';
    }
    const reference = this.generateLineText(newLineId, cleanLine, linePush);
    const topicLineText = new TopicLineItem();
    topicLineText.componentReference = reference;
    topicLineText.id = newLineId;
    topicLineText.idTopic = this.topic.id;
    topicLineText.type = 'text';
    topicLineText.content = { text: reference.instance.elementRef.nativeElement.innerHTML };
    topicLineText.order = $('#' + newLineId).index();

    this._topicEditorService.addTopicLineItem(topicLineText).subscribe(t => {
      // Update array before add
      this.topicLineItems.push(t);
      // When add order items
      setTimeout(() => {
        $('#' + t.id).click();
        this.editorOnChange.emit();
      })
    });
  }
  /**
   * Sub topic on enter add topic line and focused
   * @param topicLine
   */
  subTopicEnter(lineToFocus) {
    // Remove focus
    $(this.editorVCR.element.nativeElement).find('.' + this.topicLineClass).removeClass(this.topicLineFocusedClass);
    const newLineId = uuid();
    let cleanLine = this._utilService.cleanupTemplateString(lineToFocus.innerHTML);
    if (cleanLine === '<br>' || cleanLine === '' || cleanLine === '<span></span>') {
      cleanLine = '<span><br></span>';
    }
    const reference = this.generateLineSubtopic(newLineId, cleanLine, lineToFocus);
    const topicLineSubtopic = new TopicLineItem();
    topicLineSubtopic.componentReference = reference;
    topicLineSubtopic.id = newLineId;
    topicLineSubtopic.idTopic = this.topic.id;
    topicLineSubtopic.type = 'sub-topic';
    topicLineSubtopic.content = { text: reference.instance.elementRef.nativeElement.innerHTML };
    topicLineSubtopic.order = $('#' + newLineId).index();
    // Add subtopic line
    this._topicEditorService.addTopicLineItem(topicLineSubtopic).subscribe(t => {
      // Update array before add
      this.topicLineItems.push(t);
      // When add order items
      this.orderItems();
      setTimeout(() => {
        $('#' + t.id).click();
        this.editorOnChange.emit();
      })
    });
    // Add topic line tex
    this.addText(null);


  }

  /**
   * Focus index
   * @param index 
   */
  focusIndex(index) {
    if (index > (this.topicLineItems.length - 1)) {
      index = this.topicLineItems.length - 1;
    } else if (index === -1) {
      index = 0;
    }
    const topicSibling = this.topicLineItems[index];
    if (topicSibling) {
      setTimeout(() => {
        $('#' + topicSibling.id).click();
        this.focusTopicLineSibling(topicSibling);
      });

    }
  }

  /**
   * Focus topic line sibling
   * @param topicSibling
   */
  focusTopicLineSibling(topicSibling) {
    if (topicSibling.type === 'text' || topicSibling.type === 'sub-topic') {
      $('#' + topicSibling.id).find('.topic-line-text-editor').focus();
    }
    if (topicSibling.type === 'video') {
      $('#' + topicSibling.id).find('.link-focusable').focus();
    }
    if (topicSibling.type === 'gallery') {

      $('#' + topicSibling.id).find('.topic-gallery-item:first').click();
      $('#' + topicSibling.id).find('.topic-gallery-item:first').find('.link-focusable').focus();
    }
    if (topicSibling.type === 'link' || topicSibling.type === 'attachment') {
      $('#' + topicSibling.id).find('a').focus();
    }
  }
  /**
   * Focus topic line item
   * @param topicLine 
   */
  focusTopicLine(topicLine: TopicLineItem) {
    if (topicLine.type === 'text' || topicLine.type === 'sub-topic') {
      $(`#${topicLine.id}`).click();
    }
    if (topicLine.type === 'video') {
      $(`#${topicLine.id}`).find('.link-focusable').focus();
    }
    if (topicLine.type === 'gallery') {
      $(`#${topicLine.id}`).find('.topic-gallery-item:first').click();
      $(`#${topicLine.id}`).find('.topic-gallery-item:first').find('.link-focusable').focus();
    }
    if (topicLine.type === 'link' || topicLine.type === 'attachment') {
      $(`#${topicLine.id}`).find('a').focus();
    }
  }
  /**
   * Set caret position of node
   * @param node 
   */
  seCaretPosition(node) {
    node.click();
    const range = document.createRange();
    range.selectNodeContents(node);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
  // Get caret position
  getCaretPosition() {

    var node = document.getSelection().anchorNode;
    return (node.nodeType == 3 ? node.parentNode : node);

  }
  //#region Add description items

  // Generate default attributes
  generateLineDefaultAttributes(newNode, id) {
    // Set Id
    this._renderer2.setAttribute(newNode, 'id', id);
    this._renderer2.setAttribute(newNode, 'data-id', id);
    this._renderer2.setAttribute(newNode, 'data-topic-id', this.topic.id);
    this._renderer2.setAttribute(newNode, 'data-reference-line', this.referenceLine);
  }
  /**
   * Add text
   */

  // Generate line text
  generateLineText(id?: string, innerHTML?: any, node?: any, style?: string) {
    // Get the component factory
    const topicLineFactory =
      this._componentFactoryResolver.resolveComponentFactory(TopicLineTextComponent);
    // Create the node
    let newNode = document.createElement('div');
    if (node) {
      newNode = node;
    }
    this._renderer2.addClass(newNode, 'topic-line');
    this._renderer2.addClass(newNode, 'topic-line-text');
    this._renderer2.setAttribute(newNode, 'placeholder', 'Escribe una descripción del subtema');
    // Create span
    let projectableNode = document.createElement('span');
    if (!innerHTML) {
      projectableNode.innerHTML = '<br>';
    } else {
      projectableNode = $(innerHTML).get(0);
    }
    // Set default attributes
    this.generateLineDefaultAttributes(newNode, id);
    if (style) {
      this._renderer2.setAttribute(newNode, 'style', style);
    }
    // Create the component
    const ref = topicLineFactory.create(this.editorVCR.parentInjector, [[projectableNode]], newNode);
    //  this.editorVCR.insert(ref.hostView);
    // Return reference
    return ref;
  }
  // Add text
  addText(id?: any, focus = false, beforeFocus = true) {
    if (!id) {
      id = uuid();
    }
    // Generate line text
    const topicLineTextRef = this.generateLineText(id);
    // Create line text
    const topicLineText = new TopicLineItem();
    topicLineText.componentReference = topicLineTextRef;
    topicLineText.reference = this.referenceLine;
    topicLineText.id = id;
    topicLineText.idTopic = this.topic.id;
    topicLineText.type = 'text';
    topicLineText.content = { text: topicLineTextRef.instance.elementRef.nativeElement.innerHTML };
    // Get focused line
    const topicLineFocus = this.getFocusedLine();
    // Add line
    this._topicEditorService.addTopicLineItem(topicLineText).subscribe(t => {
      // Push into array
      this.topicLineItems.push(t);
      // Append html
      if (topicLineFocus.length > 0) {
        if (beforeFocus) {
          $(topicLineFocus).before(topicLineTextRef.instance.elementRef.nativeElement);
        } else {
          $(topicLineFocus).after(topicLineTextRef.instance.elementRef.nativeElement);
        }
      } else {
        $(this.editorVCR.element.nativeElement).append(topicLineTextRef.instance.elementRef.nativeElement)
      }
      setTimeout(() => {
        if (focus) {
          const line = document.getElementById(t.id);
          this.seCaretPosition(line);
        }
        this.editorOnChange.emit();

      })
    });
  }

  // Generate line text
  generateLineSubtopic(id?: any, innerHTML?: any, node?: any) {
    // Get the component factory
    const topicLineFactory =
      this._componentFactoryResolver.resolveComponentFactory(TopicLineSubTopicComponent);
    // Create the node
    let newNode = document.createElement('div');
    if (node) {
      newNode = node;
    }
    this._renderer2.addClass(newNode, 'topic-line');
    this._renderer2.addClass(newNode, 'topic-line-sub-topic');
    this._renderer2.setAttribute(newNode, 'placeholder', this.subtTopicPlaceHolder);
    // Create span
    let projectableNode = document.createElement('span');
    if (!innerHTML) {
      projectableNode.innerHTML = '<br>';
    } else {
      projectableNode = $(innerHTML).get(0);
    }
    // Set default attributes
    this.generateLineDefaultAttributes(newNode, id);
    // Create the component
    const ref = topicLineFactory.create(this.editorVCR.parentInjector, [[projectableNode]], newNode);
    //   this.editorVCR.insert(ref.hostView);
    // Return reference
    return ref;
  }
  /**
   * Add subtopic
   */
  addSubTopic(id?: any, focus = false) {
    if (!id) {
      id = uuid();
    }
    const topicLineSubTopicRef = this.generateLineSubtopic(id);
    // Create line subtopic
    const topicLineSubTopic = new TopicLineItem();
    topicLineSubTopic.reference = this.referenceLine;
    topicLineSubTopic.componentReference = topicLineSubTopicRef;
    topicLineSubTopic.id = id;
    topicLineSubTopic.idTopic = this.topic.id;
    topicLineSubTopic.type = 'sub-topic';
    topicLineSubTopic.content = { text: topicLineSubTopicRef.instance.elementRef.nativeElement.innerHTML };
    // Get focused line
    const topicLineFocus = this.getFocusedLine();
    // Add sub topic line
    this._topicEditorService.addTopicLineItem(topicLineSubTopic).subscribe(t => {
      // Push into array
      this.topicLineItems.push(t);
      // Append html
      if (topicLineFocus.length > 0) {
        $(topicLineFocus).before(topicLineSubTopicRef.instance.elementRef.nativeElement);
      } else {
        $(this.editorVCR.element.nativeElement).append(topicLineSubTopicRef.instance.elementRef.nativeElement)
      }

      setTimeout(() => {
        if (focus) {
          const line = document.getElementById(t.id);
          this.seCaretPosition(line);
        }
        this.editorOnChange.emit();

      })
    });
    // And line text
    this.addText(null);

  }
  /**
   * Generate line image gallery
   * @param id
   */
  generateLineImageGallery(id?: any) {
    // Get the component factory
    const topicLineFactory =
      this._componentFactoryResolver.resolveComponentFactory(TopicLineImageGalleryComponent);
    // Create the node
    let newNode = document.createElement('div');
    this._renderer2.addClass(newNode, 'topic-line');
    this._renderer2.addClass(newNode, 'topic-line-gallery');
    this._renderer2.setAttribute(newNode, 'contenteditable', 'false');
    // Set default attributes
    this.generateLineDefaultAttributes(newNode, id);
    // Create the component
    const ref = topicLineFactory.create(this.editorVCR.parentInjector, [], newNode);
    ref.instance.editable = this._editable;
    this.subscriptionGalleryResize = ref.instance.galleryOnResize.subscribe((data) => {
      this.scrollDescription.update();
    })
    this.editorVCR.insert(ref.hostView);
    // Return reference
    return ref;
  }
  /**
   * Add image file topic
   * @param fileTopic
   */
  addImage(id: any, file: File, focus = false) {
    if (!id) {
      id = uuid();
    }

    // Upload image
    this._meetingNoteService.uploadImageGallery(file).subscribe((topicFile: TopicFile) => {
      // Get focused line
      const topicLineFocus = this.getFocusedLine();
      // If gallery has space
      if (topicLineFocus.hasClass('topic-line-gallery') && topicLineFocus.find('.topic-gallery-item').length <= 3) {
        const gallerId = topicLineFocus.attr('id');
        const currentGallery = this.topicLineItems.filter(i => i.id === gallerId)[0];
        const index = topicLineFocus.find('.topic-gallery-item-selected').index();
        if (index) {
          currentGallery.componentReference.instance.topicLineItem.content.gallery.splice(index, 0, topicFile);
        } else {
          currentGallery.componentReference.instance.topicLineItem.content.gallery.push(topicFile);
        }
        // Update topic line
        this._topicEditorService.updateTopicLineItem(currentGallery.componentReference.instance.topicLineItem).subscribe();
        setTimeout(() => {
          // Resize
          currentGallery.componentReference.instance.resize();
          // Emit change editor
          this.editorOnChange.emit();
          if (focus) {
            $('#' + topicFile.id).click();
            $('#' + topicFile.id).find('.link-focusable').focus();
          }
        });

      } else {
        // Generate reference
        const topicLineGalleryRef = this.generateLineImageGallery(id);
        // Generate item
        const topicLineGallery = new TopicLineItem();
        topicLineGallery.id = id;
        topicLineGallery.reference = this.referenceLine;
        topicLineGallery.componentReference = topicLineGalleryRef;
        topicLineGallery.type = 'gallery';
        topicLineGallery.idTopic = this.topic.id;
        topicLineGallery.content = { gallery: [topicFile] };
        topicLineGallery.order = 1;
        // Set reference
        topicLineGalleryRef.instance.topicLineItem = topicLineGallery;
        topicLineGalleryRef.instance.filterStatuses = this._filterStatuses;
        topicLineGalleryRef.instance.filterParticipantTypes = this._filterParticipantTypes;
        this._topicEditorService.addTopicLineItem(topicLineGallery).subscribe(t => {
          // Push into array
          this.topicLineItems.push(t);
          if (topicLineFocus.length > 0) {
            $(topicLineFocus).before(topicLineGalleryRef.instance.elementRef.nativeElement);
          } else {
            $(this.editorVCR.element.nativeElement).append(topicLineGalleryRef.instance.elementRef.nativeElement);
          }
          setTimeout(() => {
            if (focus) {
              $('#' + topicFile.id).click();
              $('#' + topicFile.id).find('.link-focusable').focus();
            }
            this.editorOnChange.emit();
          })
        });
      }
    })
  }
  /**
   * Generate line attachment
   * @param id 
   */
  generateLineAttachment(id: any) {
    // Get the component factory
    const topicLineFactory =
      this._componentFactoryResolver.resolveComponentFactory(TopicLineAttachmentComponent);
    // Create the node
    let newNode = document.createElement('div');
    this._renderer2.addClass(newNode, 'topic-line');
    this._renderer2.addClass(newNode, 'topic-line-attachment');
    this._renderer2.setAttribute(newNode, 'contenteditable', 'false');
    // Set default attributes
    this.generateLineDefaultAttributes(newNode, id);
    // Create the component
    const ref = topicLineFactory.create(this.editorVCR.parentInjector, [], newNode);
    ref.instance.editable = this._editable;
    this.editorVCR.insert(ref.hostView);
    // Return reference
    return ref;
  }
  /**
   * Add Attachment
   * @param file 
   */
  addAttachment(id: any, file: File, focus = false) {
    if (!id) {
      id = uuid();
    }
    // Upload image
    this._meetingNoteService.uploadTopicFile(file).subscribe((topicFile) => {
      // Generate reference
      const topicLineAttachmentRef = this.generateLineAttachment(id);
      const topicLineFocus = this.getFocusedLine();

      const topicLineAttachment = new TopicLineItem();
      topicLineAttachment.id = id;
      topicLineAttachment.reference = this.referenceLine;
      topicLineAttachment.idTopic = this.topic.id;
      topicLineAttachment.type = 'attachment';
      topicLineAttachment.content = { file: topicFile };
      topicLineAttachment.order = 1;
      topicLineAttachment.componentReference = topicLineAttachmentRef;
      // Set instance
      topicLineAttachmentRef.instance.topicLineItem = topicLineAttachment;
      this._topicEditorService.addTopicLineItem(topicLineAttachment).subscribe(t => {
        this.topicLineItems.push(t);
        if (topicLineFocus.length > 0) {
          $(topicLineFocus).before(topicLineAttachmentRef.instance.elementRef.nativeElement);
        } else {
          $(this.editorVCR.element.nativeElement).append(topicLineAttachmentRef.instance.elementRef.nativeElement);
        }
        // When add order items
        setTimeout(() => {
          $('#' + t.id).click();
          $('#' + t.id).find('a').focus();
          // Emit change editor
          this.editorOnChange.emit();
        })
      });

    });
  }
  /**
   * Generate line link
   * @param id 
   */
  generateLineLink(id: any) {
    // Get the component factory
    const topicLineFactory =
      this._componentFactoryResolver.resolveComponentFactory(TopicLineLinkComponent);
    // Create the node
    let newNode = document.createElement('div');
    this._renderer2.addClass(newNode, 'topic-line');
    this._renderer2.addClass(newNode, 'topic-line-link');
    this._renderer2.setAttribute(newNode, 'contenteditable', 'false');
    // Set default attributes
    this.generateLineDefaultAttributes(newNode, id);
    // Create the component
    const ref = topicLineFactory.create(this.editorVCR.parentInjector, [], newNode);
    ref.instance.editable = this._editable;
    this.editorVCR.insert(ref.hostView);
    // Return reference
    return ref;
  }
  /**
   * Add link
   * @param link
   */
  addLink(id: any, link: string, focus = false) {
    if (!id) {
      id = uuid();
    }
    const topicLineLinkRef = this.generateLineLink(id);
    const topicLineFocus = this.getFocusedLine();
    // Create object
    const topicLineLink = new TopicLineItem();
    topicLineLink.idTopic = this.topic.id;
    topicLineLink.reference = this.referenceLine;
    topicLineLink.id = id;
    topicLineLink.type = 'link';
    topicLineLink.content = { link: link, text: link };
    topicLineLink.order = 1;
    topicLineLink.componentReference = topicLineLinkRef;
    // Set instance
    topicLineLinkRef.instance.topicLineItem = topicLineLink;

    this._topicEditorService.addTopicLineItem(topicLineLink).subscribe(t => {
      this.topicLineItems.push(t)
      if (topicLineFocus.length > 0) {
        $(topicLineFocus).before(topicLineLinkRef.instance.elementRef.nativeElement);
      } else {
        $(this.editorVCR.element.nativeElement).append(topicLineLinkRef.instance.elementRef.nativeElement);
      }
      setTimeout(() => {
        if (focus) {
          $('#' + t.id).click();
          $('#' + t.id).find('a').focus();
        }
        // Emit change editor
        this.editorOnChange.emit();
      })
    });
  }
  /**
  * Generate line video
  * @param id 
  */
  generateLineVideo(id: any) {
    // Get the component factory
    const topicLineFactory =
      this._componentFactoryResolver.resolveComponentFactory(TopicLineVideoComponent);
    // Create the node
    let newNode = document.createElement('div');
    this._renderer2.addClass(newNode, 'topic-line');
    this._renderer2.addClass(newNode, 'topic-line-video');
    this._renderer2.setAttribute(newNode, 'contenteditable', 'false');
    // Set default attributes
    this.generateLineDefaultAttributes(newNode, id);
    // Create the component
    const ref = topicLineFactory.create(this.editorVCR.parentInjector, [], newNode);
    ref.instance.editable = this._editable;
    this.editorVCR.insert(ref.hostView);
    // Return reference
    return ref;
  }
  /**
   * Add video
   * @param video {url,shortUrl}
   */
  addVideo(id: any, video: any, focus = false) {
    if (!id) {
      id = uuid();
    }
    const topicLineVideoRef = this.generateLineVideo(id);
    const topicLineFocus = this.getFocusedLine();

    const topicLineVideo = new TopicLineItem();
    topicLineVideo.idTopic = this.topic.id;
    topicLineVideo.id = id;
    topicLineVideo.type = 'video';
    topicLineVideo.reference = this.referenceLine;
    topicLineVideo.content = { video: video };
    topicLineVideo.order = 1;
    topicLineVideo.componentReference = topicLineVideoRef;
    // Set object
    topicLineVideoRef.instance.topicLineItem = topicLineVideo;

    this._topicEditorService.addTopicLineItem(topicLineVideo).subscribe(t => {
      this.topicLineItems.push(t);
      if (topicLineFocus.length > 0) {
        $(topicLineFocus).before(topicLineVideoRef.instance.elementRef.nativeElement);
      } else {
        $(this.editorVCR.element.nativeElement).append(topicLineVideoRef.instance.elementRef.nativeElement);
      }
      setTimeout(() => {
        if (focus) {
          $('#' + t.id).click();
          $('#' + t.id).find('.link-focusable').focus();
        }
        // Emit change editor
        this.editorOnChange.emit();
      })
    });
  }

  generateLineTask(id: any) {
    // Get the component factory
    const topicLineFactory =
      this._componentFactoryResolver.resolveComponentFactory(TopicLineTaskComponent);
    // Create the node
    let newNode = document.createElement('div');
    this._renderer2.addClass(newNode, 'topic-line');
    this._renderer2.addClass(newNode, 'topic-line-task');
    this._renderer2.setAttribute(newNode, 'contenteditable', 'false');
    // Set default attributes
    this.generateLineDefaultAttributes(newNode, id);
    // Create the component
    const ref = topicLineFactory.create(this.editorVCR.parentInjector, [], newNode);
    ref.instance.editable = this._editable;
    this.editorVCR.insert(ref.hostView);
    // Return reference
    return ref;
  }
  // Add task
  async addTask(id: any, task: any, focus = false, index = -1) {
    if (!id) {
      id = uuid();
    }
    const topicLineTaskRef = this.generateLineTask(id);
    const topicLineFocus = this.getFocusedLine();

    task.reference = this.referenceLine;
    const topicLineTask = new TopicLineItem();
    topicLineTask.id = id;
    topicLineTask.reference = this.referenceLine;
    topicLineTask.type = 'task';
    topicLineTask.content = { task: task };
    topicLineTask.order = 1;
    topicLineTask.componentReference = topicLineTaskRef;
    // Set object to reference
    topicLineTaskRef.instance.topicLineItem = topicLineTask;

    const taskObservable = this._topicEditorService.addTopicLineItem(topicLineTask);
    let taskItemLine = await taskObservable.toPromise().then(resp => { return resp; });
    // Push object
    this.topicLineItems.push(taskItemLine);
    if (index >= 0) {
      const afterElement = $(this.editorVCR.element.nativeElement).find(`.${this.topicLineClass}`).eq(index);
      if (index === 0) {
        $(this.editorVCR.element.nativeElement).prepend(topicLineTaskRef.instance.elementRef.nativeElement);
      } else if (afterElement.length > 0) {
        $(afterElement).before(topicLineTaskRef.instance.elementRef.nativeElement);
      } else {
        $(this.editorVCR.element.nativeElement).append(topicLineTaskRef.instance.elementRef.nativeElement);
      }
    } else {
      if (topicLineFocus.length > 0) {
        $(topicLineFocus).before(topicLineTaskRef.instance.elementRef.nativeElement);
      } else {
        $(this.editorVCR.element.nativeElement).append(topicLineTaskRef.instance.elementRef.nativeElement);
      }
    }
    // When add order items
    setTimeout(() => {
      // Focus
      if (focus) {
        $('#' + taskItemLine.id).click();
      }
      this.editorRead();
      // Emit change
      this.editorOnChange.emit();
    });

    setTimeout(() => {
      // Dom
      const taskBlock = document.getElementById('task-' + task.id);
      const scroll = this._utilService.getScrollParent(taskBlock, true);
      this._utilService.scrollTo(scroll, taskBlock, 30);
    }, 150)


    return taskItemLine;

  }
  //#endregion



  // #region tasks

  /**
  * Remove task
  * @param task
  */
  removeTask(task: Task) {
    this._meetingNoteService.deleteTopicTask(this.topic.id, task).subscribe(task => {
      this.scrollDescription.update();
      // Emit change editor
      this.editorOnChange.emit();
    })
  }
  /**
   * On sort start
   */
  onSortStart() {
    this.sorting = true;
    this._renderer2.addClass(this.editorVCR.element.nativeElement, 'sorting');
  }
  /**
   * On sort end
   */
  onSortEnd(event) {
    var itemEl = event.item;
    this.sorting = false;
    this._renderer2.removeClass(this.editorVCR.element.nativeElement, 'sorting');
    // Emit change editor
    this.editorOnChange.emit();
    setTimeout(() => {

      $(itemEl).trigger('click');
    });
  }
  /**
   * On sort update
   * @param event 
   */
  onSortUpdate(event) {

    // this.orderItems();
  }
  /**
   * On sort remove
   * @param evt 
   */
  onSortRemove(event) {
    // console.log(`remove ${this.referenceLine}`, event);
    const itemDropped = event.item;
    const topicLineId = itemDropped.dataset.id;
    setTimeout(() => {
      $(`#${topicLineId}`).addClass('sort-remove');
      $(`#${topicLineId}`).remove();
    });
    //  this.editorRead();

  }
  /**
   * On sort add
   * @param event 
   */
  async onSortAdd(event) {
    console.log(`add ${this.referenceLine}`, event);
    // Get data
    const itemDropped = event.item;
    const topicLineId = itemDropped.dataset.id;
    const topicId = itemDropped.dataset.topicId;
    const referenceLine = itemDropped.dataset.referenceLine;
    const newIndex = event.newIndex;
    // Comments off task
    const commentsOfTask = this.topic.commentThreads.filter(c => c.objectReference === 'task' && c.objectReferenceId === topicLineId);
    // Observable
    const topicLineItemOservable = this._meetingNoteService.getTopicLineItem(topicId, topicLineId, referenceLine);
    // Promise
    let topicLineItem = await topicLineItemOservable.toPromise().then(resp => {  return resp; });
    // Task
    if (topicLineItem.type === 'task') {
      // Add task
      const taskItemLine = await this.addTask(null, topicLineItem.content.task, true, newIndex);
      // console.log(taskItemLine);
      // Add class
      $(`#${taskItemLine.id}`).addClass('sorter');
      // Comments update
      commentsOfTask.forEach(async (commentThread) => {
        commentThread.objectReferenceId = taskItemLine.id;
        commentThread.levelId = this.referenceLine;
        const commentThreadObs = this._commentThreadService.update(commentThread);
        const resp = await commentThreadObs.toPromise().then(resp => {
          return resp;
        });
        // console.error(resp);
      });



    }


  }
  // #endregion tasks

  // #region Comments

  // Set comments for gallery
  setCommentsGallery() {
    this.topicLineItems.filter(i => i.type === 'gallery').forEach(items => {
      items.componentReference.instance.galleryComp.forEach(image => {
        image.commentThreads = this._commentThreads.filter(c => c.objectReferenceId === image.imageGallery.id);
      })
    });
  }
  // Set comments for videos
  setCommentsVideos() {
    this.topicLineItems.filter(i => i.type === 'video').forEach(item => {
      item.componentReference.instance.commentThreads =
        this._commentThreads.filter(c => c.objectReferenceId === item.id);
    });
  }
  // Enabled comment action
  enabledCommentsActionComponents(enabledComments, editable) {
    this.topicLineItems.forEach(items => {
      items.componentReference.instance.enableComments = enabledComments;
      items.componentReference.instance.editable = editable;
    });
  }
  /**
  * Show toolbar, force show when force show when selection detected
  * @param forceShow 
  */
  showToolbarComments(forceShow = false) {
    const scroll = $(this.scrollDescription.elementRef.nativeElement);

    const topicLineHover = $('.' + this.topicLineClass + '.' + this.topicLineHoverClass);
    if (forceShow && this.enableComments) {
      this.forceShowToolbarComments = true;
    }
    if (topicLineHover.length > 0 && this.enableComments) {
      if (topicLineHover.hasClass('topic-title')) {
        this.toolbarCommentsTop = topicLineHover.offset().top - scroll.offset().top + scroll.scrollTop();
        this.isShowToolbarComments = true;
      } else {
        // top - offsetContainer - (width/2)
        this.toolbarCommentsTop = topicLineHover.offset().top - scroll.offset().top + scroll.scrollTop() - 20;
        this.isShowToolbarComments = true;
      }

    }
  }

  /**
   * Hide toolbar, force hide when force show when selection detected
   * @param forceHide 
   */
  hideToolbarComments(forceHide = false) {
    if (forceHide) {
      this.forceShowToolbarComments = false;
    }
    this.isShowToolbarComments = false;
  }
  /**
   * On click enable comments
   * @param $event
   */
  onActivateComments(enabled) {
    this.enabledCommentsAction = enabled;
    if (this.enableComments) {
      // Enabled dynamic components
      this.enabledCommentsActionComponents(this.enabledCommentsAction, !this.enabledCommentsAction);
    } else {
      // disabled dynamic components
      this.enabledCommentsActionComponents(this.enabledCommentsAction, this._editable);
    }
    // Get line hover
    const topicLineHover = $('.' + this.topicLineClass + '.' + this.topicLineHoverClass);
    // Check if enabled comments
    if (this.enabledCommentsAction) {
      // Check if has selection
      const selection = this._rangyService.self.getSelection()
      const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
      const selectedText = selection.toString();
      if (range && selectedText.length > 0 && this.onMouseUpText(range)) {
        this.addCommentSelection();
      } // If line hover is text
      else if (topicLineHover.hasClass(`topic-line-text`)) {
        const text = topicLineHover.closest(`.topic-line-text`);
        this.addCommentClickText(null, text);
      } // If line hover is sub topic (text)
      else if (topicLineHover.hasClass(`topic-line-sub-topic`)) {
        const text = topicLineHover.closest(`.topic-line-sub-topic`);
        this.addCommentClickText(null, text);
      }
      else if (topicLineHover.hasClass(`topic-title`)) {
        const text = topicLineHover.closest(`.topic-title`);
        this.addCommentClickTextTitle(null, text, 'topic-title');


      }
    }
  }

  // After add comment
  public afterAddComment() {
    this.enabledCommentsAction = false;
    this.enabledCommentsActionComponents(this.enabledCommentsAction, this._editable);
    this.hideToolbarComments(true);
    this._rangyService.clearSelection();
  }
  // Set comment thread number
  private setCommentThreadNumber(commentThread: CommentThread) {

    if (this.topic.commentThreads.length > 0) {
      const arrayLength = this.topic.commentThreads.length;
      const lastComment = this.topic.commentThreads[arrayLength - 1];
      const number = Math.max(lastComment.number + 1, this.topic.commentThreads.length + 1);
      commentThread.number = number;
    } else {
      commentThread.number = this.topic.commentThreads.length + 1;
    }
  }
  /**
   * Generate model of comment selection
   * @param commentId 
   * @param leveId 
   */
  private generateCommentSelection(commentId, leveId) {
    const position = this._meetingNoteCommentsService.getPositionSelection(commentId);
    const commentThread = new CommentThread();
    commentThread.id = commentId;
    commentThread.event = 'selection';
    commentThread.levelId = leveId;
    commentThread.referenceId = this.topic.id;
    commentThread.left = position.left;
    commentThread.top = position.top;
    commentThread.workspaceAccess = this.workspaceAccess;
    commentThread.status = this.commentThreadStatuses.filter(c => c.key === 'in-process')[0];
    commentThread.participantType = this.participantTypes.filter(p => p.key === 'all')[0];
    this.setCommentThreadNumber(commentThread);
    return commentThread;

  }
  /**
   * Generate of comment click
   * @param event 
   * @param eventName 
   */
  private generateCommentClick(event, eventName) {
    const commentThread = new CommentThread();
    commentThread.id = uuid();
    commentThread.event = eventName;
    commentThread.eventObject = event;
    commentThread.levelId = this.referenceLine;
    commentThread.referenceId = this.topic.id;
    commentThread.workspaceAccess = this.workspaceAccess;
    commentThread.status = this.commentThreadStatuses.filter(c => c.key === 'in-process')[0];
    commentThread.participantType = this.participantTypes.filter(p => p.key === 'all')[0];
    this.setCommentThreadNumber(commentThread);
    return commentThread;
  }
  // Handle comment selection
  private addCommentSelection(objectReference?: any, objectReferenceId?: any) {
    const commentId = uuid();
    const topicSelectionId = this._rangyService.self.
      createClassApplier('comment-thread-selection-' + commentId, {
        tagNames: ['*'],
        normalize: true,
        onElementCreate: (el, applier) => {
          const selectionEl = $(el);
          selectionEl.addClass('comment-thread-selection');
          selectionEl.addClass('active');
          selectionEl.addClass('unprocess');
          selectionEl.addClass('not-saved');
          selectionEl.addClass('status-in-process');
          selectionEl.attr('data-comment-id', commentId);

        }
      });

    topicSelectionId.applyToSelection();
    setTimeout(() => {
      // Create the comment
      const commentMeetingNote = this.generateCommentSelection(commentId, this.referenceLine);
      if (objectReference && objectReferenceId) {
        commentMeetingNote.objectReference = objectReference;
        commentMeetingNote.objectReferenceId = objectReferenceId;
      }
      // Create comment service
      this._commentThreadService.create(commentMeetingNote).subscribe();
      $(`.comment-thread-selection-${commentId}`).removeClass('unprocess');

    });

  }

  // Add comment click text
  private addCommentClickText(event, target, objectReference?: any, objectReferenceId?: any) {
    // Node text
    const nodeText = target.text();
    // console.log(nodeText);
    // If not empty
    if (nodeText !== '' && nodeText !== '<br>') {
      // Generate id
      const commentId = uuid();
      // Wraper element
      const commentWrapper = `<span class="comment-thread-selection-${commentId} 
                                     comment-thread-selection status-in-process active unprocess not-saved"
                                     data-comment-id="${commentId}"></span>`;
      // wrap  element          
      target.contents().wrap(commentWrapper);
      // Create the comment
      const commentMeetingNote = this.generateCommentSelection(commentId, this.referenceLine);
      if (objectReference && objectReferenceId) {
        commentMeetingNote.objectReference = objectReference;
        commentMeetingNote.objectReferenceId = objectReferenceId;
      }
      this._commentThreadService.create(commentMeetingNote).subscribe(resp => {
        setTimeout(() => {
          $(`.comment-thread-selection-${commentId}`).removeClass('unprocess');
          // this.afterAddComment();
        })
      });

    }
  }

  // Add comment click text
  public addCommentClickTextTitle(event, target, objectReference: any) {
    // Generate id
    const commentId = uuid();
    // Create the comment
    const commentMeetingNote = this.generateCommentClick(commentId, this.referenceLine);
    commentMeetingNote.objectReference = objectReference;
    this._commentThreadService.create(commentMeetingNote).subscribe(resp => {
      setTimeout(() => {
        $(`.comment-thread-selection-${commentId}`).removeClass('unprocess');
        // this.afterAddComment();
      })
    });


  }
  // Add comment click task
  private addCommentClickTask(event) {
    const closestContainer = $(this.scrollDescription.elementRef.nativeElement);
    const taskLine = $(event.target).closest(`.topic-line-task`);
    const commentMeetingNote = this.generateCommentClick(event, 'click');
    const taskLinePosition = taskLine.position();
    const taskLineOffset = taskLine.offset();
    const parentOfftset = closestContainer.offset();
    // Position
    commentMeetingNote.left = event.clientX - (parentOfftset.left + (POINT_SIZE.width / 2));
    commentMeetingNote.top = event.clientY - ((parentOfftset.top) + (POINT_SIZE.width / 2)) + closestContainer.scrollTop();
    commentMeetingNote.originalLeft = commentMeetingNote.left;
    commentMeetingNote.originalTop = commentMeetingNote.top;
    // Set the relationship of task 
    commentMeetingNote.objectReference = 'task';
    commentMeetingNote.objectReferenceId = taskLine.attr('id');
    commentMeetingNote.containerTop = (taskLineOffset.top - parentOfftset.top) + closestContainer.scrollTop();
    commentMeetingNote.containerWidth = taskLine.find(`.task-block-wrapper `).outerWidth();
    commentMeetingNote.containerHeight = taskLine.find(`.task-block-wrapper `).outerHeight();
    commentMeetingNote.originalContainerWidth = taskLine.find(`.task-block-wrapper `).outerWidth();
    commentMeetingNote.originalContainerHeight = taskLine.find(`.task-block-wrapper `).outerHeight();
    // Add comment
    this._commentThreadService.create(commentMeetingNote).subscribe();
  }
  // Set original position image
  private setOrigianlPositionImage(commentThread: CommentThread, image, topicFile: TopicFile) {
    // Original
    const currentWidth = image.outerWidth();
    const currentHeight = image.outerHeight();
    const originalX = commentThread.left * (topicFile.setting.naturalWidth / currentWidth);
    const originalY = commentThread.top * (topicFile.setting.naturalHeight / currentHeight);
    commentThread.originalLeft = originalX;
    commentThread.originalTop = originalY;
  }
  // Add comment click image
  private addCommentClickImage(event) {
    console.log(event);
    const closestContainer = $(this.scrollDescription.elementRef.nativeElement);
    // Image line gallery
    const topicLineImageGallery = $(event.target).closest(`.topic-line-gallery`);
    const topicLineImageGalleryId = topicLineImageGallery.attr('id');
    // Wrapper of image
    const imageWrapper = $(event.target).closest(`.topic-gallery-item`);
    const imageId = imageWrapper.attr('id');
    // Image
    const image = imageWrapper.find(`.gallery-image`);
    // Generate comment at click
    const commentMeetingNote = this.generateCommentClick(event, 'click');
    // Topic Line Item
    const galleryItem = this.topicLineItems.filter(i => i.id === topicLineImageGalleryId)[0];
    const topicFile = galleryItem.content.gallery.filter(image => image.id === imageId)[0]
    // Position
    const imageOffset = image.offset();
    const parentOfftset = closestContainer.offset();
    // Image reference
    commentMeetingNote.objectReference = 'image';
    commentMeetingNote.objectReferenceId = imageWrapper.attr('id');
    commentMeetingNote.containerTop = (imageOffset.top - parentOfftset.top) + closestContainer.scrollTop();
    // Size current image
    const currentWidth = image.outerWidth();
    const currentHeight = image.outerHeight();
    commentMeetingNote.containerWidth = currentWidth;
    commentMeetingNote.containerHeight = currentHeight;
    commentMeetingNote.originalContainerWidth = currentWidth;
    commentMeetingNote.originalContainerHeight = currentHeight;
    // Position
    commentMeetingNote.left = event.offsetX;
    commentMeetingNote.top = event.offsetY;
    // Original position
    commentMeetingNote.originalLeft = commentMeetingNote.left * (topicFile.setting.naturalWidth / currentWidth);
    commentMeetingNote.originalTop = commentMeetingNote.top * (topicFile.setting.naturalHeight / currentHeight);
    // Add comment
    this._commentThreadService.create(commentMeetingNote).subscribe();
  }
  // Add comment click image
  private addCommentClickVideo(event) {
    console.log(event);
    const closestContainer = $(this.scrollDescription.elementRef.nativeElement);
    // Video line 
    const topicLineImageVideo = $(event.target).closest(`.topic-line-video`);
    const topicLineVideoId = topicLineImageVideo.attr('id');
    // Iframe video
    const iframeVideo = topicLineImageVideo.find(`.topic-line-video-iframe`);
    // Generate comment at click
    const commentMeetingNote = this.generateCommentClick(event, 'click');
    // Topic Line Item
    const videoItem = this.topicLineItems.filter(i => i.id === topicLineVideoId)[0];
    // Position
    const videoOffset = iframeVideo.offset();
    const parentOfftset = closestContainer.offset();
    // video reference
    commentMeetingNote.objectReference = 'video';
    commentMeetingNote.objectReferenceId = videoItem.id
    commentMeetingNote.containerTop = (videoOffset.top - parentOfftset.top) + closestContainer.scrollTop();
    // Size current image
    const currentWidth = iframeVideo.outerWidth();
    const currentHeight = iframeVideo.outerHeight();
    commentMeetingNote.containerWidth = currentWidth;
    commentMeetingNote.containerHeight = currentHeight;
    commentMeetingNote.originalContainerWidth = currentWidth;
    commentMeetingNote.originalContainerHeight = currentHeight;
    // Position
    commentMeetingNote.left = event.offsetX;
    commentMeetingNote.top = event.offsetY;
    // Original position
    commentMeetingNote.originalLeft = commentMeetingNote.left * (videoItem.content.video.sizes.width / currentWidth);
    commentMeetingNote.originalTop = commentMeetingNote.top * (videoItem.content.video.sizes.height / currentHeight);
    // Add comment
    this._commentThreadService.create(commentMeetingNote).subscribe();
  }
  // Handle comment click
  private addCommentClick(event) {
    const target = $(event.target);
    if (target.closest(`.topic-line-text`).length > 0) {
      const text = target.closest(`.topic-line-text`);
      // Add comment at click
      this.addCommentClickText(event, text);
    } else if (target.closest(`.topic-line-sub-topic`).length > 0) {
      const text = target.closest(`.topic-line-sub-topic`);
      // Add comment at click
      this.addCommentClickText(event, text);
    } else if (target.closest(`.topic-line-link`).length > 0) {
      const text = target.closest(`.topic-line-link`);
      // Add comment at click
      this.addCommentClickText(event, text.find('.link-content'));
    }
    else if (target.closest(`.topic-line-attachment`).length > 0) {
      const text = target.closest(`.topic-line-attachment`);
      // Add comment at click
      this.addCommentClickText(event, text.find('.attachment-content'));
    }
    else if (target.closest(`.task-description-content`).length > 0) {
      const text = target.closest(`.task-description-content`);
      // Add comment at click
      this.addCommentClickText(event, text, 'task', target.closest(`.topic-line-task`).attr('id'));
    }
    else if (target.closest(`.topic-line-task`).length > 0) {
      this.addCommentClickTask(event);
    } else if (target.closest(`.gallery-image`).length > 0) {
      // Images
      this.addCommentClickImage(event);
    } else if (target.closest(`.topic-line-video-comments`).length > 0) {
      // Video
      this.addCommentClickVideo(event);
    }

  }
  /**
   * Check if selection is text
   * @param range 
   */
  onMouseUpText(range) {
    let mouseUpText = false;
    const parentEl = $(range.commonAncestorContainer).closest(`#${this.editorId}`);
    if (parentEl.length > 0) {
      // Get range html
      const innerHTML = range.toHtml();
      // Create div
      const div = document.createElement('div');
      // Set inner HTML
      div.innerHTML = innerHTML;
      // Line text 
      const lineTLinkLength = $(div).find('.topic-line-link').length;
      const lineTextLength = $(div).find('.topic-line-text').length;
      const lineSubTopicLength = $(div).find('.topic-line-sub-topic').length;
      const lineAttachmentLength = $(div).find('.topic-line-attachment').length;
      const allLines = lineTLinkLength + lineTextLength + lineSubTopicLength + lineAttachmentLength;
      // Children count
      const childrenCount = div.childElementCount;
      // If lines selected are more than one
      if (childrenCount > 1 && ((allLines) === childrenCount)) {
        mouseUpText = true;
        // this.enabledCommentsAction = false;
      } else {
        // If selection has one line
        const topicLine = $(range.commonAncestorContainer);
        if (topicLine.closest('.topic-line-text').length > 0 ||
          topicLine.closest('.topic-line-sub-topic').length > 0 ||
          topicLine.closest('.topic-line-link').length > 0 ||
          topicLine.closest('.topic-line-attachment').length > 0 ||
          topicLine.closest(`.task-description-content`).length > 0
        ) {
          mouseUpText = true;
        }
      }
    }
    return mouseUpText;
  }
  private commentGetClassObjectReference(topicLine) {
    let objectReference = undefined;
    if (topicLine.hasClass('topic-line-text')) {
      objectReference = 'text';
    } else if (topicLine.hasClass('topic-line-sub-topic')) {
      objectReference = 'sub-topic';
    } else if (topicLine.hasClass('topic-line-link')) {
      objectReference = 'link';
    } else if (topicLine.hasClass('topic-line-attachment')) {
      objectReference = 'attachment';
    } else if (topicLine.hasClass('topic-line-video')) {
      objectReference = 'video';
    } else if (topicLine.hasClass('topic-line-image')) {
      objectReference = 'image';

    } else if (topicLine.hasClass('topic-line-task')) {
      objectReference = 'task';
    }
    return objectReference;
  }
  // Mouse up
  @HostListener('window:mouseup', ['$event']) onMouseUp(event) {
    // Get selection elements
    const selection = this._rangyService.self.getSelection()
    const range = selection.rangeCount > 0 ? selection.getRangeAt(0) : null;
    const selectedText = selection.toString();
    if (this.enabledCommentsAction) {
      // 
      if (range && selectedText.length > 0 && this.onMouseUpText(range)) {
        const topicLine = $(range.commonAncestorContainer).closest('.topic-line');
        let objectReference = undefined;
        let objectReferenceId = undefined;
        if (topicLine.length) {
          objectReference = this.commentGetClassObjectReference(topicLine);
          objectReferenceId = topicLine.attr('id');
        }
        // Add comment selection
        this.addCommentSelection(objectReference, objectReferenceId);
      } else if ($(event.target).closest(`#${this.editorId}`).length > 0) {
        // Event left click
        if (event.which === 1) {
          this.addCommentClick(event);
        }
      } // else {
      // this.hideToolbarComments(true);
      // this.onActivateComments(false);
      //}
    } else {
      // If not enabled comments
      if (range && selectedText.length > 0 && this.onMouseUpText(range)) {
        this.showToolbarComments(true);
      } else {
        this.hideToolbarComments(true);
      }
    }

  }

  @HostListener('document:click', ['$event']) onClick(event) {
    // Get selection elements
    const target = $(event.target);
    if (target.closest(`#${this.editorId}`).length === 0
      && target.closest(`.comment-popup-thread-wrapper`).length === 0
      && target.closest(`#${this.scrollId}`).find(`.topic-editor-toolbar-comments`).length === 0
    ) {
      this.hideToolbarComments(true);
      this.onActivateComments(false);
    }

  }

  // Mouse hover
  @HostListener('mouseover', ['$event']) onMouseOver(event) {
    const target = $(event.target).closest('.' + this.topicLineClass);
    if (target.hasClass(this.topicLineClass)) {
      $('.' + this.topicLineClass).removeClass(this.topicLineHoverClass);
      target.addClass(this.topicLineHoverClass);
    }

  }
  // Mouse move
  @HostListener('mousemove', ['$event']) onMouseMove(event) {
    const target = $(event.target);
    if (target.closest('.agreements-content-header-wrapper').length === 0) {
      let mouseSide = '';
      const parent = $('.topic-description-editable-container');

      if ((event.pageX - parent.offset().left) < parent.width() / 2) {
        mouseSide = 'L';
      } else {
        mouseSide = 'R';
      }
      // console.log('mouse-side', mouseSide);
      // If mouse over right show toolbar of comments
      if (mouseSide === 'R') {
        // console.log('show sidebar');
        this.showToolbarComments();
        // If mouse over lef show toolbar of actions
      } else if (mouseSide === 'L') {
        this.hideToolbarComments();
      }
    }else{
      this.hideToolbarComments();
    }

  }
  // Mouse leave
  @HostListener('mouseleave', ['$event']) onMouseLeave(event) {

    this.hideToolbarComments();
    $('.' + this.topicLineClass).removeClass(this.topicLineHoverClass);
  }
  // #endregion
  // On destroy
  ngOnDestroy() {
    // this.reorder();
    if (this.subscriptionToolbarAction) {
      this.subscriptionToolbarAction.unsubscribe();
    }
    if (this.subscriptionTopicItem) {
      this.subscriptionTopicItem.unsubscribe();
    }
    if (this.editorChangesObserver) {
      this.editorChangesObserver.disconnect();
    }
    if (this.subscriptionGalleryResize) {
      this.subscriptionGalleryResize.unsubscribe();
    }
    $(this.editorVCR.element.nativeElement).off('content-change', () => {

    });
  }
}

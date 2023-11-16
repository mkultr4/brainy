import {
  Component, OnInit,
  HostListener, Input, OnDestroy, ViewChild, AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
  AfterContentInit
} from '@angular/core';


import { ISubscription } from 'rxjs/Subscription';
import ResizeObserver from 'resize-observer-polyfill';
import * as uuid from 'uuid/v4';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import * as moment from 'moment';
import { CommentInputComponent } from '../comment-input/comment-input.component';
import { CommentThreadStatus } from '../../../models/comments/comment-thread-status';
import { ParticipantType } from '../../../models/participants/participant-type';
import { CommentThreadComunicationInfo, CommentComunicationService } from '../services/comment-comunication.service';
import { CommentThreadMessage } from '../../../models/comments/comment-thread-message';
import { CommentThread } from '../../../models/comments/comment-thread';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { AsidenavComponent } from '../../shared-sidenav/asidenav/asidenav.component';
import { CommentBoxComponent } from '../comment-box/comment-box.component';
import { UtilService } from '../../../services/utils/util.service';
import { CommentThreadStrategyService } from '../../../services/comments/comment-thread-strategy.service';
import { RangyService } from '../../../services/utils/rangy.service';
import { CommentLink } from '../../../models/comments/comment-link';
import { Core } from 'src/app/models/cores/core';
import { FloatingNoteWorkflowService } from '../../floating-note/services/floating-note-workflow.service';

@Component({
  selector: 'app-comment-thread-sidenav,[app-comment-thread-sidenav]',
  templateUrl: './comment-thread-sidenav.component.html',
  styleUrls: ['./comment-thread-sidenav.component.scss'],
  providers: [RangyService]
})
export class CommentThreadSidenavComponent implements OnInit, OnDestroy, AfterViewInit {
  // Public vars
  public commentThreadTitleReadOnly = true;
  public display = 'right';
  public sidenavInformation: CommentThreadComunicationInfo = new CommentThreadComunicationInfo();
  public resizeObserver: ResizeObserver;
  public newComment: CommentThreadMessage = new CommentThreadMessage();
  public commentsPerDate: any;
  public workspaceAccessPerComments: any;
  public today;
  public yesterday;
  public isShowSidenav = false;
  public view = 'comments';
  public commentAction = 'main';
  public commentThreadMessages: Array<CommentThreadMessage> = [];
  public dayMessages = [];
  public canEdit = false;
  public commentsEnabled = true;
  public floatingNoteEvent = {
    visible: false,
    creatingNote: false,
    type: '',
    core: undefined,
    commentThread: undefined,
    top: 0,
    left: 0,
    plainText: ''
  };
  public _commentThreadStatuses: Array<CommentThreadStatus>;
  public commentMention: CommentThreadMessage;
  // Subscriptions
  public subscriptionSidenav: ISubscription;
  public subscriptionCommentThreadMessages: ISubscription;
  // Services
  private _commentThreadService;
  // Inputs
  @Input() core: Core;
  @Input() commentThread: CommentThread = new CommentThread();
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() set commentThreadStatuses(commentThreadStatuses: Array<CommentThreadStatus>) {
    this._commentThreadStatuses = commentThreadStatuses.filter(c => c.key !== 'all');
    console.log(this._commentThreadStatuses);
  };
  @Input() participantTypes: Array<ParticipantType>;
  // View childs
  @ViewChild('scrollComments', { read: PerfectScrollbarDirective }) scroll: PerfectScrollbarDirective;
  @ViewChild('commentsThreadSideNav') commentsThreadSideNav: AsidenavComponent;
  @ViewChild('commentThreadTitle') commentThreadTitleInput: ElementRef;
  @ViewChild('sidenavHeader') sidenavHeader: ElementRef;
  @ViewChild('sidenavContent') sidenavContent: ElementRef;
  @ViewChild('sidenavFooter') sidenavFooter: ElementRef;
  @ViewChild('commentInput') commentInput: CommentInputComponent;
  @ViewChild('daysWrapper') daysWrapper: ElementRef;
  // View Childre
  @ViewChildren(CommentBoxComponent) commentBoxes: QueryList<CommentBoxComponent>;

  constructor(
    private _utilSevice: UtilService,
    private _commentComunicationService: CommentComunicationService,
    private _commentThreadStrategyService: CommentThreadStrategyService,
    private _rangyService: RangyService,
     private _floatingNoteWorkflowService: FloatingNoteWorkflowService
  ) {
    this._commentThreadService = this._commentThreadStrategyService.getService();
  }

  ngOnInit() {
    const today = moment().format('YYYY-MM-DD');
    this.today = today;

    const yesterday = moment().subtract(1, 'days').format('YYYY-MM-DD');
    this.yesterday = yesterday;
  }
  ngAfterViewInit() {
    this.subscriptionSidenav = this._commentComunicationService.showSidenavObs.subscribe(sidenavInformation => {
      this.sidenavInformation = sidenavInformation;
      if (this.sidenavInformation.show) {
        this.commentThread = Object.assign(new CommentThread(), sidenavInformation.commentThread);
        this.canEdit = this.commentThread.workspaceAccess.id === this.workspaceAccess.id;
        this.commentsEnabled = this.sidenavInformation.commentsEnabled;
        this._commentThreadService.loadAllCommentThreadMessages(this.commentThread.id, this.commentThread.comments).subscribe(response => {
          console.log(response);
        });
        this.newComment = new CommentThreadMessage();
        this.commentsThreadSideNav.showSidenav();
      }
    });
    this.subscriptionCommentThreadMessages = this._commentThreadService.commentThreadMessages.subscribe(comments => {

      this.commentThreadMessages = comments;
      setTimeout(() => {
        this.dayMessages = this._commentThreadService.getDayCommens(this.commentThreadMessages);
        this.workspaceAccessPerComments = this._commentThreadService.getWorkspaceOfComments(comments, this.workspaceAccess.id);
      });
    });

    this.resizeObserver = new ResizeObserver((entries, observer) => {
      for (const entry of entries) {
        const { left, top, width, height } = entry.contentRect;
        this.resiseSidenav();
      }
    });

    this.resizeObserver.observe(this.sidenavFooter.nativeElement);
    this.resizeObserver.observe(this.sidenavHeader.nativeElement);
  }
  resiseSidenav() {
    const $footer = $(this.sidenavFooter.nativeElement);
    const $header = $(this.sidenavHeader.nativeElement);
    const $content = $(this.sidenavContent.nativeElement);
    const height = window.innerHeight - ($footer.outerHeight() + $header.outerHeight());

    $content.css({ 'height': height + 'px' });
  }

  // On Show
  onShow() {
     const selection = $('.comment-thread-selection-' + this.commentThread.id);
    selection.addClass('active-sidenav');
    setTimeout(() => {
      if (this.scroll) {
        this.scroll.update();
        this.isShowSidenav = true;
        this.scroll.scrollToBottom();
        
      }
    });
  }
  // On hide sidenav
  onHide() {
    this.isShowSidenav = false;
    this.dayMessages = [];
    this.commentThreadMessages = [];
    const selection = $('.comment-thread-selection-' + this.commentThread.id);
    selection.removeClass('active-sidenav');
    selection.removeClass('active');
    this._commentComunicationService.showSidenav(new CommentThreadComunicationInfo());
    // Floating note
    this.hideFloatingNoteToolbar();
    setTimeout(() => {
      this.canEdit = false;
      this.commentsEnabled = true;
      this.newComment = new CommentThreadMessage();
      this.commentMention = undefined;
      // this.srcroll.update();
    });

  }
  // Status
  setStatusSidenav(status) {
    console.log(status);
    this.commentThread.status = status;
    if (this.commentThread.status.key === 'resolved') {
      this.commentThread.resolvedBy = this.workspaceAccess;
      this.commentThread.resolvedAt = new Date();
    }
    this._commentThreadService.update(this.commentThread).subscribe(resp => {
      // Update content editable wrapper
      // Get content editable
      setTimeout(() => {
        const contentEdiable = $(`.comment-thread-selection-${this.commentThread.id}`).closest('[contenteditable]')
        if (contentEdiable.length > 0) {
          contentEdiable.trigger('content-change');
        }
      });
    });
  }

  // Participant Type
  setParticipantsType(participantType) {
    this.commentThread.participantType = participantType;
    this._commentThreadService.update(this.commentThread).subscribe();
  }

  //#region Comment Thread Title

  setEditableCommentTile() {
    this.commentThreadTitleReadOnly = false;
    this.commentThreadTitleInput.nativeElement.focus();
  }
  onBlurCommentThreadTitle() {
    this.commentThreadTitleReadOnly = true;
    this._commentThreadService.update(this.commentThread).subscribe();
  }
  //#endregion

  //#region Delete Comment Thread
  deleteCommentThread() {
    const commentThreadComunicationInfo: CommentThreadComunicationInfo = new CommentThreadComunicationInfo();
    commentThreadComunicationInfo.show = true;
    commentThreadComunicationInfo.commentThread = Object.assign({}, this.commentThread);
    this._commentComunicationService.showModalDelete(commentThreadComunicationInfo);
  }
  // #endregion

  // Download Comments
  downloadCommentThread() {
    const commentThreadComunicationInfo: CommentThreadComunicationInfo = new CommentThreadComunicationInfo();
    commentThreadComunicationInfo.show = true;
    commentThreadComunicationInfo.commentThread = Object.assign({}, this.commentThread);
    this._commentComunicationService.showModalDownload(commentThreadComunicationInfo);
  }

  // Send new message
  sendMessage() {
    if (!this.newComment.isEmpty()) {
      this.newComment.id = uuid();
      this.newComment.timestamp = new Date();
      this.newComment.workspaceAccess = this.workspaceAccess;
      if (this.commentMention) {
        this.newComment.commentThreadMention = this.commentMention;
      }
      if (this.newComment.type === 'file' || this.newComment.type === 'audio') {
        if (this.newComment.commentText && this.newComment.commentText.length > 0) {
          this.newComment.type += '-text';
        }
      }
      this._commentThreadService
        .createComment(this.commentThread.id, Object.assign(new CommentThreadMessage(), this.newComment))
        .subscribe(response => {
          setTimeout(() => {
            this.commentInput.reset();
            this.newComment = new CommentThreadMessage();
            this.commentMention = undefined;
            this.scroll.scrollToBottom();
            console.log(this.newComment);
          });
        });

    }
  }

  // #region Record Action

  onStartRecordAction(start: boolean) {
    this.commentAction = 'record';
  }
  onCancelRecord() {
    this.commentAction = 'main';
  }
  onAcceptRecord(commentThreadMessage: CommentThreadMessage) {

    this.newComment.type = 'audio';
    this.newComment.commentAudio = commentThreadMessage.commentAudio;
    this.newComment.commentAudioDuration = commentThreadMessage.commentAudioDuration;
    this.commentAction = 'main';
    console.log(this.newComment);
  }
  onResizeComment() {
    setTimeout(() => {
      this.scroll.update();
    });
  }
  onReplyComment(commentThreadMessage: CommentThreadMessage) {
    this.commentMention = commentThreadMessage;
    this.commentInput.textArea.nativeElement.focus();
  }
  onRemoveMention(commentMention) {
    this.commentMention = commentMention;
  }
  scrollToComment(commentThreadMessage: CommentThreadMessage) {
    const $comment = $('#comment-' + commentThreadMessage.id);
    const scroll = this._utilSevice.getScrollParent($comment.get(0), true);
    const commentBox = this.commentBoxes.filter(cb => cb.comment.id === commentThreadMessage.id)[0];
    commentBox.focusBox();
    this._utilSevice.scrollTo(scroll, $comment.get(0), 0, 350);
  }
  // #endregion
  /**
   * Toggle view sidenav
   */
  toggleView() {
    if (this.view === 'comments') {
      this.view = 'summary';
    } else {
      this.view = 'comments';
      setTimeout(() => {
        this.scroll.scrollToBottom();
      });
    }

  }
  // On delete hide sidenav
  onDelete() {
    // Remove warpper
    const selection = $('.comment-thread-selection-' + this.commentThread.id);
    selection.contents().unwrap();
    const contentEdiable = $(`.comment-thread-selection-${this.commentThread.id}`).closest('[contenteditable]')
    if (contentEdiable.length > 0) {
      contentEdiable.trigger('content-change');
    }
    this.commentsThreadSideNav.hideSidenav();
  }
  trackById(index: number, comment: CommentThreadMessage) {
    // console.log(index, comment);
    return comment.id;
  }
  trackByDate(index: number, day: any) {
    return index;
  }
  // On resize
  @HostListener('window:resize', ['$event']) onResize(event) {
    this.resiseSidenav();
  }
  //#region Floating note

  // On Mouse up floating note
  @HostListener('window:mouseup', ['$event']) mouseUp($event) {
    
      // Selection
      const selection = this._rangyService.getHTMLOfSelection();
      if (!selection.empty) {


        const parentEl = $(selection.range.commonAncestorContainer);

        if (parentEl.closest('.floating-note-watch').length > 0) {
          // Un wrapp selecion
          this.unwrapSelection();
          // Wrapper
          const wrapperSelection = this._rangyService.self.
            createClassApplier('floating-note-selection-wrapper', {
              tagNames: ['*'],
              normalize: true,
              onElementCreate: (el, applier) => { }
            });
          // Apply wrapper
          wrapperSelection.applyToRange(selection.range);

          setTimeout(() => {
            const position = this.getPositionSelection();
            this.clearSelection();
            this.floatingNoteEvent.type = 'commentThread';
            this.floatingNoteEvent.core = this.core;
            this.floatingNoteEvent.commentThread = this.commentThread;
            this.floatingNoteEvent.left = position.left;
            this.floatingNoteEvent.top = position.top;
            this.floatingNoteEvent.visible = true;
            this.floatingNoteEvent.plainText = selection.plainText;
            // Show
            this._floatingNoteWorkflowService.onShowToolbarFloatingNote(this.floatingNoteEvent);
          });

        }
      } else {
        this.hideFloatingNoteToolbar();
      }
    
  }

  /**
   * Get the position of selection
   */
  private getPositionSelection() {
    // Get the wrapper element selection

    const wrapperEl = $('.floating-note-selection-wrapper' + ':last');
    const $daysWrapper = $(this.daysWrapper.nativeElement);

    const wrapperElementOffset = wrapperEl.offset();

    // Point size
    let top = 0;
    let left = 0;

    const textNode = wrapperEl.get(0).firstChild;
    const range = document.createRange();
    range.selectNodeContents(textNode);
    const rects = range.getClientRects();

    if (rects.length > 0) {

      top = rects[rects.length - 1].top  - 5;
      left = rects[rects.length - 1].right ;

    } else {
      top = wrapperElementOffset.top;
      left = wrapperElementOffset.left;
    }


    // daysWrapper

    return { left: left, top: top };
  }

  private unwrapSelection() {
    const selectionWrapper = $('.floating-note-selection-wrapper');
    selectionWrapper.contents().unwrap();
  }

  private clearSelection() {

    if (window.getSelection) {
      const sel = window.getSelection();
      sel.removeAllRanges();
    }
  }

  private hideFloatingNoteToolbar() {
    this.unwrapSelection();
    this.floatingNoteEvent.visible = false;
    // Hide
    this._floatingNoteWorkflowService.onShowToolbarFloatingNote(this.floatingNoteEvent);
  }
 
  //#endregion


  // On destroy
  ngOnDestroy() {
    if (this.sidenavInformation && this.sidenavInformation.commentThread && this.sidenavInformation.commentThread.id !== null) {
      const selection = $('.comment-thread-selection-' + this.commentThread.id);
      selection.removeClass('active');
    }
    if (this.subscriptionSidenav) {
      this.subscriptionSidenav.unsubscribe();
    }
    if (this.subscriptionCommentThreadMessages) {
      this.subscriptionCommentThreadMessages.unsubscribe();
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}

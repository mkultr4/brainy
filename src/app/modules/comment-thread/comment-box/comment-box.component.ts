import {
  Component, OnInit, Input, Output,
  EventEmitter, ViewChild, ElementRef,
   AfterViewInit, OnDestroy
} from '@angular/core';
import { CommentThreadMessage } from '../../../models/comments/comment-thread-message';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { CommentThread } from '../../../models/comments/comment-thread';
import { UtilService } from '../../../services/utils/util.service';
import { CommentThreadStrategyService } from '../../../services/comments/comment-thread-strategy.service';




@Component({
  selector: 'app-comment-box,[app-comment-box]',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.scss']
})
export class CommentBoxComponent implements OnInit, AfterViewInit, OnDestroy {
  public commentEditing = false;
  public zoomedImageSrc = null;
  public commentTextDraft = '';
  public commentReply: CommentThreadMessage;
  public focused = false;
  // Services
  private _commentThreadService;
  // Inputs
  @Input() first = false;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() commentThread: CommentThread;
  @Input() comment: CommentThreadMessage = new CommentThreadMessage();
  @Input() disabledEdition = true;
  // Outputs
  @Output() commentOnResize = new EventEmitter();
  @Output() commentOnReply = new EventEmitter();
  @Output() commentOnScrollToComment = new EventEmitter();
  // view child
  @ViewChild('commentTextTextArea') commentTextTextArea: ElementRef;


  constructor(
    private _commentThreadStrategyService: CommentThreadStrategyService,
    private _utilService: UtilService, private elementRef: ElementRef) {
      this._commentThreadService = this._commentThreadStrategyService.getService();
  }

  ngOnInit() {
  }
  ngAfterViewInit() {

    if (this.comment.isNewMessage) {
      setTimeout(() => {
        this.comment.isNewMessage = false;
      }, 2500);
    }
  }
  /**
   * Delete message
   * @param isDel
   */
  deleteComment(isDel: boolean) {

    if (isDel) {
      this._commentThreadService
      .deleteComment(this.commentThread.id, this.comment.id)
      .subscribe();
      this.commentOnResize.emit();
    }
  }
  /**
   * Edit text message
   */
  editTextMessage() {
    this.commentEditing = true;

    setTimeout(() => {
      const parentScroll = this._utilService.getScrollParent(this.elementRef.nativeElement, true);
      this._utilService.scrollTo(parentScroll, this.elementRef.nativeElement);
      this.commentTextDraft = this.comment.commentText;
      this.commentTextTextArea.nativeElement.focus();
    });

  }
  /**
   * Save text message
   * @param $event
   */
  saveTextMessage($event = null) {
    if ($event) {
      $event.preventDefault();
      $event.stopPropagation();
    }
    this.commentEditing = false;
    this.comment.edited = true;
    this._commentThreadService.updateComment(this.commentThread.id, this.comment).subscribe();
  }
  cancelTextMessage($event) {
    $event.preventDefault();
    $event.stopPropagation();
    this.commentEditing = false;
  }
  createReply($event = null) {
    this.commentOnReply.emit(this.comment);
  }
  // Scroll comment
  scollComment(commentThreadMessage: CommentThreadMessage) {
    this.commentOnScrollToComment.emit(commentThreadMessage);
  }
  focusBox() {
    this.focused = true;
    setTimeout(() => {
      this.focused = false;
    }, 2500);
  }
  ngOnDestroy() {

  }
}

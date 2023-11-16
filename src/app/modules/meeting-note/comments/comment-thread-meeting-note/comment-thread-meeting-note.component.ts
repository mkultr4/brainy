import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, HostListener, OnDestroy } from '@angular/core';
import { CommentThreadPointComponent } from 'src/app/modules/comment-thread/comment-thread-point/comment-thread-point.component';
import { CommentComunicationService } from 'src/app/modules/comment-thread/services/comment-comunication.service';
import { MeetingNoteCommentsService } from '../../services/meeting-note-comments.service';
import { POINT_SIZE } from 'src/app/models/comments/comment-thread';
import { CommentThreadStrategyService } from 'src/app/services/comments/comment-thread-strategy.service';

@Component({
  selector: 'app-comment-thread-meeting-note',
  templateUrl: './comment-thread-meeting-note.component.html',
  styleUrls: ['./comment-thread-meeting-note.component.scss']
})
export class CommentThreadMeetingNoteComponent
  extends CommentThreadPointComponent implements AfterViewInit, OnDestroy {
  // Services
  private _commentThreadService;

  constructor(
    private _meetingNoteCommentsService: MeetingNoteCommentsService,
    private _commentThreadStrategyService: CommentThreadStrategyService,
    elementRef: ElementRef,
    _commentCosmunicationService: CommentComunicationService
  ) {
    super(elementRef, _commentCosmunicationService);
    this._commentThreadService = this._commentThreadStrategyService.getService();
  }

  ngAfterViewInit() {
    const timeout = this.commentThread.saved ? 300 : 0;
    setTimeout(() => {
      this.resize();
      $(this.elementRef.nativeElement)
      .find('.comment-thread-point-meeting-note').on('resize', () => {
        this.resize();
      });
    })
  }

  public resize() {
    if (this.commentThread.event === 'selection') {
      this.resizeSelection();
    } else if (this.commentThread.event === 'click') {
      this.resizeClick();
    }
  }

  // Resize selecion
  resizeSelection() {
    let commentThreadPosition = this._meetingNoteCommentsService.getPositionSelection(this.commentThread.id)
    if (commentThreadPosition) {
      this.commentThread.left = commentThreadPosition.left;
      this.commentThread.top = commentThreadPosition.top;
    }
  }

  resizeClick() {
    if (this.commentThread.objectReference === 'task') {
      setTimeout(() => {
        this.resizeClickTask();
      });
    } 
  }
  // Resise click task
  resizeClickTask() {
    let update = false;
    const lineTask = $(`#${this.commentThread.objectReferenceId}`);
    if (lineTask.length > 0) {
      const scroll = lineTask.closest(`.closest-comment-thread-container`);
      const taskBlockWrapper = lineTask.find(`.task-block-wrapper`);
      const lineTaskOffset = lineTask.offset();
      const scrollOffset = scroll.offset();
      const offsetTopTask = (lineTaskOffset.top - scroll.offset().top) + scroll.scrollTop();

      if (offsetTopTask !== this.commentThread.containerTop || lineTask.hasClass('sorter')) {
        let diff = offsetTopTask - this.commentThread.containerTop;
        this.commentThread.originalTop = this.commentThread.originalTop + diff;
        this.commentThread.containerTop = offsetTopTask;
        update = true;
      }
      const currentWidth = taskBlockWrapper.outerWidth();
      const currentHeight = taskBlockWrapper.outerHeight();

      let newLeft = this.commentThread.originalLeft;
      let newTop = this.commentThread.originalTop * (currentHeight / this.commentThread.originalContainerHeight);
      // Max position
      const maxLeft = (lineTaskOffset.left - scrollOffset.left) + currentWidth;
      const maxTop = (lineTaskOffset.top - scrollOffset.top) + scroll.scrollTop() + currentHeight;
      
      // Check if position overflow
      if (maxLeft < newLeft) {
        // this.commentThread.originalLeft = maxLeft
        this.commentThread.originalContainerWidth = currentWidth;
        newLeft = maxLeft
      }

      console.log('maxLeft',maxLeft);
      console.log('newLeft',newLeft);
      if (maxTop < newTop) {
        newTop = maxTop;
        if (lineTask.hasClass('updated')) {
          update = true;
          this.commentThread.originalTop = maxTop;
          this.commentThread.originalContainerHeight = currentHeight;
        }
      }
      this.commentThread.left = newLeft;
      this.commentThread.top = newTop;

      setTimeout(() => {
        if (update) {
          this._commentThreadService.update(this.commentThread).subscribe();
        }
      });
    }
  }
  // Resize click image
  resizeClickImage() {
    let update = false;
    const image = $(`#${this.commentThread.objectReferenceId}`).find('.gallery-image');
    if (image.length > 0) {
      console.log(this.commentThread);
      const scroll = image.closest(`.closest-comment-thread-container`);
      const imageOffset = image.offset();
      const scrollOffset = scroll.offset();
      const offsetTopImage = (imageOffset.top - scrollOffset.top) + scroll.scrollTop();

      if (offsetTopImage !== this.commentThread.containerTop) {
        console.log('top changed');
        let diff = offsetTopImage - this.commentThread.containerTop;
        this.commentThread.originalTop = this.commentThread.originalTop + diff;
        this.commentThread.containerTop = offsetTopImage;
        update = true;
      }
      const currentWidth = image.outerWidth();
      const currentHeight = image.outerHeight();
      console.log('currentWidth', currentWidth);
      console.log('currentHeight', currentHeight);

      console.log(`calc(${(this.commentThread.originalLeft * 100) / this.commentThread.originalContainerWidth}% - 0px)`);
      console.log(`calc(${(this.commentThread.originalTop * 100) / this.commentThread.originalContainerHeight}% - 0px)`);

      let newLeft = (this.commentThread.originalLeft * currentWidth) / this.commentThread.originalContainerWidth;
      let newTop = (this.commentThread.originalTop * currentHeight) / this.commentThread.originalContainerHeight;


      this.commentThread.left = newLeft;
      this.commentThread.top = newTop;

      setTimeout(() => {
        if (update) {
          this._commentThreadService.update(this.commentThread).subscribe();
        }
      });
    }
  }
  @HostListener('window:resize', ['$event']) onResize(event) {
    setTimeout(() => {
      this.resize();
    })
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    // Unbind jquery events
    $(this.elementRef.nativeElement).find('.comment-thread-point-meeting-note').off('resize', () => {
    });
  }
}

import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { POINT_SIZE } from 'src/app/models/comments/comment-thread';
import { CommentThreadPointComponent } from 'src/app/modules/comment-thread/comment-thread-point/comment-thread-point.component';
import { CommentThreadStrategyService } from 'src/app/services/comments/comment-thread-strategy.service';
import { CommentComunicationService } from 'src/app/modules/comment-thread/services/comment-comunication.service';

@Component({
  selector: 'app-comment-thread-image',
  templateUrl: './comment-thread-image.component.html',
  styleUrls: ['./comment-thread-image.component.scss']
})
export class CommentThreadImageComponent 
extends CommentThreadPointComponent
implements OnInit {
  public pinSize = POINT_SIZE.width;
  // Services
  private _commentThreadService;
  // Input
  @Input() naturalWidth;
  @Input() naturalHeight;

  constructor(
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
      .find('.comment-thread-point-brief,.comment-thread-meeting-note').on('resize', () => {
        this.resize();
      });
    })
  }
  resize() {

  }
  ngOnDestroy() {
    super.ngOnDestroy();
    // Unbind jquery events
    $(this.elementRef.nativeElement).find('.comment-thread-point-brief,.comment-thread-meeting-note').off('resize', () => {
    });
  }

}

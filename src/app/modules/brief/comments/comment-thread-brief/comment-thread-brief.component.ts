import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, HostListener } from '@angular/core';
import { CommentThreadPointComponent } from 'src/app/modules/comment-thread/comment-thread-point/comment-thread-point.component';
import { CommentThreadStrategyService } from 'src/app/services/comments/comment-thread-strategy.service';
import { BriefCommentsService } from '../../services/brief-comments.service';
import { CommentComunicationService } from 'src/app/modules/comment-thread/services/comment-comunication.service';

@Component({
  selector: 'app-comment-thread-brief',
  templateUrl: './comment-thread-brief.component.html',
  styleUrls: ['./comment-thread-brief.component.scss']
})
export class CommentThreadBriefComponent 
extends CommentThreadPointComponent implements AfterViewInit, OnDestroy 
{
  // Services
  private _commentThreadService;

  constructor(
    private _briefCommentsService: BriefCommentsService,
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
      $(this.elementRef.nativeElement).find('.comment-thread-point-brief').on('resize', () => {
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
    let commentThreadPosition = this._briefCommentsService.getPositionSelection(this.commentThread.id)
    if (commentThreadPosition) {
      this.commentThread.left = commentThreadPosition.left;
      this.commentThread.top = commentThreadPosition.top;
    }
  }

  resizeClick() {
     
  }
  
  @HostListener('window:resize', ['$event']) onResize(event) {
    setTimeout(() => {
      this.resize();
    })
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    // Unbind jquery events
    $(this.elementRef.nativeElement).find('.comment-thread-point-brief').off('resize', () => {
    });
  }

}

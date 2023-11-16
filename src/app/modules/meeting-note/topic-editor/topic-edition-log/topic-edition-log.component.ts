import { Component, OnInit, Input, ElementRef, OnDestroy, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { TopicEditionLog } from 'src/app/models/meeting-note/topic-edition-log';
import { TopicLineItemReference } from 'src/app/models/meeting-note/topic-line-item-reference';

@Component({
  selector: 'app-topic-edition-log',
  templateUrl: './topic-edition-log.component.html',
  styleUrls: ['./topic-edition-log.component.scss']
})
export class TopicEditionLogComponent implements OnInit, AfterViewInit, OnDestroy {
  public left = 0;
  public top = 0;
  public visible = false;
  @Input() topicEditionLog: TopicEditionLog;
  @ViewChild('topicEditionLogEl') topicEditionLogEl: ElementRef;
  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.resize();
      $(this.elementRef.nativeElement).find('.topic-edition-log').on('resize', () => {
        this.resize();
      });
    }, 300)
  }

  resize() {
    const position = this.getPositionSelection();
    if (position) {
      this.visible = true;
      this.left = position.left;
      this.top = position.top;
    } else {
      this.visible = false;
    }
  }

  public getPositionSelection() {
    // Get the wrapper element selection
    // 'closest-comment-thread-container'
    const wrapperEl = $('.topic-editor').find('#topic-line-edited-' + this.topicEditionLog.id);
    let parent = wrapperEl.closest('.closest-comment-thread-container');
    if (this.topicEditionLog.reference === TopicLineItemReference.DESCRIPTION) {
      parent = wrapperEl.closest('#scroll-topic-description');
    } else {
      parent = wrapperEl.closest('#scroll-agreements');

    }


    if (wrapperEl.length > 0 && parent.length > 0) {

      const offsetParent = parent.offset();
      const scrollTop = parent.scrollTop();

      const wrapperElementOffset = wrapperEl.offset();

      // Point size
      let top = 0;
      let left = 0;

      const textNode = wrapperEl.get(0).firstChild;
      const range = document.createRange();
      range.selectNodeContents(textNode);
      const rects = range.getClientRects();

      if (rects.length > 0) {
        const diffHeight = (wrapperEl.height() - this.topicEditionLogEl.nativeElement.clientHeight) / 2;
        top = rects[rects.length - 1].top - offsetParent.top + scrollTop + diffHeight;
        left = rects[rects.length - 1].right - offsetParent.left + 10;
      } else {
        top = wrapperElementOffset.top - offsetParent.top + scrollTop;
        left = (wrapperElementOffset.left - offsetParent.left) + wrapperEl.width();
      }
      return { left: left, top: top };
    }
    return null;
  }
  mouseover() {
    $('.topic-editor').find('#topic-line-edited-' + this.topicEditionLog.id).addClass('active');
  }
  mouseleave() {
    $('.topic-editor').find('#topic-line-edited-' + this.topicEditionLog.id).removeClass('active');
  }
  @HostListener('window:resize', ['$event']) onResize(event) {
    setTimeout(() => {
      this.resize();
    })
  }
  ngOnDestroy() {
    $(this.elementRef.nativeElement).find('.topic-edition-log').off('resize', () => {

    });
  }

}

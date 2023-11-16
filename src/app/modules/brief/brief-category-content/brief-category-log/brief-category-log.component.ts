import { Component, OnInit, Input, ElementRef, ViewChild, OnDestroy, HostListener } from '@angular/core';
import { CategoryEditionLog } from 'src/app/models/brief/category-edition-log';

@Component({
  selector: 'app-brief-category-log',
  templateUrl: './brief-category-log.component.html',
  styleUrls: ['./brief-category-log.component.scss']
})
export class BriefCategoryLogComponent implements OnInit, OnDestroy {
  public left = 0;
  public top = 0;
  public visible = false;
  @Input() categoryEditionLog: CategoryEditionLog;
  @ViewChild('categoryEditionLogEl') categoryEditionLogEl: ElementRef;
  constructor(
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.resize();
      $(this.elementRef.nativeElement).find('.category-edition-log').on('resize', () => {
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
    const wrapperEl = $('#scroll-category-content').find('#category-line-edited-' + this.categoryEditionLog.id);
    let parent = wrapperEl.closest('.closest-comment-thread-container');


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
        const diffHeight = (wrapperEl.height() - this.categoryEditionLogEl.nativeElement.clientHeight) / 2;
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
    $('#scroll-category-content').find('#category-line-edited-' + this.categoryEditionLog.id).addClass('active');
  }
  mouseleave() {
    $('#scroll-category-content').find('#category-line-edited-' + this.categoryEditionLog.id).removeClass('active');
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

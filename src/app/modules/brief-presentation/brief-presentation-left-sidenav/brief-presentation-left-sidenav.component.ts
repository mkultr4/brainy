import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { BriefPresentation } from 'src/app/models/brief-presentation/brief-presentation';
import { WorkflowService } from 'src/app/services/workflow/workflow.service';
import { BriefPresentationSlide } from 'src/app/models/brief-presentation/brief-presentation-slide';
import { BriefPresentationStrategyService } from 'src/app/services/brief-presentation/brief-presentation-strategy.service';
import { PerfectScrollbarDirective } from 'ngx-perfect-scrollbar';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'app-brief-presentation-left-sidenav',
  templateUrl: './brief-presentation-left-sidenav.component.html',
  styleUrls: ['./brief-presentation-left-sidenav.component.scss']
})
export class BriefPresentationLeftSidenavComponent implements OnInit {
  public sorting = false;
  public sortableOptions: SortablejsOptions = {
    forceFallback: true,
    fallbackClass: 'sortable-fallback',
    filter: '.ignore-item',
    handle: '.slide-drag-handler',
    onStart: () => {
      
    },
    onEnd: () => {
      
    },
    onUpdate: (event) => {
   
    }
  };
  // Service
  private _briefPresentationService;
  // Inputs
  @Input() compressed = false;
  @Input() editable = true;
  @Input() briefPresentation: BriefPresentation = new BriefPresentation();
  @Input() slideshow: BriefPresentationSlide[] = [];
  @Input() slideToShow: BriefPresentationSlide = new BriefPresentationSlide();
  // Ouput
  @Output() onCompress = new EventEmitter();
  @Output() showSlide = new EventEmitter();
  @Output() onCopySlide = new EventEmitter();
  // View childs
  @ViewChild('scrollSlides', { read: PerfectScrollbarDirective }) scrollSlides: PerfectScrollbarDirective;
  // Constructor
  constructor(
    private _workflowService: WorkflowService,
    private _briefPresentationStrategyService: BriefPresentationStrategyService
  ) {
    this._briefPresentationService = this._briefPresentationStrategyService.getService();
  }
  // Init
  ngOnInit() {
  }
  /** On compress sidenav */
  compress() {
    this._workflowService.compressLeftSidenav(!this.compressed);
    this.onCompress.emit();
  }
  /**
   * On show emit
   * @param slide 
   */
  onShowSlide(slide: BriefPresentationSlide) {
    this.showSlide.emit(slide);
  }
  /**
   * On add slide
   */
  addSlide() {
    const slide = new BriefPresentationSlide();
    this._briefPresentationService.addSlide(slide).subscribe(sl => {
      this.showSlide.emit(sl);
      setTimeout(() => {
        this.scrollSlides.scrollToBottom();
      });


    });

  }

  onDeleteSlide(slide: BriefPresentationSlide) {
    this._briefPresentationService.removeSlide(slide).subscribe(slide => {

      if (this.slideToShow.id === slide.id) {
        if (this.slideshow.length > 0) {
          this.showSlide.emit(this.slideshow[0]);
        } else {
          this.showSlide.emit(undefined);
        }
      }
      setTimeout(() => {
        this.scrollSlides.update();
      });
    });
  }
  /**
   * On copy slide
   * @param slide 
   */
  copySlide(slide: BriefPresentationSlide) {
    this.onCopySlide.emit(slide);
  }

  onSortStart(event) {
    console.log(this.scrollSlides, event);
    this.sorting = true;
    // this._renderer2.addClass(this.scrollSlides.elementRef.nativeElement,'sorting');
  }
  /**
   * On sort end
   */
  onSortEnd(event) {
    this.sorting = false;
    let order = 1;
    this.slideshow.forEach(slide => {
      slide.order = order;
      order++;
    });

    this._briefPresentationService.updateOrderSlideshow(this.slideToShow).subscribe();
  }
  /**
   * On sort update
   * @param event 
   */
  onSortUpdate(event) {

    // this.orderItems();
  }


}

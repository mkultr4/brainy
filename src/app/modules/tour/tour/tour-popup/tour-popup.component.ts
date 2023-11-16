import {
  Component, OnInit, Input, Output, EventEmitter, AfterViewInit, ViewChild, ElementRef,
  HostListener, OnDestroy
} from '@angular/core';
import { Tour } from '../tour';
import { TourOptions } from '../tour-options';
import { UtilService } from '../../../../services/utils/util.service';






@Component({
  selector: 'app-tour-popup,[app-ºtour-popup]',
  templateUrl: './tour-popup.component.html',
  styleUrls: ['./tour-popup.component.scss']
})
export class TourPopupComponent implements OnInit, AfterViewInit, OnDestroy {
  public edge = 'right';
  public align = 'center';
  public left: number;
  public top: number;
  public arrowTop: number;
  public show = false;
  public message = '';
  public stepInner = 0;
  //  public resizeObserver: ResizeObserver;
  public tourPopupClass = '';
  public popupBtnClass = '';
  public arrowHeight = 35;
  public popupArrow = false;
  @ViewChild('popup') popup: ElementRef;
  @Input() tour: Tour;
  @Input() tourOptions: TourOptions;
  @Input() currentStep: number = 0;
  @Input() last: boolean;
  @Input() btnText: string;
  @Output() popupOnNextStep = new EventEmitter();
  @Output() popupOnPreviousStep = new EventEmitter();
  @Output() popupOnEndTour = new EventEmitter();

  constructor(private _utilService: UtilService) { }
  ngAfterViewInit() {



  }
  ngOnInit() { }

  positionated() {

    const target = $(this.tour.target);
    const offsetHorizonalAlign = 11;
    const $popup = $(this.popup.nativeElement);
    const rect = target.get(0).getBoundingClientRect();
    const arrowOffset = this.popupArrow ? 10 : 0;
    let gutterAlignament = 0;
    
    if(!isNaN(this.tour.gutterAlignament )){
      gutterAlignament = this.tour.gutterAlignament;
    }
    else if (!isNaN(this.tourOptions.gutterAlignament)) {
      gutterAlignament = this.tourOptions.gutterAlignament;
    }
    let top = 0, left = 0;
    // Top Position

    if (this.align === 'center') {
      top = rect.top - ($popup.outerHeight() / 2) + (target.outerHeight() / 2) + gutterAlignament;
    } else if (this.align === 'top') {
      top = rect.top + gutterAlignament;
    }

    const offsetTopSum = top + $popup.outerHeight();

    if (offsetTopSum > window.innerHeight) {
      const diff = offsetTopSum - window.innerHeight;
      top = top - 10 - diff;
    }
    const windowLeft = rect.left;
    const windowRight = window.innerWidth - rect.left;
    this.edge = 'right';
    if (windowRight >= $popup.outerWidth() || windowLeft >= $popup.outerWidth()) {

      if (windowLeft > windowRight) {
        this.edge = 'left';
      }
    }

    // Left Position
    if (this.edge === 'right') {
      left = rect.left + offsetHorizonalAlign + target.outerWidth() + arrowOffset;
    } else if (this.edge === 'left') {

      left = rect.left - offsetHorizonalAlign - $popup.outerWidth() - arrowOffset;
    }

    // Target Top + popup top + arrow/2 + target height
    let arrowTop;
    // If arrow fixed position
    if (this.tourOptions.popupArrowTop) {
      arrowTop = this.tourOptions.popupArrowTop;
      // If only a tour popup
    } else if (this.tour.popupArrowTop) {
      arrowTop = this.tour.popupArrowTop;
    } else {
      if (this.align === 'center') {
        arrowTop = (rect.top - top) + ((target.outerHeight() / 2) - (this.arrowHeight / 2));
      } else if (this.align === 'top') {
        arrowTop = (rect.top - top) + ((target.outerHeight() / 2) - (this.arrowHeight / 2));
      }
    }

    this.arrowTop = arrowTop;
    this.left = left;
    this.top = top;

    // $popup.css({left:this.left + 'px',top:this.top+ 'px'});

  }
  /**
   * Show popup
   */
  showPopup() {
    const target = $(this.tour.target);
    const $popup = $(this.popup.nativeElement);
    if (this.tourOptions.popupClass) {
      this.tourPopupClass = this.tourOptions.popupClass;
    }
    if (this.tourOptions.popupBtnClass) {
      this.popupBtnClass = this.tourOptions.popupBtnClass;
    }
    if (this.tourOptions.popupArrow) {
      this.popupArrow = this.tourOptions.popupArrow;
    }

    setTimeout(() => {
      // Position
      this.positionated();

      this.show = true;
      // Classes
      target.addClass('tour-active');
      // Callback
      if (this.tour.callbackStart) {
        this.tour.callbackStart(this);
      }

      // Scroll
      if (this.tour.autoScroll) {
        this.scrollToTarget();
      }
      /*var scrollParent = getScrollParent(target[0]);
      scrollTo(scrollParent, target);*/
      // End Scroll

      // Pulse EL
      $(this.tour.pulseTarget).addClass('pulse-target-active');

    });


  }

  private scrollToTarget() {
    const target = $(this.tour.target).get(0);
    const parentScroll = this._utilService.getScrollParent(target);
    this._utilService.scrollTo(parentScroll, target);
  }
  // Previous step
  prevStep($event) {
    $event.preventDefault();
    $event.stopPropagation();
    const target = $($event.target);
    if (target) {
      target.blur();
    }

    this.finishPopup();
    this.popupOnPreviousStep.emit();
    return false;
  }
  // Next step
  nextStep($event) {
    const target = $($event.target);
    if (target) {
      target.blur();
    }

    this.finishPopup();
    this.popupOnNextStep.emit();


    return false;



  }
  // Finish popup
  finishPopup() {

    $(this.tour.target).removeClass('tour-active');
    $(this.tour.pulseTarget).removeClass('pulse-target-active');
    if (this.tour.callbackEnd) {
      this.tour.callbackEnd(this);
    }
  }
  // End tour
  endTour() {

    this.finishPopup();
    this.popupOnEndTour.emit();
  }

  // Window resixe
  @HostListener('window:resize', ['$event']) onResize(event) {
    setTimeout(() => {
      this.positionated();
    });
  }
  // Destroy
  ngOnDestroy() {
    //  this.resizeObserver.disconnect();
  }
}

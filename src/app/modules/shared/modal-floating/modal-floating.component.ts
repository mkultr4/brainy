import { Component, OnInit, Output, Input, AfterViewInit, ElementRef, HostListener, OnDestroy, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-modal-floating,[app-modal-floating]',
  templateUrl: './modal-floating.component.html',
  styleUrls: ['./modal-floating.component.scss']
})
export class ModalFloatingComponent implements OnInit, AfterViewInit, OnDestroy {

  public $modal;
  public $origin;
  public show = false;
  public mutation: MutationObserver;

  @Input('modalFloatingEdge') modalFloatingEdge = 'left';
  @Input('modalFloatingAlign') modalFloatingAlign = 'bottom';
  @Input('modalFloatingContainer') modalFloatingContainer: string;
  @Input('modalFloatingConstraintWidth') modalFloatingConstraintWidth = false;
  @Input('modalFloatingGutter') modalFloatingGutter = 0;
  @Input('modalFloatingBtnId') modalFloatingBtnId;
  @Input('disableClosePicker') disableClosePicker = false;
  // Fix position outside screen
  @Input('modalAutoFixPosition') modalAutoFixPosition = true;
  @Input('modalWithArrow') modalWithArrow = false;

  @Output() modalOnShow = new EventEmitter();
  @Output() modalOnHide = new EventEmitter();

  constructor(public elementRef: ElementRef) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initModal();
    });
  }


  initModal() {
    if (this.elementRef && this.elementRef.nativeElement) {
      this.$modal = $(this.elementRef.nativeElement);
      this.$origin = $(this.modalFloatingBtnId);
      if (this.$modal.length > 0) {
        $('body').append(this.$modal);
        this.initEvents();
      }
    }
  }
  // Events
  initEvents() {

    // Origin
    this.$origin.on('click', (e) => { this.onClickOnTrigger(e); });
    this.$origin.bind('modal-close', (e) => { this.onClickModalClose(e); });
    this.$origin.bind('modal-open', (e) => { this.onClickOnTrigger(e); });
    // Modal
    this.$modal.on('click', '.modal-close', (e) => { this.onClickModalClose(e); });
    this.$modal.bind('modal-close', (e) => { this.onClickModalClose(e); });
    this.$modal.bind('modal-open', (e) => { this.onClickOnTrigger(e); });

    $('*').bind('scroll.modal-floating', ($event) => {
      if ($(event.target).closest('[app-modal-floating]').length === 0) {
        this.hideModal();
      }
    });
  }

  @HostListener('window:click', ['$event']) onWindowClick($event) {
    // let target =$($event.target);
    if (this.$modal && this.$modal.length > 0) {
      this.onClickOutsideFn($event);
    }
  }
  @HostListener('window:resize', ['$event']) onWindowResize($event) {
    this.hideModal();
  }
  onClickOnTrigger(e) {

    if (this.$modal.hasClass('open')) {
      this.hideModal();
    } else {

      this.showModal();
    }
  }
  onClickModalClose(e) {
    this.hideModal();

  }
  onClickOutsideFn(e) {
    const target = $(e.target);
    const closestTarget = target.closest('.modal-floating-trigger');
    if (this.$modal.hasClass('open') &&
      !(target.hasClass('.modal-prevent-close')) &&
      target.closest('.modal-prevent-close').length === 0 &&
      !(target[0] === this.$origin[0]) && !(closestTarget[0] === this.$origin[0])) {
      if (!this.disableClosePicker) {
        this.hideModal();
      } else {
        if (target.closest('.picker').length === 0) {
          this.hideModal();
        }
      }
    }
  }
  // Posisionated modal
  posisionated() {
    if (this.modalFloatingConstraintWidth) {
      if (this.modalFloatingContainer) {
        if (this.$origin.closest(this.modalFloatingContainer).length > 0) {
          const parent = this.$origin.closest(this.modalFloatingContainer);
          this.$modal.width(parent.outerWidth() + 'px');
        }
      } else {
        this.$modal.width(this.$origin.outerWidth() + 'px');
      }
    }
    let left = 0, top = 0;
    let rect = { top: 0, left: 0 };

    if (this.modalFloatingContainer) {
      const parent = $(this.modalFloatingContainer);
      rect = parent[0].getBoundingClientRect();
    } else {
      rect = this.$origin[0].getBoundingClientRect();
    }

    top = rect.top;

    if (this.modalFloatingEdge === 'left') {

      left = rect.left - (this.$modal.outerWidth() + this.modalFloatingGutter);

    } else if (this.modalFloatingEdge === 'right') {
      left = rect.left + (this.$origin.outerWidth() + this.modalFloatingGutter);
      if (window.innerWidth < (left + this.$modal.outerWidth()) && this.modalAutoFixPosition) {
        const diff = (left + this.$modal.outerWidth()) - window.innerWidth;
        left = left - diff;
      }

    } else if (this.modalFloatingEdge === 'bottom') {
      left = rect.left;
      top = rect.top + this.$origin.outerHeight() + this.modalFloatingGutter;
      if (window.innerHeight < (top + this.$modal.outerHeight()) && this.modalAutoFixPosition) {
        
        if(this.modalWithArrow){
          top = rect.top  - this.modalFloatingGutter -  this.$modal.outerHeight();
          
        }else{
          const diff = (top + this.$modal.outerHeight()) - window.innerHeight;
            top = top - diff;
            console.log(top);
        }
      }
    }
    // Align
    if (this.modalFloatingEdge === 'right' || this.modalFloatingEdge === 'left') {
      if (this.modalFloatingAlign === 'top') {
        top = top - this.$modal.outerHeight();
        if (top < 0) {
          top = 0;
        } else if (window.innerHeight < (top + this.$modal.outerHeight()) && this.modalAutoFixPosition) {
          const diff = (top + this.$modal.outerHeight()) - window.innerHeight;
          top = top - diff;
        }
      }
      if (this.modalFloatingAlign === 'bottom') {
        if (window.innerHeight < (top + this.$modal.outerHeight()) && this.modalAutoFixPosition) {
          const diff = (top + this.$modal.outerHeight()) - window.innerHeight;
          top = top - diff;
        }
      }
      if (this.modalFloatingAlign === 'center') {
        top = top - this.$modal.outerHeight() / 2 + this.$origin.outerHeight() / 2;
        if (window.innerHeight < (top + this.$modal.outerHeight() / 2) && this.modalAutoFixPosition) {
          const diff = (top + this.$modal.outerHeight() / 2) - window.innerHeight;
          top = top - diff;
        }
      }
    }
    if(this.modalFloatingEdge === 'bottom' || this.modalFloatingEdge === 'top'){

        if (this.$modal.outerWidth() > this.$origin.width()) {
          const midLeft = (this.$modal.outerWidth()) - (this.$origin.outerWidth());
          left = rect.left - midLeft / 2;
        } else {
          const midLeft = (this.$origin.outerWidth() / 2) - (this.$modal.outerWidth() / 2)
          left = rect.left + midLeft;
        }
      
    }
    if (this.modalWithArrow) {
      this.posisionatedArrow(rect, top, left);
    }

    this.$modal.css({ 'left': left, 'top': top });
  }

  posisionatedArrow(rect, top, left) {

    const $arrow = this.$modal.find('.arrow');
    this.$modal.removeClass('arrow-left arrow-right arrow-top arrow-bottom');

    if (this.modalFloatingEdge === 'left' || this.modalFloatingEdge === 'right') {
      const arrowTop = rect.top - top;
      $arrow.css({ top: arrowTop });
      this.$modal.addClass('arrow-' + this.modalFloatingEdge);

    }else if (this.modalFloatingEdge === 'top' ) {
      const arrowLeft = rect.left - left + (this.$origin.outerWidth() / 2);
      $arrow.css({ left: arrowLeft });
      this.$modal.addClass('arrow-' + this.modalFloatingEdge);
    }
    else if(this.modalFloatingEdge === 'bottom'){
      const arrowLeft = rect.left - left + (this.$origin.outerWidth() / 2);
      $arrow.css({ left: arrowLeft });
      if(top < rect.top){
        this.$modal.addClass('arrow-' + 'top');
      }else{
        this.$modal.addClass('arrow-' + this.modalFloatingEdge);
      }
    }
    
  }

  showModal() {
    console.log(this.$modal);
    if (this.$modal && this.$modal.length > 0 && !this.$modal.hasClass('open')) {

      this.$origin.addClass('active');
      // Check if not exist Try
      if (!this.$modal || this.$modal.length === 0) {
        this.initModal();
      }
      // Posisionated
      this.posisionated();
      // Show
      this.$modal.fadeIn();
      // Add class
      this.$modal.addClass('open');
      // Emit
      this.show = true;
      this.modalOnShow.emit();
    }
  }
  hideModal() {
    if (this.$modal && this.$modal.length > 0 && this.$modal.hasClass('open') ) {
      // Remove class
      this.$origin.removeClass('active');
      this.$modal.removeClass('open');
      // Hide
      this.$modal.fadeOut();
      // Emit
      this.show = false;
      this.modalOnHide.emit();
    }
  }
  ngOnDestroy() {
    // Remove DOM element
    if (this.$modal && this.$modal.length > 0) {
      this.$modal.remove();
      this.$modal.off('click', '.modal-close');
      this.$modal.unbind('modal-close');
      this.$modal.unbind('modal-open');

      $('*').unbind('scroll.modal-floating', () => { })
    }
    if (this.$origin && this.$origin.length > 0) {

      // Origin
      this.$origin.off('click');
      this.$origin.unbind('modal-close');
      this.$origin.unbind('modal-open');
    }
  }

}

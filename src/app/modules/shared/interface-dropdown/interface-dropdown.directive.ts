import {
  Directive, HostListener, ElementRef,
  AfterViewInit, Output, EventEmitter, Input, OnDestroy
} from '@angular/core';
import { UtilService } from 'src/app/services/utils/util.service';
// import * as $ from '$';
// declare var $: any;

@Directive({
  selector: '[appInterfaceDropdown]'
})
export class InterfaceDropdownDirective implements AfterViewInit, OnDestroy {

  public dropdownEl: any;
  public dropdownInnerMaxHeight: any;

  @Input() public showOn = 'click';
  @Input() public edge = 'bottom';
  @Input() public center = false;
  @Input() public gutterMaxHeight = 0;
  @Input() public disabled = false;
  @Input() public dropdownTarget: string;
  @Output() dropdownOnHide = new EventEmitter();
  @Output() dropdownOnShow = new EventEmitter();

  constructor(
    public el: ElementRef
    ) {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.init();
    });
  }

  // Show Dropdown Fn
  showDropdown() {
    
    this.dropdownInnerMaxHeight = this.dropdownEl.find('.dropdown-max-height');
    const element = $(this.el.nativeElement);
    if (this.dropdownEl.length === 0) {
      this.init();
    }

    const rect = this.el.nativeElement.getBoundingClientRect();
    const elHeight = element.outerHeight();
    if (this.edge === 'bottom') {
      const maxHeight = window.innerHeight - rect.top - elHeight - this.gutterMaxHeight - 20;

      this.dropdownInnerMaxHeight.css('max-height', maxHeight + 'px');


    }
    if (this.edge === 'bottom' || this.edge === 'top') {
      if (this.center) {
        const widthHalf = this.dropdownEl.width() / 2;
        this.dropdownEl.css({ 'left': '50%', marginLeft: '-' + widthHalf + 'px' })
      } else {
        this.dropdownEl.attr('style', '');
      }
    }
    // dd Class Parent
    element.parent().addClass('active');
    // Show/Hide Class
    this.dropdownEl.addClass('show-dd').removeClass('hide-dd');
    // Show
    setTimeout(() => {
      // Body Class
      $('body').addClass('interface-dropdown-open');
      this.dropdownEl.stop(true, true).css('opacity', 0)
        .slideDown({
          queue: false,
          duration: 300,
          easing: 'easeOutCubic',
          complete: function () {

            $(this).css('height', '');
          }
        })
        .animate({ opacity: 1 }, { queue: false, duration: 300, easing: 'easeOutSine' });
      this.dropdownOnShow.emit();
    });
  }
  // Hide Dropdown
  hideDropdown() {
    const element = $(this.el.nativeElement);
    element.parent().removeClass('active');
    this.dropdownEl.addClass('hide-dd').removeClass('show-dd');
    this.dropdownEl.fadeOut();
    $('body').removeClass('interface-dropdown-open');

    this.dropdownOnHide.emit();

  }
  onCloseClick(event) {
    const target = $(event.target);
    if (!(target.hasClass('disabled-dropdown-toggle'))
      && target.closest('.disabled-dropdown-toggle').length === 0) {
      this.hideDropdown();
    }
  }
  // Init
  init() {
    this.dropdownEl = $(this.dropdownTarget);
    if (this.dropdownEl.length > 0) {
      this.dropdownInnerMaxHeight = this.dropdownEl.find('.dropdown-max-height');

      this.dropdownEl.on('click', 'a, .close-on-click', ($event) => {
        this.onCloseClick($event);
      });
    }

  }

  // Toggle Dropdown
  toggleClass() {
    if (!this.disabled) {
      if (this.dropdownEl.hasClass('show-dd')) {
        this.hideDropdown();
      } else {
        this.showDropdown();
      }
    }
  }



  onClickWindow(event): void {
    const target = $(event.target);
    if (this.dropdownEl && this.dropdownEl.length > 0) {

      if (this.dropdownEl.css('visibility') === 'visible' &&
        target.closest('.dropdown-menu').length === 0 &&
        !(target.closest('a')[0] === this.el.nativeElement)) {
        this.hideDropdown();
      }
    }
  }

  @HostListener('click', ['$event']) onClickTrigger(event) {
    this.toggleClass();
  }
  @HostListener('window:click', ['$event']) onWindowClick(event) {
    this.onClickWindow(event);
  }

  @HostListener('window:resize', ['$event']) onResize(event) {
    if (this.dropdownEl && this.dropdownEl.length > 0) {
      this.hideDropdown();
    }
  }
  ngOnDestroy() {

    if (this.dropdownEl && this.dropdownEl.length > 0) {
      this.dropdownEl.off('click', 'a, .close-on-click', () => { });
      this.dropdownOnHide.emit();
    }
  }
}

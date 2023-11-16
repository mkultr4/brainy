import {
  Directive,
  Input, Renderer2, ElementRef, ViewChild, AfterViewInit, Output, EventEmitter, OnDestroy, SimpleChanges
} from '@angular/core';
import { UtilService } from '../../../services/utils/util.service';

declare var $: any;

@Directive({
  selector: '[appDropdownWrapper]',
  providers: [UtilService]
})
export class DropdownWrapperDirective implements AfterViewInit, OnDestroy {
  public dropdown;
  public origin;

  private _dropdownTarget: string;

  @Input() gutter = 0;
  @Input() edge = 'left';
  @Input() alignment = 'center';
  @Input() hover = true;
  @Input() timeout = 0;
  @Input() gutterAlignment = 0;
  @Input() withArrow = true;

  @Input() set dropdownTarget(dropdownId: string) {
    this._dropdownTarget = dropdownId;
  }
  private _show = false;
  @Input() set show(show: boolean) {
    this._show = show;
    if (this._show) {
      this.placeDropdown();
    } else {
      this.hideDropdown();
    }
  }

  // Output
  @Output() dropdownOnShow = new EventEmitter();
  @Output() dropdownOnHide = new EventEmitter();


  constructor(private _renderer: Renderer2, private _elementRef: ElementRef,
    private _utilService: UtilService) {

  }
  ngAfterViewInit() {
    if (this._dropdownTarget) {

      this.dropdown = $(this._dropdownTarget);
      $('body').append(this.dropdown);
      this.initDropdown();
    }

  }
  placeDropdown() {
    let left = 0, top = 0;
    const rect = this.origin.get(0).getBoundingClientRect();
    const scrollParent = this._utilService.getScrollParent(this.origin.get(0), true);
    let scrollTop = 0;
    if (document.body === scrollParent) {
       scrollTop = $(window).scrollTop();
    } else {
       scrollTop = scrollParent.scrollTop;
    }

    console.log(scrollTop);
    top = rect.top + scrollTop;
    if (this.edge === 'left' || this.edge === 'right') {
      if (this.edge === 'left') {
        left = rect.left - (this.dropdown.outerWidth() + this.gutter);
      } else if (this.edge === 'right') {
        left = rect.left + (this.origin.outerWidth() + this.gutter);
      }
      if (this.alignment === 'center') {
        top = top - (this.dropdown.outerHeight() / 2) + this.gutterAlignment;
      }

      if ((top + this.dropdown.outerHeight()) > window.innerHeight) {
        const diff = (top + this.dropdown.outerHeight()) - window.innerHeight;
        top = top - diff - 5;
      }
      if (this.withArrow) {
        const arrow = this.dropdown.find('.arrow');
        const arrowTop = (rect.top - top) + arrow.height();
        arrow.css({ top: arrowTop });
      }
    }
    if (this.edge === 'bottom') {
      top = top + this.origin.height() + this.gutter;
      left = rect.left;
      if ((top + this.dropdown.outerHeight()) > window.innerHeight) {
        const diff = (top + this.dropdown.outerHeight()) - window.innerHeight;
        top = top - diff - 5;
      }
    }
    this.dropdown.css({ 'left': left, 'top': top });
    this.dropdown.addClass('open');
    this.origin.addClass('active');
    this.dropdown.show();
    this.dropdownOnShow.emit();
  }
  hideDropdown() {
    if (this.dropdown) {
      this.dropdown.hide();
      this.dropdown.removeClass('open');
      this.origin.removeClass('active');
      this.dropdownOnHide.emit();
    }
  }
  initDropdown() {
    this.origin = $(this._elementRef.nativeElement);

    // Hover
    if (this.hover) {
      this._show = false;
      let overDropdown = false;
      // Hover handler to show dropdown
      this.origin.on('mouseenter', (e) => { // Mouse over
        if (this._show === false) {
          this.placeDropdown();
          this._show = true;
        }
      });
      this.origin.on('mouseleave', (e) => {
        setTimeout(() => {
          // If hover on origin then to something other than dropdown content, then close
          const toEl = e.toElement || e.relatedTarget; // added browser compatibility for target element
          if (!$(toEl).closest('.dropdown').is(this.dropdown) && !overDropdown) {
            this.hideDropdown();
            this._show = false;
          }
        }, this.timeout);
      });
      this.dropdown.on('mouseenter', (e) => { // Mouse out
        overDropdown = true;

      });
      this.dropdown.on('mouseleave', (e) => { // Mouse out
        const toEl = e.toElement || e.relatedTarget;
        if (!$(toEl).closest('.dropdown-trigger').is(this.origin)) {
          this.hideDropdown();
          this._show = false;
          overDropdown = false;
        }
      });
    }

    this.dropdown.on('click', '.dropdown-close', () => {
      if (this.dropdown.hasClass('open')) {

        this.hideDropdown();
      }
    });
  }

  ngOnDestroy() {
    if (this.hover) {
      // Hover handler to show dropdown
      this.origin.off('mouseenter');
      this.origin.off('mouseleave');
      this.dropdown.off('mouseleave');
      if (this.dropdown.length > 0) {
        this.dropdown.remove();
      }
    }
    this.dropdown.off('click', '.profile-close');
  }

}

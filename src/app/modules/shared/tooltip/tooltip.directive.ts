import { Directive, AfterViewInit, Input, ElementRef, OnDestroy, HostListener } from '@angular/core';


@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements AfterViewInit, OnDestroy {

  $tooltipElement;

  @Input() tooltipMessage;
  @Input('edgeTooltip') edgeTooltip = 'top';
  @Input('alignamentTooltip') alignamentTooltip = 'center';
  @Input('extraClassTooltip') extraClassTooltip = '';
  @Input('gutterTooltip') gutterTooltip = 0;
  @Input('gutterAlignamentTooltip') gutterAlignamentTooltip = 0;

  constructor(private elementRef: ElementRef) {
  }

  ngAfterViewInit() {
    this.$tooltipElement = $('<div class="tooltip-brainy ' + this.extraClassTooltip + '"><span>' + this.tooltipMessage + '</span></div>');
    this.$tooltipElement.on('mouseleave', ($event) => {
      this.hideTooltip();
    });
    $('body').append(this.$tooltipElement);
  }

  posisionated() {
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const element = $(this.elementRef.nativeElement);

    const position = { top: 0, left: 0 };
    if (this.edgeTooltip === 'top') {
      position.top = element.offset().top - this.$tooltipElement.outerHeight() - this.gutterTooltip - 5;
      if (this.alignamentTooltip === 'left') {
        position.left = rect.left - this.$tooltipElement.outerWidth() + element.outerWidth() + this.gutterAlignamentTooltip;
      } else if (this.alignamentTooltip === 'right') {
        position.left = rect.left + this.gutterAlignamentTooltip;
      } else if (this.alignamentTooltip === 'center') {
        position.left = rect.left - this.$tooltipElement.outerWidth() / 2 + element.outerWidth() / 2;
      }
    } else if (this.edgeTooltip === 'left') {
      position.top = element.offset().top - this.$tooltipElement.outerHeight() / 2 + element.outerHeight() / 2;
      position.left = element.offset().left - (this.$tooltipElement.outerWidth()  + 5 ) - this.gutterTooltip;

    } else if (this.edgeTooltip === 'right') {
      position.top = element.offset().top - this.$tooltipElement.outerHeight() / 2 + element.outerHeight() / 2;
      position.left = element.offset().left + element.outerWidth() + 5 + this.gutterTooltip;

    } else if (this.edgeTooltip === 'bottom') {
      console.log(element.outerHeight());
      position.top = element.offset().top + element.outerHeight() + this.gutterTooltip + 5;
      if (this.alignamentTooltip === 'left') {
        position.left = rect.left - this.$tooltipElement.outerWidth() + element.outerWidth() + this.gutterAlignamentTooltip;
      } else if (this.alignamentTooltip === 'right') {
        position.left = rect.left + this.gutterAlignamentTooltip;
      } else if (this.alignamentTooltip === 'center') {
        position.left = rect.left - this.$tooltipElement.outerWidth() / 2 + element.outerWidth() / 2;
      }
    }

    this.$tooltipElement.css({ left: position.left, top: position.top });
  }
  showTooltip() {
    this.posisionated();
    this.$tooltipElement.addClass('show');
    this.$tooltipElement.show();
  }

  hideTooltip() {
    if (this.$tooltipElement.hasClass('show')) {
      this.$tooltipElement.removeClass('show');
      this.$tooltipElement.hide();
    }
  }
  @HostListener('mouseover', ['$event']) onMouseOver($event) {
    const element = $(this.elementRef.nativeElement);
    if (!element.hasClass('disabled') && !element.is(':disabled')) {
      this.showTooltip();
    }
  }
  @HostListener('mouseleave', ['$event']) onMouseOut($event) {
    const target = $($event.relatedTarget);
    if (target.closest('.tooltip-brainy').get(0) !== this.$tooltipElement.get(0)) {
      this.hideTooltip();
    }

  }

  ngOnDestroy() {
    if (this.$tooltipElement) {
      this.$tooltipElement.remove();
      this.$tooltipElement.off('mouseleave', () => { });
    }
  }
}

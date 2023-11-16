import { Directive, Input, HostListener, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appToggleClass]'
})
export class ToggleClassDirective {
  @Input() elementId: string;
  @Input() classToggle = 'active';
  @Input() parentActiveId: string;

  constructor(
    private elementRef: ElementRef,
    private _renderer2: Renderer2) {
  }

  @HostListener('click') toggleClassClick() {
    const element = document.getElementById(this.elementId);
    const parent = document.getElementById(this.parentActiveId);
    if (element) {
      const hasClass = element.classList.contains(this.classToggle);
      if (hasClass) {

        if (parent) {
          this._renderer2.removeClass(parent, 'active');
        }
        this._renderer2.removeClass(this.elementRef.nativeElement, 'active');
        this._renderer2.removeClass(element, this.classToggle);
      } else {
        if (parent) {
          this._renderer2.addClass(parent, 'active');
        }
        this._renderer2.addClass(this.elementRef.nativeElement, 'active');
        this._renderer2.addClass(element, this.classToggle);
      }
    }
  }

}

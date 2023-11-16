import { Directive, ElementRef, HostListener, AfterContentChecked } from '@angular/core';

@Directive({
    selector: '[appAutoGrow]'

})
export class ElasticDirective implements AfterContentChecked {

    @HostListener('input', ['$event.target'])
    onInput(textArea: HTMLTextAreaElement): void {
        this.adjust();
    }

    constructor(public element: ElementRef) {
    }

    ngAfterContentChecked(): void {
        this.adjust();
    }

    adjust(): void {
        const nativeElement = this.element.nativeElement;

        let heightOffset = 0;
        const style = window.getComputedStyle(nativeElement, null);
        if (style.boxSizing === 'content-box') {
            heightOffset = -(parseFloat(style.paddingTop) + parseFloat(style.paddingBottom));
        } else {
            heightOffset = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth);
        }


        // Fix when a textarea is not on document body and heightOffset is Not a Number
        if (isNaN(heightOffset)) {
            heightOffset = 0;
        }

        nativeElement.style.height = 'auto';
        nativeElement.style.height = nativeElement.scrollHeight + heightOffset + 'px';

    }
}

import { Directive, AfterViewInit, ElementRef } from '@angular/core';
declare var $: any;

@Directive({
  selector: '[appMagnificPopup]'
})
export class MagnificPopupDirective implements AfterViewInit {

  constructor(public elementRef: ElementRef) { }

  ngAfterViewInit() {
    $(this.elementRef.nativeElement).magnificPopup({
      type: 'image',
      image: {
        markup: `<div class="mfp-figure">
                  <a class="mfp-close">
                    Cerrar
                    <object type="image/svg+xml" data="assets/img/commons/ico_closed_zoom.svg" 
                      class="close-ico">
                    </object>
                  </a>
                  <div class="mfp-img"></div>
                  <div class="mfp-bottom-bar">
                    <div class="mfp-title"></div>
                    <div class="mfp-counter"></div>
                  </div>
                </div>`,
        cursor: 'mfp-zoom-out-cur',
        titleSrc: 'title',
        verticalFit: true, // Fits image in area vertically
        tError: '<a href="%url%">The image</a> could not be loaded.' // Error message
      },

      showCloseBtn: false,
      closeBtnInside: true,
      closeOnContentClick: true,
      mainClass: 'mfp-with-zoom', // class to remove default margin from left and right side
      cursor: 'mfp-zoom-out-cur',
      zoom: {
        enabled: true,
        duration: 300,
        easing: 'ease'
      }

    });
  }

}

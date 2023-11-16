import { Directive, AfterViewInit, OnDestroy, OnChanges, SimpleChanges, ElementRef, Input, EventEmitter, Output } from '@angular/core';
declare var $: any;


@Directive({
  selector: '[appResizable]'
})
export class ResizableDirective implements AfterViewInit, OnDestroy, OnChanges {
  public isCreated = false;
  @Input('resizableContainment') resizableContainment = 'parent';
  @Input('resizableContainmentScroll') resizableContainmentScroll = 'body';
  @Input('resizableEdges') resizableEdges = {
    left: '.r-left', right: '.r-right',
    bottom: '.r-bottom', top: '.r-top'
  };
  @Input('resizableMinWidth') resizableMinWidth = 10;
  @Input('resizableMaxWidth') resizableMaxWidth = null;
  @Input('resizableMinHeight') resizableMinHeight = 10;
  @Input('resizableMaxHeight') resizableMaxHeight = null;
  @Input('resizableEnabled') resizableEnabled = false;
  @Input('resizableAspectRatio') resizableAspectRatio: any = false;

  // Outpus
  @Output() resizeOnCreate = new EventEmitter();
  @Output() resizeOnStart = new EventEmitter();
  @Output() resizeOnResizing = new EventEmitter();
  @Output() resizeOnStop = new EventEmitter();


  constructor(private elementRef: ElementRef) { }
  ngOnChanges(changes: SimpleChanges) {

    if (changes.resizableEnabled && !changes.resizableEnabled.firstChange) {
      this.createResizable();
    }
  }
  ngAfterViewInit() {
    setTimeout(() => {
      if (this.resizableEnabled) {
        this.createResizable();
      } else {
        const interact = require('interactjs');
        interact(this.elementRef.nativeElement).unset();
      }

    });

  }
  createResizable() {
    const interact = require('interactjs');
    if (this.resizableEnabled) {
      const resizableOptions = {
        edges: this.resizableEdges,
        autoScroll: {
        //  container: $(this.elementRef.nativeElement).closest(this.resizableContainmentScroll).get(0),
          margin: 0,
          distance: 0,
          interval: 10
        },
        restrictEdges: {
          outer: this.resizableContainment,
          endOnly: false,
          
        },
        inertia: true,
        invert: 'reposition',
        onstart: (event) => {
          this.isCreated = true;
          this.resizeOnStart.emit({ event: event });
        },
        onmove: (ev) => {
          const event = <any>ev;
          const sizing = this.draw(event);
          this.resizeOnResizing.emit({ event: event, sizing: sizing });
        },
        onend: (ev) => {
          const event = <any>ev;
          this.resizeOnStop.emit(event);
        }

      };
      interact(this.elementRef.nativeElement).resizable(resizableOptions);
    } else {
      interact(this.elementRef.nativeElement).unset();
    }
  }
  private draw(event) {
    const target = event.target;
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.deltaRect.left,
      y = (parseFloat(target.getAttribute('data-y')) || 0) + event.deltaRect.top,
      w = event.rect.width,
      h = event.rect.height;
    if (w < 0) {
      x += w;
      w = Math.abs(w);

    }
    if (h < 0) {
      y += h;
      h = Math.abs(h);
    }

    target.style.left = x + 'px';
    target.style.top = y + 'px';
    target.style.width = Math.max(w, 10) + 'px';
    target.style.height = Math.max(h, 10) + 'px';

    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
    return { left: x, top: y, width: w, height: h };

  }
  ngOnDestroy() {
    const interact = require('interactjs');
    interact(this.elementRef.nativeElement).unset();
  }

}

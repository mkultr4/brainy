import { Directive, AfterViewInit, Input, OnDestroy, OnChanges, SimpleChanges, ElementRef, Output, EventEmitter } from '@angular/core';


declare var $: any;

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective implements AfterViewInit, OnDestroy, OnChanges {
  public isCreated = false;
  // Inputs
  @Input('draggableCursor') draggableCursor = 'move';
  @Input('draggableContainment') draggableContainment = 'parent';
  @Input('draggableContainmentScroll') draggableContainmentScroll = 'body';
  @Input('draggableEnabled') draggableEnabled = false;
  @Input('draggableHandle') draggableHandle = false;
  // Output
  @Output() draggableOnCreate = new EventEmitter();
  @Output() draggableOnStart = new EventEmitter();
  @Output() draggableOnDragging = new EventEmitter();
  @Output() draggableOnStop = new EventEmitter();



  constructor(private elementRef: ElementRef) { }


  ngOnChanges(changes: SimpleChanges) {

    if (changes.draggableEnabled && !changes.draggableEnabled.firstChange) {
      this.createDraggable();
    }
  }
  ngAfterViewInit() {
    this.createDraggable();
  }

  createDraggable() {
    const interact = require('interactjs');
    if (this.draggableEnabled) {
      const draggableOptions = {
        autoScroll: {
          // container: $(this.elementRef.nativeElement).closest(this.draggableContainmentScroll).get(0),
          margin: 20,
          distance: 20,
          interval: 10
        },
        inertia: true,
        restrict: {
          restriction: this.draggableContainment,
          endOnly: false,
          elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        onmove: (event) => {
          const target = event.target;
          // keep the dragged position in the data-x/data-y attributes
          const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
            y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

          // translate the element
          target.style.left = x + 'px';
          target.style.top = y + 'px';

          // update the posiion attributes
          target.setAttribute('data-x', x);
          target.setAttribute('data-y', y);

          this.draggableOnDragging.emit(event);
        },
        onend: (event) => {
          this.draggableOnStop.emit(event);
          //  console.log(event, 'end');
        }
      };
      interact(this.elementRef.nativeElement).draggable(draggableOptions);
    } else {
      interact(this.elementRef.nativeElement).unset();
    }
  }
  ngOnDestroy() {
    const interact = require('interactjs');
    interact(this.elementRef.nativeElement).unset();
  }
}

import { Directive, AfterViewInit, Input, Output, EventEmitter, ElementRef, HostListener, OnDestroy } from '@angular/core';
import * as uuid from 'uuid/v4';

@Directive({
  selector: '[appTableColumnResize]'
})
export class TableColumnResizeDirective implements AfterViewInit, OnDestroy {
  // Public vars
  public $table;
  public startX;
  public parent;
  public resizerHandle;
  public resizableId;
  public pressed = false;
  // Inputs
  @Input() resizerOverflow: number = 0;
  @Input() resizerFixHeight: number = 0;
  @Output('onTableResizeInit') onInit = new EventEmitter();
  @Output('onTableResizeStart') onStart = new EventEmitter();
  @Output('onTableResizing') onResizing = new EventEmitter();
  @Output('onTableResizeEnd') onEnd = new EventEmitter();
  // Contructor
  constructor(private elementRef: ElementRef) { }
  // After view init
  ngAfterViewInit() {
    setTimeout(() => {
      this.$table = $(this.elementRef.nativeElement);
      this.resizableId = uuid();
      if (this.$table.length > 0 && this.$table.is('table')) {
        this.startResizable();
      }
    });
  }
  //Start
  startResizable() {
    // Remove resize
    this.$table.find('th .resizer').remove();
    // Th el
    const thEl = this.$table.find('th:not(.not-resizable):not(:last-child)');
    // Columns
    const tableColumns = this.$table.find('th:not(.not-resizable)');
    // Append resize
    thEl.append('<div class="resizer"><span class="column-resize"></span></div>');
    // Start resize
    this.startResizer();
    // Start style
    tableColumns.each((th) => {
      var thEl = $(th);
      thEl.removeAttr('style');
    });
    // Init events
    this.initEvents();
    // Emit
    this.onInit.emit();
  }
  // Start resize
  startResizer() {
    this.$table.find('th .resizer').height(this.$table.height() - this.resizerOverflow + this.resizerFixHeight);
  }
  //Resize
  resize() {

  }
  //Init event
  initEvents() {
    this.$table.on('mouseenter.resizer', this.mouseEnterFn.bind(this));
    this.$table.on('mouseleave.resizer', this.mouseLeaveFn.bind(this));
    this.$table.on('mousedown.resizer', '.resizer', (evt) => {
      this.resizerHandle = $(evt.currentTarget);
      this.resizerHandle.addClass('active');
      $('body').addClass('table-resize');
      this.down(evt);
    })
  }
  //Destroy events
  destroyEvents() {
    if (this.$table && this.$table.length > 0) {
      this.$table.on('mouseenter.resizer', () => { });
      this.$table.on('mouseleave.resizer', () => { });
      this.$table.on('mousedown.resizer', '.resizer', () => { });

    }
  }
  //Mouse Enter
  mouseEnterFn() {

    this.$table.closest('th').addClass('resizer-hover');
  }
  //Mouse Leave
  mouseLeaveFn() {

    this.$table.closest('th').removeClass('resizer-hover');
  }
  //Mouse Down
  down(evt) {
    this.pressed = true;
    this.parent = $(evt.target).closest('th').get(0);
    this.onStart.emit();
  }
  //Mouse Up
  up(evt) {
    this.$table.removeClass('resizing');
    $('body').removeClass('table-resize');
    this.startX = undefined;
    if (this.resizerHandle.length > 0) {
      this.resizerHandle.removeClass('active');
    }
    this.onEnd.emit()
  }

  //Mouse Move
  move(evt) {
    this.onResizing.emit();
    this.$table.addClass('resizing');
    var oldWidth,
      adjustment,
      newWidth;
    // If we dont have a previous position on mousemove we use the current one
    // Should always be zero
    if (!this.startX) {
      this.startX = evt.clientX;
    }
    // Get the column width
    oldWidth = this.parent.offsetWidth;
    // console.log('oldWidth: ', oldWidth);

    // Get the difference between previous and current x position
    adjustment = this.startX - evt.clientX;
    // console.log('adjustment: ', adjustment);

    // Set the column with to the old width plus the adjustment
    newWidth = oldWidth - adjustment;
    // console.log('newWidth: ', newWidth);
    this.parent.style.width = newWidth + 'px';

    // Set the preivous x value for future reference
    this.startX = evt.clientX;


  }



  @HostListener('window:mouseup', ['$event']) onMouseUp(event) {
    if (this.pressed) {
      this.pressed = false;
      this.up(event)
    }

  }
  @HostListener('window:mousemove', ['$event']) onMouseMove(event) {
    if (this.pressed) {
      this.move(event);
    }
  }
  @HostListener('window:resize', ['$event']) onResize(event) {
    this.startResizable();
  }
  ngOnDestroy() {
    this.destroyEvents();
    $('body').removeClass('table-resize');
  }

}

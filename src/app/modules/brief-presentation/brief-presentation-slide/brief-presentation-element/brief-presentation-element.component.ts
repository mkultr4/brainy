import { Component, OnInit, Input, HostListener, EventEmitter, Output, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { BriefPresentationElement } from 'src/app/models/brief-presentation/brief-presentation-element';

@Component({
  selector: 'app-brief-presentation-element',
  templateUrl: './brief-presentation-element.component.html',
  styleUrls: ['./brief-presentation-element.component.scss']
})
export class BriefPresentationElementComponent implements OnInit, AfterContentInit {

  //Element focused
  public focused: boolean = false;
  //Element resizing
  public resizing: boolean = false;
  //Element dragging
  public dragging: boolean = false;
  //Element editing
  public editing: boolean = false;
  // Inputs
  @Input() element: BriefPresentationElement = new BriefPresentationElement();
  @Input() index: string;
  @Input() slideScale;
  // Outputs
  @Output() onDeleteElement = new EventEmitter();
  @Output() onFocusElement = new EventEmitter();
  @Output() onUpdateElement = new EventEmitter();
  // Constructor
  constructor(
  ) {

  }

  ngAfterContentInit() {

  }

  ngOnInit() {
  }
  //On resize start
  onResizeStart(resize) {
    setTimeout(() => {
      this.resizing = true;
    });
  }
  //On element resize
  onResizing(resize) {
    console.log('resize-stop', event);

  }
  //On element resize stop
  onResizeStop(event) {
    // target
    const target = event.currentTarget;
    this.element.width = target.clientWidth;
    this.element.height = target.clientHeight;
    this.element.top = target.offsetTop;
    this.element.left = target.offsetLeft;
    // Update element
    this.onUpdateElement.emit(this.element);
    setTimeout(() => {
      this.resizing = false;
    }, 300);

  }
  //On drag start
  onDragStart(drag) {
    setTimeout(() => {

      this.dragging = true;
    })
  }
  //On drag element
  onDragging(event) {

  }

  //on drag stop
  onDragStop(event) {
    // Target
    const target = event.currentTarget;
    this.element.top = target.offsetTop;
    this.element.left = target.offsetLeft;
    // Update element
    this.onUpdateElement.emit(this.element);
    setTimeout(() => {
      this.dragging = false;
    }, 300);


  }
  // Focus element
  @HostListener('click', ['$event']) onclick(event) {

    if (!this.focused) {
      this.focused = true;
      this.onFocusElement.emit(this.element);
      /*const targetEditable = $(event.target).closest('[contenteditable]');
      if (this.mainText && targetEditable.length === 0) {
        this.mainText.nativeElement.focus();
      }*/
    }

  }


  deleteElement() {
    console.log('deleteeeee');
    this.onDeleteElement.emit(this.element);
  }

}

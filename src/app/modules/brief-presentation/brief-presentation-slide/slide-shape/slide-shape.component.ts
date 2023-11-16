import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BriefPresentationElementComponent } from '../brief-presentation-element/brief-presentation-element.component';

@Component({
  selector: 'app-slide-shape',
  templateUrl: './slide-shape.component.html',
  styleUrls: ['./slide-shape.component.scss']
})
export class SlideShapeComponent
  extends BriefPresentationElementComponent
  implements OnInit {
  // View child
  @ViewChild('shape') shape: ElementRef;
  constructor() {
    super();
  }

  ngOnInit() {
  }

  onResizing(interactEvent) {
    super.onResizing(interactEvent);
    $(this.shape.nativeElement)
      .css({
        width: interactEvent.sizing.width,
        height: interactEvent.sizing.height
      })
  }
}

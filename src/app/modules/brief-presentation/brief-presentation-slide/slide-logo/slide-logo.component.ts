import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BriefPresentationElementComponent } from '../brief-presentation-element/brief-presentation-element.component';

@Component({
  selector: 'app-slide-logo',
  templateUrl: './slide-logo.component.html',
  styleUrls: ['./slide-logo.component.scss']
})
export class SlideLogoComponent
  extends BriefPresentationElementComponent
  implements OnInit {
  // View child
  @ViewChild('image') image: ElementRef;
  // Constructor
  constructor() {
    super();
  }
  // On resizing
  onResizing(interactEvent) {
    // console.log(interactEvent);
    super.onResizing(interactEvent);
    
    $(this.image.nativeElement)
      .css({
        width: interactEvent.sizing.width,
        height: interactEvent.sizing.height
      })
  }
  // Init
  ngOnInit() {
  }

}

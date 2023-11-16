import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { BriefPresentationElementComponent } from '../brief-presentation-element/brief-presentation-element.component';

@Component({
  selector: 'app-slide-text',
  templateUrl: './slide-text.component.html',
  styleUrls: ['./slide-text.component.scss']
})
export class SlideTextComponent
  extends BriefPresentationElementComponent
  implements OnInit {
  public editing = false;
  // View child
  @ViewChild('textElement') textElement: ElementRef;
  @ViewChild('mainText') mainText: ElementRef;
  constructor() {
    super();
  }

  ngOnInit() {
  }

}

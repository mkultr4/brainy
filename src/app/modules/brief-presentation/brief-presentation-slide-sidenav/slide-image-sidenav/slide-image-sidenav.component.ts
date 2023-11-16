import { Component, OnInit, Input } from '@angular/core';
import { BriefPresentationElement } from 'src/app/models/brief-presentation/brief-presentation-element';

@Component({
  selector: 'app-slide-image-sidenav',
  templateUrl: './slide-image-sidenav.component.html',
  styleUrls: ['./slide-image-sidenav.component.scss']
})
export class SlideImageSidenavComponent implements OnInit {
  // Input
  @Input() element: BriefPresentationElement;
  // Constructor
  constructor() { }

  ngOnInit() {
  }

}

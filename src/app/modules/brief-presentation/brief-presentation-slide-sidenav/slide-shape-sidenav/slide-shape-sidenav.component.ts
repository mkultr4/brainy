import { Component, OnInit, Input } from '@angular/core';
import { element } from '@angular/core/src/render3/instructions';
import { BriefPresentationElement } from 'src/app/models/brief-presentation/brief-presentation-element';

@Component({
  selector: 'app-slide-shape-sidenav',
  templateUrl: './slide-shape-sidenav.component.html',
  styleUrls: ['./slide-shape-sidenav.component.scss']
})
export class SlideShapeSidenavComponent implements OnInit {
  @Input() element: BriefPresentationElement;
  constructor() { }

  ngOnInit() {
  }

}

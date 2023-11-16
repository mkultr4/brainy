import { Component, OnInit, Input } from '@angular/core';
import { BriefPresentationElement } from 'src/app/models/brief-presentation/brief-presentation-element';

@Component({
  selector: 'app-slide-text-sidenav',
  templateUrl: './slide-text-sidenav.component.html',
  styleUrls: ['./slide-text-sidenav.component.scss']
})
export class SlideTextSidenavComponent implements OnInit {
  // Input
  @Input() element: BriefPresentationElement;
  // Constructor
  constructor() { }

  ngOnInit() {
  }

}

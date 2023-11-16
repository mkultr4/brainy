import { Component, OnInit, Input } from '@angular/core';
import { BriefPresentationElement } from 'src/app/models/brief-presentation/brief-presentation-element';

@Component({
  selector: 'app-slide-logo-sidenav',
  templateUrl: './slide-logo-sidenav.component.html',
  styleUrls: ['./slide-logo-sidenav.component.scss']
})
export class SlideLogoSidenavComponent implements OnInit {
  // Input
  @Input() element: BriefPresentationElement;
  // Constructor
  constructor() { }

  ngOnInit() {
  }

}

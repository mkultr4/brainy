import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: '[app-content-video]',
  templateUrl: './content-video.component.html',
  styleUrls: ['./content-video.component.scss']
})
export class ContentVideoComponent implements OnInit {
  // Input
  @Input() video;
  // contructor
  constructor() { }

  ngOnInit() {
  }

}

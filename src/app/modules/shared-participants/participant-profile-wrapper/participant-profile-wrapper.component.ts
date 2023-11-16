import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-participant-profile-wrapper',
  templateUrl: './participant-profile-wrapper.component.html',
  styleUrls: ['./participant-profile-wrapper.component.scss']
})
export class ParticipantProfileWrapperComponent implements OnInit {
  @Input() owner;
  @Input() enabledComments = true;
  @Input() profileClass = 'profile-image-medium-1 ';
  @Input() showStatus = true;
  @Input() dropdownWrapperEdge = 'left';
  
  constructor() { }

  ngOnInit() {
  }

}

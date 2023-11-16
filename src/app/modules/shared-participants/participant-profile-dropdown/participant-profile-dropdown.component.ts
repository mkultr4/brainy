import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-participant-profile-dropdown',
  templateUrl: './participant-profile-dropdown.component.html',
  styleUrls: ['./participant-profile-dropdown.component.scss']
})
export class ParticipantProfileDropdownComponent implements OnInit {

  @Input() owner;
  constructor() { }

  ngOnInit() {
  }

}

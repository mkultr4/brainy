import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-meeting-note-agreements',
  templateUrl: './meeting-note-agreements.component.html',
  styleUrls: ['./meeting-note-agreements.component.scss']
})
export class MeetingNoteAgreementsComponent implements OnInit {
  // Inputs
  @Input() topics;
  @Input() editable;
  
  
  constructor() { }

  ngOnInit() {
  }

}

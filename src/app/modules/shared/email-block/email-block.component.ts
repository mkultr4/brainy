import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-email-block,[app-email-block]',
  templateUrl: './email-block.component.html',
  styleUrls: ['./email-block.component.scss']
})
export class EmailBlockComponent implements OnInit {
  @Input() avatarClass = 'profile-image-medium-1';
  @Input() email = '';
  @Output() emailOnDelete = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  delete() {
    this.emailOnDelete.emit(this.email);
  }
}

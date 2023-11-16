import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MzDropdownComponent } from 'ngx-materialize';

@Component({
  selector: 'app-invitation-block-dropdown,[app-invitation-block-dropdown]',
  templateUrl: './invitation-block-dropdown.component.html',
  styleUrls: ['./invitation-block-dropdown.component.scss']
})
export class InvitationBlockDropdownComponent implements OnInit {
  @Input() dropdownId;
  @Input() btnId;
  @Input() constrainWidth = false;
  @Input() belowOrigin = false;
  @Input() gutter = 0;
  @Input() dropdownClass = 'dropdown-participants-block-permissions';
  @Input() container = 'body';
  @Input() align = 'left';
  @ViewChild('dropdown') dropdown: MzDropdownComponent;
  @Output() invitationOnSetPermission = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  setPermission($event, permission: string) {
    $event.preventDefault();
    $event.stopPropagation();
    this.dropdown.close();
    this.invitationOnSetPermission.emit(permission);
  }

}

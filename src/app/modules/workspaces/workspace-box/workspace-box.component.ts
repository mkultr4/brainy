import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { User } from '../../../models/users/user';


@Component({
  selector: 'app-workspace-box',
  templateUrl: './workspace-box.component.html',
  styleUrls: ['./workspace-box.component.scss']
})
export class WorkspaceBoxComponent implements OnInit {
   @Input() workspaceAccess: WorkspaceAccess;
   @Input() currentUser: User;
   // Outup
   @Output() onSelectWorkspaceAccess = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  /**
   * Select workspace access
   */
  selectWorkspaceAccess() {
    this.onSelectWorkspaceAccess.emit(this.workspaceAccess);
  }

}

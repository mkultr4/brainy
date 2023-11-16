import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../../models/users/user';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';

@Component({
  selector: 'app-header-default',
  templateUrl: './header-default.component.html',
  styleUrls: ['./header-default.component.scss']
})
export class HeaderDefaultComponent implements OnInit {
  // Public
  public isScrollDown = true;
  // Inputs
  @Input() breadcrumb = '';
  @Input() sectionActive = '';
  @Input() showWorkspaceAccess = false;
  @Input() currentUser: User;
  @Input() workspaceAccess: WorkspaceAccess;

  constructor() { }

  ngOnInit() {
  }

}

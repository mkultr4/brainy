import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { User } from '../../../models/users/user';
import { RolService } from '../../../services/roles/rol.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss']
})
export class DashboardHeaderComponent implements OnInit {
  // Publics
  public candAddProject = false;
  // Inputs
  @Input() currentUser: User;
  @Input() workspaceAccess: WorkspaceAccess;
  // Output
  @Output() headerOnNewProject = new EventEmitter();
  constructor() { }

  ngOnInit() {
    this.candAddProject = RolService.isAdminRol(this.workspaceAccess.rol.key) ||
      RolService.isManagerRol(this.workspaceAccess.rol.key);
  }

  newProject() {
    this.headerOnNewProject.emit();
  }
}

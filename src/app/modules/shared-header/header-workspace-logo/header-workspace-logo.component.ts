import { Component, OnInit, Input } from '@angular/core';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';
import { User } from '../../../models/users/user';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-header-workspace-logo',
  templateUrl: './header-workspace-logo.component.html',
  styleUrls: ['./header-workspace-logo.component.scss']
})
export class HeaderWorkspaceLogoComponent implements OnInit {
  // Inputs
  @Input() currentUser: User;
  @Input() workspaceAccess: WorkspaceAccess;
  @Input() showWorkspaceAccess = true;
  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }

  goTo() {
    if (environment.envName === 'design') {
      this._router.navigate(['/index']);
    } else {
      this._router.navigate(['/dashboard']);
    }
  }

}

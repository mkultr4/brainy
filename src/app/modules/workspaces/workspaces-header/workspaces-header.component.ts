import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services/auth/authentication.service';

@Component({
  selector: 'app-workspaces-header',
  templateUrl: './workspaces-header.component.html',
  styleUrls: ['./workspaces-header.component.scss']
})
export class WorkspacesHeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private _authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  logout() {
    this._authenticationService.logout();
    this.router.navigate(['/public/login']);
  }

}

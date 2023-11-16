import { Injectable } from '@angular/core';
import { User } from '../../models/users/user';
import { environment } from '../../../environments/environment';
import { WorkspaceAccess } from '../../models/workspace/workspace-access';
import { WorkspaceAccessStrategyService } from 'src/app/services/workspace/workspace-access-strategy.service';
import { UserStrategyService } from '../users/user-strategy.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private _workspaceAccessService;
  private _userService;

  constructor(
    private userStrategyService: UserStrategyService,
    private workspaceAccessStrategyService: WorkspaceAccessStrategyService) {
    this._workspaceAccessService = workspaceAccessStrategyService.getService();
    this._userService = userStrategyService.getService();
  }

  /**
   * Login user - Get the workspaces access
   * @param id
   */
  loginId(id) {
    const user = this._userService.getByIdMock(id);
    if (environment.envName === 'design') {
      user.status = 'online';
    }
    localStorage.setItem('currentUser', JSON.stringify(user));
  }


  /**
   * Set workspace access
   * @param id
   */
  setWorkspaceAccess(id, groupReference?: string) {
    const workspaceAccess = this._workspaceAccessService.getByIdMock(id);
    if (groupReference) {
      workspaceAccess.groupReference = groupReference;
    }else{
      workspaceAccess.groupReference = 'comment';
    }
    localStorage.setItem('workspaceAccess', JSON.stringify(workspaceAccess));
  }
  /**
   * Get auth user
   */
  getAuthUser(): User {
    if (environment.envName === 'design') {
      return <User>JSON.parse(localStorage.getItem('currentUser'));
    } else {
      return <User>JSON.parse(localStorage.getItem('currentUser'));
    }
  }
  /**
   * Get auth workspace access
   */
  getAuthWorkspaceAccess(): WorkspaceAccess {
     return <WorkspaceAccess>JSON.parse(localStorage.getItem('workspaceAccess'));
  }

  logout() {
    // remove user from local storage to log user out
    //localStorage.removeItem('currentUser');
    //localStorage.removeItem('workspaceAccess');
    let locale = localStorage.getItem('locale');

    this._userService.closeSession(localStorage.getItem('sessionID'));

    localStorage.clear();
    localStorage.setItem('locale', locale);
    //localStorage.removeItem('sessionID');

  }

  isAuthenticated() {
    return localStorage.getItem('currentUser') !== null && localStorage.getItem('currentUser') !== undefined;
  }

  removeToken() {
    localStorage.removeItem('currentUser');
  }
}

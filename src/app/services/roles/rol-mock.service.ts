import { Injectable } from '@angular/core';
import { RolService } from './rol.service';
import { Rol } from '../../models/workspace/rol';
import { of, Observable } from 'rxjs';
import { ROLES, ROLES_PERMISSIONS } from '../../data/mock-roles';
import { BaseService } from '../base.service';

@Injectable({
  providedIn: 'root'
})
export class RolMockService extends BaseService {
  public static adminRoles = ['super-admin', 'admin', 'co-admin'];
  public static managerRoles = ['manager'];
  public static teamRoles = ['team'].concat(RolService.adminRoles, RolService.managerRoles);
  public static guestRoles = ['guest'];
  public rolRepository: Array<Rol>;

  constructor() {
    super();
  }
  public static isAdminRol(rolKey: string): boolean {
    return RolService.adminRoles.indexOf(rolKey) >= 0;
  }
  public static isManagerRol(rolKey: string): boolean {
    return RolService.managerRoles.indexOf(rolKey) >= 0;
  }
  public static isTeamRol(rolKey: string): boolean {
    return RolService.teamRoles.indexOf(rolKey) >= 0;
  }
  public static isGuestRol(rolKey: string): boolean {
    return RolService.guestRoles.indexOf(rolKey) >= 0;
  }
  proccessRequest(event: string, data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }
  getAllRoles() {
    return of(Object.assign([], ROLES));
  }

  getRolesPermission() {
    return of(Object.assign([], ROLES_PERMISSIONS));
  }
}

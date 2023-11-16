import { Injectable } from '@angular/core';
import { WorkspaceAccess } from '../../models/workspace/workspace-access';
import { WORKSPACE_ACCESSES, ACCOUNT_STATUSES } from '../../data/mock-workspace-accesses';
import { BaseService } from '../base.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { ALL_TEAM } from '../../data/mock-team';
import { Project } from '../../models/projects/project';
import { CORES } from '../../data/mock-cores';
import { Brand } from '../../models/brands/brand';
import { Core } from '../../models/cores/core';
import { ROLES_PERMISSIONS, ROLES } from '../../data/mock-roles';
import { WORKSPACE_ACCESS_AUDITORY } from '../../data/mock-workspace-access-audit';
import { USERS } from 'src/app/data/mock-users';
import { RolPermission } from 'src/app/models/workspace/rol-permission';
import * as uuid from 'uuid/v4';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceAccessMockService extends BaseService {
  private _workspaceAccesses: BehaviorSubject<WorkspaceAccess[]>;
  public workspaceAccesses: Observable<WorkspaceAccess[]>;
  private dataStore = {
    workspaceAccesses: [] = []
  };
  constructor() {
    super();
    this._workspaceAccesses = new BehaviorSubject([]);
    this.workspaceAccesses = this._workspaceAccesses.asObservable();
  }

  proccessRequest(event: string, data: any): Observable<any> {
    return new Observable();
  }
  getByIdMock(id) {
    const workspaceAccess = ALL_TEAM.filter(w => w.id === id)[0];
    return workspaceAccess;
  }
  getById(id) {
    const workspaceAccess = ALL_TEAM.filter(w => w.id === id)[0];
    workspaceAccess.permissions = Object.assign([], ROLES_PERMISSIONS);
    // return workspaceAccess;
    return of(workspaceAccess);
  }
  // find my workspaceAccess
  findMyWorkspaceAccess(userId) {
    return of(WORKSPACE_ACCESSES.filter(w => !w.deleted));
  }
  // find
  findWorkspaceAccess(workspaceId: string, token: string) {

    // let query = new RegExp(token, 'ig');
    const query = new RegExp('^' + token, 'i');
    const mock = WORKSPACE_ACCESSES.filter((w: WorkspaceAccess) => {
      return query.test(w.user.name + ' ' + w.user.lastName)
        || query.test(w.user.name) || query.test(w.user.lastName) || query.test(w.user.email);
    });
    return of(mock);

  }
  loadWorkpaceAccess(workspaceId: string, categoryId?: string, current?: WorkspaceAccess, empty: boolean = false) {

    const observable = new Observable((observer) => {
      let allUsers = Object.assign([], ALL_TEAM);
      if (empty) {
        allUsers = Object.assign([], []);
      }
      // Put the current
      if (current) {
        current.brands = [];
        current.accountStatus.key = 'active';

        allUsers.forEach((w, index) => {
          if (w.id === current.id) {
            allUsers.splice(index, 1);
          }
        });
        allUsers.unshift(current);
      }

      this.dataStore.workspaceAccesses = allUsers;
      if (categoryId) {
        this.dataStore.workspaceAccesses = this.dataStore.workspaceAccesses
          .filter(w => w.rol.key === 'guest' && w.category && w.category.id === categoryId);

      }

      this._workspaceAccesses.next(Object.assign([], this.dataStore).workspaceAccesses);

      observer.next(this.dataStore.workspaceAccesses);
    });
    return observable;

  }

  loadWorkpaceAccessBrand(brandId: string, categoryId?: string, current?: WorkspaceAccess, empty: boolean = false) {

    const observable = new Observable((observer) => {
      let allUsers = Object.assign([],
        ALL_TEAM.filter(w => w.accountStatus.key === 'active'));
      if (empty) {
        allUsers = Object.assign([], []);
      }
      // Put the current
      if (current) {
        current.brands = [];
        current.accountStatus.key = 'active';

        allUsers.forEach((w, index) => {
          if (w.id === current.id) {
            allUsers.splice(index, 1);
          }
        });
        allUsers.unshift(current);
      }


      this.dataStore.workspaceAccesses = allUsers;
      if (categoryId) {
        this.dataStore.workspaceAccesses = this.dataStore.workspaceAccesses
          .filter(w => w.rol.key === 'guest' && w.category && w.category.id === categoryId);
      }
      this._workspaceAccesses.next(Object.assign([], this.dataStore).workspaceAccesses);

      observer.next(this.dataStore.workspaceAccesses);
    });
    return observable;
  }



  loadWorkpaceAccessProject(projectId: string, categoryId?: string, current?: WorkspaceAccess, empty: boolean = false) {

    const observable = new Observable((observer) => {
      let allUsers = Object.assign([],
        ALL_TEAM.filter(w => w.accountStatus.key === 'active'));
      if (empty) {
        allUsers = Object.assign([], []);
      }
      // Put the current
      if (current) {
        current.brands = [];
        current.accountStatus.key = 'active';
        allUsers.forEach((w, index) => {
          if (w.id === current.id) {
            allUsers.splice(index, 1);
          }
        });
        allUsers.unshift(current);
      }

      this.dataStore.workspaceAccesses = allUsers;
      if (categoryId) {
        this.dataStore.workspaceAccesses = this.dataStore.workspaceAccesses
          .filter(w => w.rol.key === 'guest' && w.category.id === categoryId);
      }
      this._workspaceAccesses.next(Object.assign([], this.dataStore).workspaceAccesses);

      observer.next(this.dataStore.workspaceAccesses);
    });
    return observable;

  }

  updateWorkspaceAccess(workspaceAccess: WorkspaceAccess) {
    const observable = new Observable((observer) => {
      let waUpdate;
      this.dataStore.workspaceAccesses.forEach((w, i) => {
        if (w.id === workspaceAccess.id) {
          this.dataStore.workspaceAccesses[i] = Object.assign({}, workspaceAccess);
          waUpdate = this.dataStore.workspaceAccesses[i];
        }
      });
      // If is in profile view not load data store
      if (!waUpdate) {
        waUpdate = workspaceAccess;
      }
      setTimeout(() => {
        this._workspaceAccesses.next(Object.assign([], this.dataStore).workspaceAccesses);
        observer.next(waUpdate);
      }, 1500);
    });
    return observable;
  }

  suspendWorkspaceAccess(workspaceAccess: WorkspaceAccess) {
    const observable = new Observable((observer) => {
      let waSuspended;
      this.dataStore.workspaceAccesses.forEach((w, i) => {
        if (w.id === workspaceAccess.id) {
          this.dataStore.workspaceAccesses[i].accountStatus = ACCOUNT_STATUSES.filter(s => s.key === 'suspended')[0];
          waSuspended = this.dataStore.workspaceAccesses[i];
        }
      });
      // If is in profile view not load data store
      if (!waSuspended) {
        workspaceAccess.accountStatus = ACCOUNT_STATUSES.filter(s => s.key === 'suspended')[0];
        waSuspended = workspaceAccess;
      }
      setTimeout(() => {
        this._workspaceAccesses.next(Object.assign([], this.dataStore).workspaceAccesses);
        observer.next(waSuspended);
      }, 1500);
    });
    return observable;
  }
  deleteWorkspaceAccess(workspaceAccess: WorkspaceAccess) {
    const observable = new Observable((observer) => {
      let waEliminate;
      this.dataStore.workspaceAccesses.forEach((w, i) => {
        if (w.id === workspaceAccess.id) {

          this.dataStore.workspaceAccesses[i].accountStatus = ACCOUNT_STATUSES.filter(s => s.key === 'eliminated')[0];
          waEliminate = this.dataStore.workspaceAccesses[i];
          this.dataStore.workspaceAccesses.splice(i, 1);
        }
      });
      // If is in profile view not load data store
      if (!waEliminate) {
        workspaceAccess.accountStatus = ACCOUNT_STATUSES.filter(s => s.key === 'eliminated')[0];
        waEliminate = workspaceAccess;
      }
      setTimeout(() => {
        this._workspaceAccesses.next(Object.assign([], this.dataStore).workspaceAccesses);
        observer.next(waEliminate);
      }, 1500);
    });
    return observable;
  }

  activateWorkspaceAccess(workspaceAccess: WorkspaceAccess) {
    const observable = new Observable((observer) => {
      let waActivate;
      this.dataStore.workspaceAccesses.forEach((w, i) => {
        if (w.id === workspaceAccess.id) {
          this.dataStore.workspaceAccesses[i].accountStatus = ACCOUNT_STATUSES.filter(s => s.key === 'active')[0];
          waActivate = this.dataStore.workspaceAccesses[i];
        }
      });
      // If is in profile view not load data store
      if (!waActivate) {
        workspaceAccess.accountStatus = ACCOUNT_STATUSES.filter(s => s.key === 'active')[0];
        waActivate = workspaceAccess;
      }
      setTimeout(() => {
        this._workspaceAccesses.next(Object.assign([], this.dataStore).workspaceAccesses);
        observer.next(waActivate);
      }, 1500);
    });
    return observable;
  }

  getAccountStatuses() {
    return of(Object.assign([], ACCOUNT_STATUSES));
  }

  /**
   * Get access levels
   * @param workspaceAccessId
   */
  getCoreAccess(workspaceAccessId: string) {

    const observable = new Observable((observer) => {
      observer.next(CORES.slice(0, 5));
    });

    return observable;

  }
  /**
   * Assign brand and project
   * @param brand
   * @param project
   */
  assignBrandAndProject(brand: Brand, project: Project): Observable<any> {

    return of({ brand: brand, project: project });

  }
  /**
   * Remove brand of workspace access
   * @param workspaceAccessId
   * @param brand
   */
  removeBrandOfWorkspaceAccess(workspaceAccessId: string, brand: Brand) {

    return of(brand);

  }
  /**
   * Remove project of workspace access
   * @param workspaceAccessId
   * @param project
   */
  removeProjectOfWorkspaceAccess(workspaceAccessId: string, project: Project) {
    return of(project);
  }
  /**
   * Remove core of workspace access
   * @param workspaceAccessId
   * @param core
   */
  removeCoreOfWorkspaceAccess(workspaceAccessId: string, core: Core) {
    return of(core);
  }

  getRolesPermissions(id: string) {

    const observable = Observable.create((observer) => {
      observer.next(ROLES_PERMISSIONS);
    });

    return observable;
  }


  getAudit(workspaceAccessId: string) {

    const observable = Observable.create((observer) => {
      const workspaceAccess = ALL_TEAM.filter(w => w.id === workspaceAccessId)[0];
      console.log(workspaceAccess);
      workspaceAccess.audits = WORKSPACE_ACCESS_AUDITORY;
      observer.next(workspaceAccess);
    });
    return observable;

  }

  unlinkCore(workspaceAccess: WorkspaceAccess, core: Core, unlinkCore, unlinkProject, unlinkBrand) {
    return of({ core: core, unlinkCore: unlinkCore, unlinkProject: unlinkProject, unlinkBrand: unlinkBrand });
  }

  changeWorkspace(userId, password) {
    const observable = Observable.create((observer) => {

      setTimeout(() => {
        observer.next(true);
      }, 2500)
    });
    return observable;
  }

  // Get workspace manager brief template
  findWorkspaceAccessManagerBriefTemplate() {
    const observable = Observable.create((observer) => {
      let workspaceAccesses = [];
      for (let i = 0; i < 9; i++) {
        const workspaceAccess = new WorkspaceAccess();
        workspaceAccess.id = uuid();
        workspaceAccess.user = USERS[i];
        workspaceAccess.rol = ROLES.filter(r => r.key === 'manager')[0];
        const permission = <RolPermission>{ key: 'access_template', text: 'Alta, bajas, modificación de proyectos', permitted: false };
        workspaceAccess.permissions = [];
        workspaceAccess.permissions.push(permission);
        workspaceAccesses.push(workspaceAccess);

      }
      observer.next(workspaceAccesses);

    });
    return observable;
  }

  // Update permission
  updatePermissionWorkspaceAccess(workspaceAccesses: WorkspaceAccess[]) {
    const observable = Observable.create((observer) => {
      setTimeout(() => {
        observer.next(workspaceAccesses);
      }, 1500);


    });
    return observable;
  }
}

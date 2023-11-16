import { Injectable } from '@angular/core';
import { WorkspaceAccess } from '../../models/workspace/workspace-access';
import { WORKSPACE_ACCESSES, ACCOUNT_STATUSES } from '../../data/mock-workspace-accesses';
import { SocketService } from '../socket.service';
import { environment } from '../../../environments/environment';
import * as io from 'socket.io-client';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { ALL_TEAM } from '../../data/mock-team';
import { PROJECTS } from '../../data/mock-projects';
import { Project } from '../../models/projects/project';
import { CORES } from '../../data/mock-cores';
import { BRANDS } from '../../data/mock-brands';
import { Brand } from '../../models/brands/brand';
import { Core } from '../../models/cores/core';
import { WORKSPACE_ACCESS_AUDITORY } from '../../data/mock-workspace-access-audit';
import { ROLES_PERMISSIONS, ROLES } from '../../data/mock-roles';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { Subscription } from 'rxjs/Subscription';
import { Workspace } from 'src/app/models/workspace/workspace';
import { User } from 'src/app/models/users/user';
import { Rol } from 'src/app/models/workspace/rol';
import { AccountStatus } from 'src/app/models/workspace/account-status';
import { RolPermission } from 'src/app/models/workspace/rol-permission';
import { ISubscription } from 'rxjs/Subscription';
import { USERS } from 'src/app/data/mock-users';
import * as uuid from 'uuid/v4';


@Injectable({
  providedIn: 'root'
})
export class WorkspaceAccessService extends SocketService {
  //Privates
  private type;
  private reference;
  private _workspaceAccesses: BehaviorSubject<WorkspaceAccess[]>;
  public workspaceAccesses: Observable<WorkspaceAccess[]>;
  private dataStore;
  public workspaceAccessSubscription: ISubscription;

  constructor() {
    super(environment.urlSocketFeedback);

    this._workspaceAccesses = new BehaviorSubject([]);
    this.workspaceAccesses = this._workspaceAccesses.asObservable();
    this.dataStore = {
      workspaceAccesses: [] = []
    };
  }
  getByIdMock(id, workspaceId) {
    const workspaceAccess = ALL_TEAM.filter(w => w.id === id)[0];
    return workspaceAccess;
  }

  getById(workspaceId) {
    console.log('WAID-*-*' + workspaceId);
    var wa: any;

    const params = {
      type: this.type,
      reference: this.reference
    };
    //AQUIMEQUEDE
    let json = btoa(JSON.stringify({
      workspaceId: workspaceId,
      params: params,
      //userId: this.dataStore.id,
      token: localStorage.getItem('sessionID')


    }));
    const observable = new Observable((observer) => {
      this.proccessRequest('getbyid', json).subscribe(
        result => {
          wa = new Array(result.length);
          let i = 0;

          console.log('RESULT' + JSON.stringify(result));



          for (let t of result) {

            wa[i] = new WorkspaceAccess();
            wa[i].workspace = new Workspace();
            wa[i].user = new User();
            wa[i].rol = new Rol();
            wa[i].brands[i] = new Brand();
            wa[i].accountStatus = new AccountStatus();
            wa[i].permissions = new Array<RolPermission>();

            wa[i].id = t.workspaceAccess.id;


            wa[i].workspace.id = t.workspaceAccess.workspace.id;
            wa[i].workspace.name = t.workspaceAccess.workspace.name;

            wa[i].user.id = t.workspaceAccess.user.id;
            wa[i].user.name = t.workspaceAccess.user.name;
            wa[i].user.lastName = t.workspaceAccess.user.lastName;
            wa[i].user.profilePicture = t.workspaceAccess.user.profilePicture;
            wa[i].user.status = t.workspaceAccess.user.status;

            wa[i].rol.id = t.workspaceAccess.role.id;
            wa[i].rol.key = t.workspaceAccess.role.key;
            wa[i].rol.name = t.workspaceAccess.role.name;

            wa[i].brands[i].name = t.workspaceAccess.brands.name;
            wa[i].brands[i].logo = t.workspaceAccess.brands.logo;

            wa[i].accountStatus.id = t.workspaceAccess.accountStatus[0].id;
            wa[i].accountStatus.key = t.workspaceAccess.accountStatus[0].status;
            for (let j of t.workspaceAccess.permissions) {
              wa[i].permissions.push(j);
            }
            i++;

          }


          if (!wa || wa == null) {
            console.log('Error, en el servidor de workspaceAccess' + ' ' + JSON.stringify(wa));
          }
          this.dataStore.workspaceAccess = Object.assign(new WorkspaceAccess(), wa[0]);

          this._workspaceAccesses.next(Object.assign([], this.dataStore).wa);
          observer.next(this.dataStore.workspaceAccess);
        },
        error => {
          var errorMessage = <any>error;
          console.log('Mensaje de Error: ' + ' ' + errorMessage);
        });
    });
    return observable;


  }


  // find
  findWorkspaceAccess(workspaceId: string, token: string) {

    // let query = new RegExp(token, 'ig');
    const query = new RegExp('^' + token, 'i');
    const mock = WORKSPACE_ACCESSES.filter((w: WorkspaceAccess) => {
      return query.test(w.user.name + ' ' + w.user.lastName) ||
        query.test(w.user.name) || query.test(w.user.lastName) || query.test(w.user.email);
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
          .filter(w => w.rol.key === 'guest' && w.category.id === categoryId);

      }

      this._workspaceAccesses.next(Object.assign([], this.dataStore).workspaceAccesses);

      observer.next(this.dataStore.workspaceAccesses);
    });
    return observable;

  }

  loadWorkpaceAccessBrand(brandId: string, categoryId?: string, current?: WorkspaceAccess, empty: boolean = false) {

    const observable = new Observable((observer) => {
      console.log(ALL_TEAM);
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
      this.dataStore.workspaceAccesses.forEach((w, i) => {

        if (w.id === workspaceAccess.id) {
          this.dataStore.workspaceAccesses[i] = workspaceAccess;
        }
      });

      this._workspaceAccesses.next(Object.assign([], this.dataStore).workspaceAccesses);
      observer.next(this.dataStore.workspaceAccesses);
    });
    return observable;
  }

  suspendWorkspaceAccess(workspaceAccess: WorkspaceAccess) {
    const observable = new Observable((observer) => {
      this.dataStore.workspaceAccesses.forEach((w, i) => {
        if (w.id === workspaceAccess.id) {
          this.dataStore.workspaceAccesses[i].accountStatus = ACCOUNT_STATUSES.filter(s => s.key === 'suspended')[0];
        }
      });
      setTimeout(() => {
        this._workspaceAccesses.next(Object.assign([], this.dataStore).workspaceAccesses);
        observer.next(this.dataStore.workspaceAccesses);
      }, 1500);
    });
    return observable;
  }
  deleteWorkspaceAccess(workspaceAccess: WorkspaceAccess) {
    const observable = new Observable((observer) => {
      this.dataStore.workspaceAccesses.forEach((w, i) => {
        if (w.id === workspaceAccess.id) {

          this.dataStore.workspaceAccesses[i].accountStatus = ACCOUNT_STATUSES.filter(s => s.key === 'eliminated')[0];
        }
      });
      setTimeout(() => {
        this._workspaceAccesses.next(Object.assign([], this.dataStore).workspaceAccesses);
        observer.next(this.dataStore.workspaceAccesses);
      }, 1500);
    });
    return observable;
  }

  activateWorkspaceAccess(workspaceAccess: WorkspaceAccess) {
    const observable = new Observable((observer) => {
      this.dataStore.workspaceAccesses.forEach((w, i) => {
        if (w.id === workspaceAccess.id) {
          this.dataStore.workspaceAccesses[i].accountStatus = ACCOUNT_STATUSES.filter(s => s.key === 'active')[0];
        }
      });
      setTimeout(() => {
        this._workspaceAccesses.next(Object.assign([], this.dataStore).workspaceAccesses);
        observer.next(this.dataStore.workspaceAccesses);
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

  getByUserId(userID: number) {
    const workspaceAccess = this.proccessRequest('findWorkspacesAccessByUser', userID);
    return workspaceAccess;
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
  /**
   * Get auditory
   */
  getAudit(workspaceAccessId: string) {

    const observable = Observable.create((observer) => {
      const workspaceAccess = ALL_TEAM.filter(w => w.id === workspaceAccessId)[0];
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
      }, 1500)
    });
    return observable;
  }
  getRolesPermissions(id: string) {

    const observable = Observable.create((observer) => {
      observer.next(ROLES_PERMISSIONS);
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

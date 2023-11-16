import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Core } from '../../models/cores/core';
import { CORES, CORE_TYPES, CORE_STATUSES } from '../../data/mock-cores';
import { CoreType } from '../../models/cores/core-type';
import { CoreStatus } from '../../models/cores/core-status';
import { Brief } from '../../models/brief/brief';
import { BriefTemplate } from '../../models/brief/brief-template';
import { WorkspaceAccess } from '../../models/workspace/workspace-access';
import { Invitation } from 'src/app/models/invitations/invitation';
import { WORKSPACE_ACCESSES } from 'src/app/data/mock-workspace-accesses';
import { BRANDS } from 'src/app/data/mock-brands';
import { INVITATIONS_EXAMPLE } from 'src/app/data/mock-invitations';
import * as _ from 'lodash';
@Injectable({
  providedIn: 'root'
})
export class CoreMockService extends BaseService {

  public cores: Observable<Array<Core>>;
  private _cores;

  private dataStore;

  private _core;
  public core: Observable<Core>;

  constructor() {
    super();
    this._cores = new BehaviorSubject<Array<Core>>(new Array<Core>());
    this.dataStore = {
      cores: [],
      core: new Core()
    };

    this.cores = this._cores.asObservable();

    this._core = new BehaviorSubject<Core>(new Core());
    this.core = this._core.asObservable();
  }

  proccessRequest(event: string, data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  /**
  * Load all workspace
  * @param workspaceId
  */
  loadByWorkscape(workspaceAccessId: string, empty?: boolean, allCoreApproved?: boolean) {
    const observable = new Observable(observer => {
      if (empty) {
        this.dataStore.cores = Object.assign([], []);
      } else {
        this.dataStore.cores = _.cloneDeep(CORES);
      }
      if (allCoreApproved) {
        this.dataStore.cores.forEach((c: Core) => {
          if (c.type.key !== 'brief-presentation') {
            c.status = CORE_STATUSES.filter(s => s.key === 'approved')[0];
          }
        });
      }
      setTimeout(() => {

        this._cores.next(Object.assign({}, this.dataStore).cores);
        observer.next(this.dataStore.cores);
      }, 1500);
    });
    return observable;
  }

  /**
   * Load by brand
   */
  loadByBrand(brandId: string, empty?: boolean) {
    const observable = new Observable(observer => {
      let cores = _.cloneDeep(CORES);
      cores = cores.splice(0, 5);

      const brand = BRANDS.filter(brand => brand.id === brandId)[0];

      cores.forEach(c => {
        const inv = _.cloneDeep(INVITATIONS_EXAMPLE);
        c.project.brand = brand;
        c.invitations = inv;
      });
      this.dataStore.cores = cores;


      setTimeout(() => {

        this._cores.next(Object.assign({}, this.dataStore).cores);
        observer.next(this.dataStore.cores);
      }, 1500);
    });
    return observable;
  }
  /**
   * Update title
   * @param coreId
   * @param title
   */
  updateTitle(coreId: string, title: string) {
    const observable = new Observable(observer => {
      observer.next(<Core>{ id: coreId, title: title });

    });
    return observable;
  }

  /**
   * Load core by id
   * @param id
   */
  loadById(id, coreTypeKey?, statusKey?) {
    const observable = new Observable(observer => {
      let core = CORES.filter(c => c.id === id)[0];
      // If coretypekey exist
      if (coreTypeKey) {
        core = CORES.filter(c => c.type.key === coreTypeKey)[0];
      }
      // If statusKey exist
      if (statusKey) {
        core.status = CORE_STATUSES.filter(s => s.key === statusKey)[0];
      }
      // If core is approved, necesary data!
      if (core.status.key === 'approved') {
        core.owner = WORKSPACE_ACCESSES[0].user;
        core.ownerRol = WORKSPACE_ACCESSES[0].rol;
        core.status = CORE_STATUSES.filter(s => s.key === 'approved')[0];
        core.approvedDate = new Date();
        core.approvedBy = <Invitation>{ workspaceAccess: WORKSPACE_ACCESSES[2] };
        core.approvedBy.groupReference = 'approver';
      }
      // Set data store
      this.dataStore.core = Object.assign(new Core(), core);
      setTimeout(() => {
        this._core.next(Object.assign({}, this.dataStore).core);
        observer.next(this.dataStore.core);
      });
    });
    return observable;
  }
  /**
   * Get by id
   * @param id
   */
  getById(id) {
    const observable = new Observable(observer => {
      setTimeout(() => {
        observer.next(Object.assign(new Core(), CORES.filter(c => c.id === id)[0]));
      });
    });
    return observable;
  }
  /**
   * Create a core
   * @param core
   */
  create(core: Core) {
    const observable = new Observable(observer => {
      observer.next(<Core>{ id: '1' });
    });
    return observable;
  }
  /**
   * Update status
   * @param coreId
   * @param title
   */
  updateStatus(coreId: string, status: CoreStatus) {
    const observable = new Observable(observer => {
      observer.next(<Core>{ id: coreId, status: status });
    });
    return observable;
  }

  /**
   * Update core
   * @param core
   */
  updateCore(core: Core) {

    this.dataStore.cores.forEach((c, i) => {
      if (core.id === c.id) {
        this.dataStore.cores[i] = core;
      }
    });
    const observable = new Observable(observer => {
      setTimeout(() => {
        this._cores.next(Object.assign({}, this.dataStore).cores);
        observer.next(core);
      }, 1500);

    });
    return observable;
  }
  /**
   * Cancel core
   * @param core
   */
  cancelCore(core: Core) {
    let cancelled: Core;
    const canceledStatus = CORE_STATUSES.filter(cs => cs.key === 'canceled')[0];
    this.dataStore.cores.forEach((c, i) => {
      if (core.id === c.id) {
        this.dataStore.cores[i].status = canceledStatus;
        cancelled = this.dataStore.cores[i];
      }
    });
    const observable = new Observable(observer => {
      setTimeout(() => {
        this._cores.next(Object.assign({}, this.dataStore).cores);
        observer.next(cancelled);
      }, 1500);

    });
    return observable;
  }
  /**
   * Archive core
   * @param core
   */
  archiveCore(core: Core) {
    let cancelled: Core;
    const archiveStatus = CORE_STATUSES.filter(cs => cs.key === 'archived')[0];
    this.dataStore.cores.forEach((c, i) => {
      if (core.id === c.id) {
        this.dataStore.cores[i].status = archiveStatus;
        cancelled = this.dataStore.cores[i];
      }
    });
    const observable = new Observable(observer => {
      setTimeout(() => {
        this._cores.next(Object.assign({}, this.dataStore).cores);
        observer.next(cancelled);
      }, 1500);

    });
    return observable;
  }
  /**
   * Delete core
   * @param core
   */
  deleteCore(core: Core) {
    this.dataStore.cores.forEach((c, i) => {
      if (core.id === c.id) {
        console.log(i);
        this.dataStore.cores.splice(i, 1);
      }
    });
    const observable = new Observable(observer => {
      setTimeout(() => {
        this._cores.next(Object.assign({}, this.dataStore).cores);
        observer.next(true);
      }, 1500);

    });
    return observable;
  }
  /**
   * Resume core
   * @param core
   */
  resumeCore(core: Core) {
    let resumeCore: Core;
    const processStatus = CORE_STATUSES.filter(cs => cs.key === 'process')[0];
    this.dataStore.cores.forEach((c, i) => {
      if (core.id === c.id) {
        this.dataStore.cores[i].status = processStatus;
        resumeCore = this.dataStore.cores[i];
      }
    });
    if (!resumeCore) {
      resumeCore = core;
      resumeCore.status = processStatus;
    }
    const observable = new Observable(observer => {
      setTimeout(() => {
        this._cores.next(Object.assign({}, this.dataStore).cores);
        observer.next(resumeCore);
      }, 1500);

    });
    return observable;
  }
  /**
   * Get all types
   */
  getAllTypes(): Observable<CoreType[]> {
    const observable: Observable<CoreType[]> = new Observable(observer => {
      observer.next(CORE_TYPES);
    });
    return observable;
  }
  /**
   * Get all status
   */
  getAllStatus(): Observable<CoreStatus[]> {
    const observable: Observable<CoreStatus[]> = new Observable(observer => {
      observer.next(CORE_STATUSES);
    });
    return observable;
  }
  /**
   * Find meeting note associated
   * @param core 
   */
  findMeetingNoteAssociated(core: Core) {
    const observable = new Observable(observer => {
      observer.next(CORES.filter(c => c.type.key === 'meeting-note'));
    });
    return observable;
  }
  /**
   * Find brief associated
   * @param core
   */
  findBriefAssociated(core: Core) {
    const observable = new Observable(observer => {
      observer.next(CORES.filter(c => c.type.key === 'brief').map(c => {
        const brief = <Brief>c;
        brief.template = <BriefTemplate>{ title: 'Brief estratégico de comunicación' }
        return brief;
      }));
    });
    return observable;
  }
  /**
   * Find feedback associated
   * @param core
   */
  findFeedbackAssociated(core: Core) {
    const observable = new Observable(observer => {
      console.log(CORES.filter(c => c.type.key === 'feedback'));
      observer.next(CORES.filter(c => c.type.key === 'feedback'));
    });
    return observable;
  }

  /**
 * Send a core by email
 * @param core
 */
  sendByEmail(core: Core, emails: Array<string>) {

    const observable = new Observable(observer => {
      setTimeout(() => {
        observer.next(core);
      }, 1500);

    });
    return observable;
  }

  /**
   * Approve core
   * @param core
   */
  approveCore(core: Core) {
    const approveStatus = CORE_STATUSES.filter(cs => cs.key === 'approved')[0];
    this.dataStore.core.status = approveStatus;
    const observable = new Observable(observer => {
      setTimeout(() => {
        this._core.next(Object.assign({}, this.dataStore).core);
        observer.next(this.dataStore.core);
      }, 1500);

    });
    return observable;
  }
  /**
 * Disapprove core
 * @param core
 */
  disapproveCore(core: Core) {
    const disapproveStatus = CORE_STATUSES.filter(cs => cs.key === 'disapproved')[0];
    this.dataStore.core.status = disapproveStatus;
    const observable = new Observable(observer => {
      setTimeout(() => {
        this._core.next(Object.assign({}, this.dataStore).core);
        observer.next(this.dataStore.core);
      }, 1500);

    });
    return observable;
  }

  /**
 *  Solicite modification
 * @param applicant
 * @param soliciteTo
 * @param core
 * @param notification
 */
  requestModification(applicant: WorkspaceAccess, soliciteTo: WorkspaceAccess, core: Core, notification: Notification) {
    const observable = new Observable(observer => {
      setTimeout(() => {
        observer.next(true);
      }, 1500);
    })
    return observable;
  }

  /**
 * Request permission
 * @param applicant
 * @param soliciteTo
 * @param core
 * @param notification
 */
  requestPermission(applicant: WorkspaceAccess, soliciteTo: WorkspaceAccess, core: Core, notification: Notification) {
    const observable = new Observable(observer => {
      setTimeout(() => {
        observer.next(true);
      }, 1500);
    })

    return observable;

  }

  /**
 * Accept permission
 * @param applicant
 * @param notification
 * @param core
 */
  acceptPermission(applicant: WorkspaceAccess, notification: Notification, core: Core) {
    const observable = new Observable(observer => {
      setTimeout(() => {
        observer.next(true);
      }, 1500);
    })

    return observable;
  }
  /**
   * Change cover image
   * @param file 
   */
  changeCoverImage(coreId: any, file: File) {
    const observable = new Observable(observer => {
      setTimeout(() => {
        const url = window.URL.createObjectURL(file);
        observer.next(url);
      });
    })

    return observable;

  }
}





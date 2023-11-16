import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Core } from '../../models/cores/core';
import { environment } from '../../../environments/environment';
import { CORE_STATUSES } from '../../data/mock-cores';
import { CoreType } from '../../models/cores/core-type';
import { CoreStatus } from '../../models/cores/core-status';
import { SocketService } from '../socket.service'

@Injectable()
export class CoreService extends SocketService {
  // Cores
  public cores: Observable<Array<Core>>;
  private _cores;

  // Core
  public core: Observable<Core>;
  private _core;

  private dataStore;

  constructor() {    
    super(environment.urlSocketFeedback);

    this._cores = new BehaviorSubject<Array<Core>>(new Array<Core>());
    this.dataStore = {
      cores: [],
      core: new Core()
    };
    this._core = new BehaviorSubject<Core>(new Core());

    this.cores = this._cores.asObservable();
    this.core = this._core.asObservable();

  }
  /**
   * Load all workspace
   * @param workspaceId
   */
  loadByWorkscape(workspaceId: string, empty?: boolean,allCoreApproved?:boolean) {
    const cores = this.proccessRequest('findCoresByWorkspace', workspaceId);
    this._cores = cores;
    return cores;
  }

  /**
   * Load core by id
   * @param id
   */
  loadById(id,coreTypeKey?,statusKey?) {
    const observable = new Observable(observer => {
      this.proccessRequest('getCore', id).subscribe((element) => {
        this.dataStore.core = Object.assign(new Core(), element);
        console.log(this.dataStore.core);
        this._core.next(Object.assign({}, this.dataStore).core);
        observer.next(this.dataStore.core);
      });
    });

    return observable;
  }

  /**
   * Create a core
   * @param core
   */
  create(core: Core) {
    const newCore = this.proccessRequest('createCore', core);
    return newCore;
  }
  /**
   * Update title
   * @param coreId
   * @param title
   */
  updateTitle(coreId: string, title: string) {
    console.log('update title');
    const newCore = this.proccessRequest('updateCore', { id: coreId, core: { title: title } });
    console.log(newCore);
    return newCore;
  }
  /**
   * Update status
   * @param coreId
   * @param title
   */
  updateStatus(coreId: string, status: CoreStatus) {
    const newCore = this.proccessRequest('updateCore', { id: coreId, core: { status: status } });
    return newCore;
  }
  /**
   * Cancel core
   * @param core
   */
  cancelCore(core: Core) {
    let cancelled: Core;
    const canceledStatus = CORE_STATUSES.filter(bs => bs.id === 'canceled')[0];
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
    const newCore = this.proccessRequest('archiveCore', core.id);
    return newCore;

  }
  /**
   * Delete core
   * @param core
   */
  deleteCore(core: Core) {
    const newCore = this.proccessRequest('deleteCore', core.id);
    return newCore;
  }
  /**
   * Disapprove core
   * @param core
   */
  disapproveCore(core: Core) {
    const disapprovedStatus = CORE_STATUSES.filter(bs => bs.id === 'disapproved')[0];
    const observable = new Observable(observer => {
      setTimeout(() => {
        this.dataStore.core.status = disapprovedStatus;
        this._core.next(Object.assign({}, this.dataStore).core);
        observer.next(this.dataStore.core);
      }, 1500);

    });
    return observable;
  }
  approveCore(core: Core) {
    const approvedStatus = CORE_STATUSES.filter(bs => bs.id === 'approved')[0];
    const observable = new Observable(observer => {
      setTimeout(() => {
        this.dataStore.core.status = approvedStatus;
        this._core.next(Object.assign({}, this.dataStore).core);
        observer.next(this.dataStore.core);
      }, 1500);

    });
    return observable;
  }
  /**
   * Get all types
   */
  getAllTypes(): Observable<CoreType[]> {
    const allTypes = this.proccessRequest('getAllTypes', {});
    return allTypes;
  }
  /**
   * Get all status
   */
  getAllStatus(): Observable<CoreStatus[]> {
    const allStatus = <Observable<CoreStatus[]>>this.proccessRequest('getAllStatus', {});
    return allStatus;
  }

  /**
   * Load by brand
   */
  loadByBrand(brandId: string, empty?: boolean) {
    const observable = new Observable(observer => {

      this.proccessRequest('getCoreByBrand', brandId).subscribe((cores) => {
        console.log(JSON.stringify(cores));
        this.dataStore.cores = Object.assign([], cores);
        this._cores.next(Object.assign([], this.dataStore).cores);     
        observer.next(this.dataStore.cores);
      });
      
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


}

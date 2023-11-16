import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Core } from '../../../models/cores/core';

@Injectable()
export class DashboardWorkflowService {
  private subjectCancel: Subject<Core> = new Subject<Core>();
  private subjectArchived: Subject<Core> = new Subject<Core>();
  private subjectDownload: Subject<Core> = new Subject<Core>();

  public obsCancel: Observable<Core>;
  public obsArchived: Observable<Core>;
  public obsDownload: Observable<Core>;

  constructor() {
    this.obsCancel = this.subjectCancel.asObservable();
    this.obsArchived = this.subjectArchived.asObservable();
    this.obsDownload = this.subjectDownload.asObservable();
  }

  cancelProject(core: Core) {
    this.subjectCancel.next(Object.assign(new Core(), core));
  }
  archiveProject(core: Core) {
    this.subjectArchived.next(Object.assign(new Core(), core));
  }
  downloadProject(core: Core) {
    this.subjectDownload.next(Object.assign(new Core(), core));
  }


}

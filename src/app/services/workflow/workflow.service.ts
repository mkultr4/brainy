import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class WorkflowService {

  // Comunication with point and popup
  private _sidenavRightCompressed: Subject<boolean>;
  public sidenavRightCompressed: Observable<boolean>;
  // Comunication with point and sidenav
  private _sidenavLeftCompressed: Subject<boolean>;
  public sidenavLeftCompressed: Observable<boolean>;
  // Comunication with sidebar
  constructor() {
    // Right
    this._sidenavRightCompressed = new Subject();
    this.sidenavRightCompressed = this._sidenavRightCompressed.asObservable();
    // Left
    this._sidenavLeftCompressed = new Subject();
    this.sidenavLeftCompressed = this._sidenavLeftCompressed.asObservable();
  }

  compressRightSidenav(compress: boolean) {
    this._sidenavRightCompressed.next(compress);
  }
  compressLeftSidenav(compress: boolean) {
    this._sidenavLeftCompressed.next(compress);
  }

}

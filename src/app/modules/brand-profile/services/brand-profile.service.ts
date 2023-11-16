import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Project } from '../../../models/projects/project';
import { Core } from '../../../models/cores/core';

@Injectable()
export class BrandProfileService {
  public _cores: Subject<Core[]> = new Subject();
  public cores: Observable<Core[]>;
  constructor() {
      this.cores = this._cores.asObservable();
  }

  updateCores(cores: Array<Core>) {
      this._cores.next(Object.assign([], cores));
  }

}

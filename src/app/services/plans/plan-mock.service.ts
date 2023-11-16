import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable, of } from 'rxjs';
import { PLANS } from '../../data/mock-plans';

@Injectable({
  providedIn: 'root'
})
export class PlanMockService extends BaseService {

  constructor() {
    super();
  }
  proccessRequest(event: string, data: any): Observable<any> {
    return new Observable();
  }

  getPlans() {
    return of(PLANS);
  }

}

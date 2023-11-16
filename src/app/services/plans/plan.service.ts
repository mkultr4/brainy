import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseService } from '../base.service';
import { PLANS } from '../../data/mock-plans';

@Injectable({
  providedIn: 'root'
})
export class PlanService extends BaseService {

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

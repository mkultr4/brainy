import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable, of } from 'rxjs';
import { LOCALITIES, CITIES, COUNTRIES } from '../../data/mock-location';

@Injectable({
  providedIn: 'root'
})
export class LocationService extends BaseService {

  constructor() {
    super();
  }
  proccessRequest(event: string, data: any): Observable<any> {
    return new Observable();
  }

  getCountries() {
    return of(COUNTRIES);
  }
  getCities() {
    return of(CITIES);
  }
  getLocalities() {
    return of(LOCALITIES);
  }
}

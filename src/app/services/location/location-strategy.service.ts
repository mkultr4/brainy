import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment';
import { LocationMockService } from './location-mock.service';
import { LocationService } from './location.service';

@Injectable({
  providedIn: 'root'
})
export class LocationStrategyService {

  locationService: BaseService;

  constructor(
  ) {
    if (environment.envName === 'design') {
      this.locationService = new LocationMockService();
    } else {
      this.locationService = new LocationService();
    }
  }

  getService() {
    return this.locationService;
  }


}

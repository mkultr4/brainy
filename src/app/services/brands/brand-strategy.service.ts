import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment';
import { BrandMockService } from './brand-mock.service';
import { BrandService } from './brand.service';

@Injectable({
  providedIn: 'root'
})
export class BrandStrategyService {

  brandServices: BaseService;

  constructor() {
    if (environment.envName === 'design') {
      this.brandServices = new BrandMockService();
    } else {
      this.brandServices = new BrandService();
    }
  }

  getService() {
    return this.brandServices;
  }
}

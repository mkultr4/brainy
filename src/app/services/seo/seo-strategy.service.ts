import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment';
import { SeoMockService } from './seo-mock.service';
import { SeoService } from './seo.service';
// Service to get pages information
@Injectable({
  providedIn: 'root'
})
export class SeoStrategyService {

  public seoService: BaseService;

  constructor() {
    if (environment.envName === 'design') {
      this.seoService = new SeoMockService();
    } else {
      this.seoService = new SeoService();
    }
  }

  getService() {
    return this.seoService;
  }

}

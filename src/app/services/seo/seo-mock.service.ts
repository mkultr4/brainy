import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable, of } from 'rxjs';
import { SITES } from '../../data/mock-seo';
import { Site } from '../../models/seo/site';

@Injectable({
  providedIn: 'root'
})
export class SeoMockService extends BaseService {

  constructor() {
    super();
  }
  proccessRequest(event: string, data: any): Observable<any> {
    throw new Error('Method not implemented.');
  }

  public findSite(token) {


    const query = new RegExp('^' + token, 'i');
    const mock = SITES.filter((site: Site) => {
      const urlWithoutW = site.url.replace('www.', '').trim();
      return query.test(site.url) || query.test(urlWithoutW);
    });
    return of(Object.assign([], mock));


  }
}

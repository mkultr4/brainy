import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class IframelyService extends BaseService {

  constructor(
    private http: HttpClient
  ) {
    super();
  }
  proccessRequest(event: string, data: any): Observable<any> {
    return new Observable();
  }
  /**
   * Get url inforamtion
   * reference https://iframely.com/docs/oembed-api
   * @param url
   */
  getUrlInformation(url: string) {
    console.log(this.http);
    return this.http.get(environment.iframely.urlOembed + '?' + 'url=' + url + '&api_key=' + environment.iframely.apiKey);
  }
}

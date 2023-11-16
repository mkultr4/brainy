import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment';
import { IframelyMockService } from './iframely-mock.service';
import { IframelyService } from './iframely.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class IframelyStrategyService {
  iframelyService: BaseService;

  constructor(
     http: HttpClient
  ) {
    if (environment.envName === 'design') {
      this.iframelyService = new IframelyMockService(http);
    } else {
      this.iframelyService = new IframelyService(http);
    }
  }

  getService() {
    return this.iframelyService;
  }

}

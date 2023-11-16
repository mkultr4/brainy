import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseService } from '../base.service';
import { HttpClient } from '@angular/common/http';
import { YoutubeMockService } from './youtube-mock.service';
import { YoutubeService } from './youtube.service';

@Injectable()
export class YoutubeStrategyService {

  youtubeService: BaseService;

  constructor(
    http: HttpClient
  ) {
    if (environment.envName === 'design') {
      this.youtubeService = new YoutubeMockService(http);
    } else {
      this.youtubeService = new YoutubeService(http);
    }
  }

  getService() {
    return this.youtubeService;
  }



}

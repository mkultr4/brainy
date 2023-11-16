import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class YoutubeMockService extends BaseService {

  constructor(
    private http: HttpClient
  ) { super(); }

  proccessRequest(event: string, data: any): Observable<any> {
    return new Observable();
  }
  /**
   * Get youtube video information
   * @param videoId 
   * @param parts
   */
  getYoutubeApiV3Information(videoId, parts) {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${environment.google.apiKey}&part=${parts}`;
    return this.http.get(url);
  }
 /**
   * Resolve video sizes with api response
   * @param item 
   */
  resolveVideoSizes(item) {
    let videoSizes = { width: 480, height: 270 };
    // First has snippet
    if (item.snippet) {
      if (item.snippet.thumbnails) {
        // Max res
        if (item.snippet.thumbnails.maxres) {
          videoSizes.width = item.snippet.thumbnails.maxres.width;
          videoSizes.height = item.snippet.thumbnails.maxres.height;
        } else if (item.snippet.thumbnails.high) {
          videoSizes.width = item.snippet.thumbnails.high.width;
          videoSizes.height = item.snippet.thumbnails.high.height;
        } else if (item.snippet.thumbnails.medium) {
          videoSizes.width = item.snippet.thumbnails.medium.width;
          videoSizes.height = item.snippet.thumbnails.medium.height;
        } else if (item.snippet.thumbnails.standard) {
          videoSizes.width = item.snippet.thumbnails.standard.width;
          videoSizes.height = item.snippet.thumbnails.standard.height;
        } else if (item.snippet.thumbnails.default) {
          videoSizes.width = item.snippet.thumbnails.default.width;
          videoSizes.height = item.snippet.thumbnails.default.height;
        }
      }
    }

    return videoSizes;
  }
}

import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment';
import { CommentThreadMockService } from './comment-thread-mock.service';
import { CommentThreadService } from './comment-thread.service';

@Injectable()
export class CommentThreadStrategyService {


  commentThreadService: BaseService;

  constructor() {
    if (environment.envName === 'design') {
      this.commentThreadService = new CommentThreadMockService();
    } else {
      this.commentThreadService = new CommentThreadService();
    }
  }

  getService() {
    return this.commentThreadService;
  }

}

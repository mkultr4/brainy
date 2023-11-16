import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { environment } from '../../../environments/environment';
import { TopicEditorMockService } from './topic-editor-mock.service';
import { TopicEditorService } from './topic-editor.service';

@Injectable()
export class TopicEditorStrategyService {


  topicEditorService: BaseService;

  constructor() {
    if (environment.envName === 'design') {
      this.topicEditorService = new TopicEditorMockService();
    } else {
      this.topicEditorService = new TopicEditorService();
    }
  }

  getService() {
    return this.topicEditorService;
  }

}

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TopicEditorStrategyService } from './topic-editor-strategy.service';

describe('Service: TopicEditorStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicEditorStrategyService]
    });
  });

  it('should ...', inject([TopicEditorStrategyService], (service: TopicEditorStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

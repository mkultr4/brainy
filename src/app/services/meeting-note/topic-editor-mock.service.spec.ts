/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TopicEditorMockService } from './topic-editor-mock.service';

describe('Service: TopicEditorMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicEditorMockService]
    });
  });

  it('should ...', inject([TopicEditorMockService], (service: TopicEditorMockService) => {
    expect(service).toBeTruthy();
  }));
});

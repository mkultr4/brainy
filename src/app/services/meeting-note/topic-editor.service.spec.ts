/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TopicEditorService } from './topic-editor.service';

describe('Service: TopicEditor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicEditorService]
    });
  });

  it('should ...', inject([TopicEditorService], (service: TopicEditorService) => {
    expect(service).toBeTruthy();
  }));
});

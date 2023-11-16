/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommentThreadService } from './comment-thread.service';

describe('Service: CommentThread', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentThreadService]
    });
  });

  it('should ...', inject([CommentThreadService], (service: CommentThreadService) => {
    expect(service).toBeTruthy();
  }));
});

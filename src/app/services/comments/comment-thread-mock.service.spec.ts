/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommentThreadMockService } from './comment-thread-mock.service';

describe('Service: CommentThreadMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentThreadMockService]
    });
  });

  it('should ...', inject([CommentThreadMockService], (service: CommentThreadMockService) => {
    expect(service).toBeTruthy();
  }));
});

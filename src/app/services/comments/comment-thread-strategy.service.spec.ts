/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CommentThreadStrategyService } from './comment-thread-strategy.service';

describe('Service: CommentThreadStrategyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentThreadStrategyService]
    });
  });

  it('should ...', inject([CommentThreadStrategyService], (service: CommentThreadStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

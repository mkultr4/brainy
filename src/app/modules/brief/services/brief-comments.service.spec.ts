/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BriefCommentsService } from './brief-comments.service';

describe('Service: BriefComments', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BriefCommentsService]
    });
  });

  it('should ...', inject([BriefCommentsService], (service: BriefCommentsService) => {
    expect(service).toBeTruthy();
  }));
});

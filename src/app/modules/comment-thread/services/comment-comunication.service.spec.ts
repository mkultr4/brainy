import { TestBed, inject } from '@angular/core/testing';

import { CommentComunicationService } from './comment-comunication.service';

describe('CommentComunicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommentComunicationService]
    });
  });

  it('should be created', inject([CommentComunicationService], (service: CommentComunicationService) => {
    expect(service).toBeTruthy();
  }));
});

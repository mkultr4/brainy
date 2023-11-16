/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FeedbackVersionComunicationService } from './feedback-version-comunication.service';

describe('Service: FeedbackVersionComunication', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedbackVersionComunicationService]
    });
  });

  it('should ...', inject([FeedbackVersionComunicationService], (service: FeedbackVersionComunicationService) => {
    expect(service).toBeTruthy();
  }));
});
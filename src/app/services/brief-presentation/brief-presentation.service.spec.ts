/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BriefPresentationService } from './brief-presentation.service';

describe('Service: BriefPresentation', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BriefPresentationService]
    });
  });

  it('should ...', inject([BriefPresentationService], (service: BriefPresentationService) => {
    expect(service).toBeTruthy();
  }));
});

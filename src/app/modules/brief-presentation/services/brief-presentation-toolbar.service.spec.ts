/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BriefPresentationToolbarService } from './brief-presentation-toolbar.service';

describe('Service: BriefPresentationToolbar', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BriefPresentationToolbarService]
    });
  });

  it('should ...', inject([BriefPresentationToolbarService], (service: BriefPresentationToolbarService) => {
    expect(service).toBeTruthy();
  }));
});

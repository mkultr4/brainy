/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BriefService } from './brief.service';

describe('Service: Brief', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BriefService]
    });
  });

  it('should ...', inject([BriefService], (service: BriefService) => {
    expect(service).toBeTruthy();
  }));
});

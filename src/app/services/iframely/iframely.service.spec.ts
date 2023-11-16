/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IframelyService } from './iframely.service';

describe('Service: Iframely', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IframelyService]
    });
  });

  it('should ...', inject([IframelyService], (service: IframelyService) => {
    expect(service).toBeTruthy();
  }));
});

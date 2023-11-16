/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IframelyMockService } from './iframely-mock.service';

describe('Service: IframelyMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IframelyMockService]
    });
  });

  it('should ...', inject([IframelyMockService], (service: IframelyMockService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DailyMessageMockService } from './daily-message-mock.service';

describe('Service: DailyMessageMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DailyMessageMockService]
    });
  });

  it('should ...', inject([DailyMessageMockService], (service: DailyMessageMockService) => {
    expect(service).toBeTruthy();
  }));
});

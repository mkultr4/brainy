/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DailyMessageService } from './daily-message.service';

describe('Service: DailyMessage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DailyMessageService]
    });
  });

  it('should ...', inject([DailyMessageService], (service: DailyMessageService) => {
    expect(service).toBeTruthy();
  }));
});

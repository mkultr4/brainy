/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotificationStrategyService } from './notification-strategy.service';

describe('Service: NotificationStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationStrategyService]
    });
  });

  it('should ...', inject([NotificationStrategyService], (service: NotificationStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

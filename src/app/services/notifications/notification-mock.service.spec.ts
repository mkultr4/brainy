/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NotificationMockService } from './notification-mock.service';

describe('Service: NotificationMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationMockService]
    });
  });

  it('should ...', inject([NotificationMockService], (service: NotificationMockService) => {
    expect(service).toBeTruthy();
  }));
});

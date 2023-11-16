/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MeetingNoteMockService } from './meeting-note-mock.service';

describe('Service: MeetingNoteMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MeetingNoteMockService]
    });
  });

  it('should ...', inject([MeetingNoteMockService], (service: MeetingNoteMockService) => {
    expect(service).toBeTruthy();
  }));
});

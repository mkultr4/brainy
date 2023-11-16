/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { YoutubeMockService } from './youtube-mock.service';

describe('Service: YoutubeMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YoutubeMockService]
    });
  });

  it('should ...', inject([YoutubeMockService], (service: YoutubeMockService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { YoutubeStrategyService } from './youtube-strategy.service';

describe('Service: YoutubeStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YoutubeStrategyService]
    });
  });

  it('should ...', inject([YoutubeStrategyService], (service: YoutubeStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RangyService } from './rangy.service';

describe('Service: Rangy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RangyService]
    });
  });

  it('should ...', inject([RangyService], (service: RangyService) => {
    expect(service).toBeTruthy();
  }));
});

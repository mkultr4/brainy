/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RoutingStateService } from './routing-state.service';

describe('Service: RoutingState', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RoutingStateService]
    });
  });

  it('should ...', inject([RoutingStateService], (service: RoutingStateService) => {
    expect(service).toBeTruthy();
  }));
});

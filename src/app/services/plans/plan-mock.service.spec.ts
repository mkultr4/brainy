/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlanMockService } from './plan-mock.service';

describe('Service: PlanMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanMockService]
    });
  });

  it('should ...', inject([PlanMockService], (service: PlanMockService) => {
    expect(service).toBeTruthy();
  }));
});

/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RolMockService } from './rol-mock.service';

describe('Service: RolMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RolMockService]
    });
  });

  it('should ...', inject([RolMockService], (service: RolMockService) => {
    expect(service).toBeTruthy();
  }));
});

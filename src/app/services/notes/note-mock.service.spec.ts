/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NoteMockService } from './note-mock.service';

describe('Service: NoteMock', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteMockService]
    });
  });

  it('should ...', inject([NoteMockService], (service: NoteMockService) => {
    expect(service).toBeTruthy();
  }));
});

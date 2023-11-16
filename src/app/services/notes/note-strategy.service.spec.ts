/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NoteStrategyService } from './note-strategy.service';

describe('Service: NoteStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NoteStrategyService]
    });
  });

  it('should ...', inject([NoteStrategyService], (service: NoteStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { ProjectStrategyService } from './project-strategy.service';

describe('ProjectStrategyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectStrategyService]
    });
  });

  it('should be created', inject([ProjectStrategyService], (service: ProjectStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

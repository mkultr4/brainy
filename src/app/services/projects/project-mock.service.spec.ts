import { TestBed, inject } from '@angular/core/testing';

import { ProjectMockService } from './project-mock.service';

describe('ProjectMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectMockService]
    });
  });

  it('should be created', inject([ProjectMockService], (service: ProjectMockService) => {
    expect(service).toBeTruthy();
  }));
});

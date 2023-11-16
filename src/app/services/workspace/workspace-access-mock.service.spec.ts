import { TestBed, inject } from '@angular/core/testing';

import { WorkspaceAccessMockService } from './workspace-access-mock.service';

describe('WorkspaceAccessMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkspaceAccessMockService]
    });
  });

  it('should be created', inject([WorkspaceAccessMockService], (service: WorkspaceAccessMockService) => {
    expect(service).toBeTruthy();
  }));
});

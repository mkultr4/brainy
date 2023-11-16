import { TestBed, inject } from '@angular/core/testing';

import { WorkspaceAccessStrategyService } from './workspace-access-strategy.service';

describe('WorkspaceAccessStrategyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkspaceAccessStrategyService]
    });
  });

  it('should be created', inject([WorkspaceAccessStrategyService], (service: WorkspaceAccessStrategyService) => {
    expect(service).toBeTruthy();
  }));
});

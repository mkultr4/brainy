/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WorkspaceAccessService } from './workspace-access.service';

describe('Service: WorkspaceAccess', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkspaceAccessService]
    });
  });

  it('should ...', inject([WorkspaceAccessService], (service: WorkspaceAccessService) => {
    expect(service).toBeTruthy();
  }));
});

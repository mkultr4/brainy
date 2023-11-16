/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ModalChangeWorkspaceService } from './modal-change-workspace.service';

describe('Service: ModalChangeWorkspace', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ModalChangeWorkspaceService]
    });
  });

  it('should ...', inject([ModalChangeWorkspaceService], (service: ModalChangeWorkspaceService) => {
    expect(service).toBeTruthy();
  }));
});

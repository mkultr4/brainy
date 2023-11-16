/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DownloadProjectService } from './download-project.service';

describe('Service: DownloadProject', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DownloadProjectService]
    });
  });

  it('should ...', inject([DownloadProjectService], (service: DownloadProjectService) => {
    expect(service).toBeTruthy();
  }));
});

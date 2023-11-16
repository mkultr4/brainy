/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FileUtilService } from './file-util.service';

describe('Service: FileUtil', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileUtilService]
    });
  });

  it('should ...', inject([FileUtilService], (service: FileUtilService) => {
    expect(service).toBeTruthy();
  }));
});

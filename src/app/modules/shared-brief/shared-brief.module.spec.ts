import { SharedBriefModule } from './shared-brief.module';

describe('SharedBriefModule', () => {
  let sharedBriefModule: SharedBriefModule;

  beforeEach(() => {
    sharedBriefModule = new SharedBriefModule();
  });

  it('should create an instance', () => {
    expect(sharedBriefModule).toBeTruthy();
  });
});

import { BriefModule } from './brief.module';

describe('BriefModule', () => {
  let briefModule: BriefModule;

  beforeEach(() => {
    briefModule = new BriefModule();
  });

  it('should create an instance', () => {
    expect(briefModule).toBeTruthy();
  });
});

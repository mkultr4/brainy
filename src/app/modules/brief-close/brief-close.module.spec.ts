import { BriefCloseModule } from './brief-close.module';

describe('BriefCloseModule', () => {
  let briefCloseModule: BriefCloseModule;

  beforeEach(() => {
    briefCloseModule = new BriefCloseModule();
  });

  it('should create an instance', () => {
    expect(briefCloseModule).toBeTruthy();
  });
});

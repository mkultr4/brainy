import { BriefPresentationModule } from './brief-presentation.module';

describe('BriefPresentationModule', () => {
  let briefPresentationModule: BriefPresentationModule;

  beforeEach(() => {
    briefPresentationModule = new BriefPresentationModule();
  });

  it('should create an instance', () => {
    expect(briefPresentationModule).toBeTruthy();
  });
});

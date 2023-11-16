import { BriefTemplateModule } from './brief-template.module';

describe('BriefTemplateModule', () => {
  let briefTemplateModule: BriefTemplateModule;

  beforeEach(() => {
    briefTemplateModule = new BriefTemplateModule();
  });

  it('should create an instance', () => {
    expect(briefTemplateModule).toBeTruthy();
  });
});

import { ProfileActivityModule } from './profile-activity.module';

describe('ProfileActivityModule', () => {
  let profileActivityModule: ProfileActivityModule;

  beforeEach(() => {
    profileActivityModule = new ProfileActivityModule();
  });

  it('should create an instance', () => {
    expect(profileActivityModule).toBeTruthy();
  });
});

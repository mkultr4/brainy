import { ProfileUserModule } from './profile-user.module';

describe('ProfileUserModule', () => {
  let profileUserModule: ProfileUserModule;

  beforeEach(() => {
    profileUserModule = new ProfileUserModule();
  });

  it('should create an instance', () => {
    expect(profileUserModule).toBeTruthy();
  });
});

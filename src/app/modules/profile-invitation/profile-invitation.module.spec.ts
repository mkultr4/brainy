import { ProfileInvitationModule } from './profile-invitation.module';

describe('ProfileInvitationModule', () => {
  let profileInvitationModule: ProfileInvitationModule;

  beforeEach(() => {
    profileInvitationModule = new ProfileInvitationModule();
  });

  it('should create an instance', () => {
    expect(profileInvitationModule).toBeTruthy();
  });
});

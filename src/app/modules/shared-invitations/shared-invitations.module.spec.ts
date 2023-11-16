import { SharedInvitationsModule } from './shared-invitations.module';

describe('SharedInvitationsModule', () => {
  let sharedInvitationsModule: SharedInvitationsModule;

  beforeEach(() => {
    sharedInvitationsModule = new SharedInvitationsModule();
  });

  it('should create an instance', () => {
    expect(sharedInvitationsModule).toBeTruthy();
  });
});

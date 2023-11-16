import { SharedTeamModule } from './shared-team.module';

describe('SharedTeamModule', () => {
  let sharedTeamModule: SharedTeamModule;

  beforeEach(() => {
    sharedTeamModule = new SharedTeamModule();
  });

  it('should create an instance', () => {
    expect(sharedTeamModule).toBeTruthy();
  });
});

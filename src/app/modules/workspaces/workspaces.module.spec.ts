import { WorkspacesModule } from './workspaces.module';

describe('WorkspacesModule', () => {
  let workspacesModule: WorkspacesModule;

  beforeEach(() => {
    workspacesModule = new WorkspacesModule();
  });

  it('should create an instance', () => {
    expect(workspacesModule).toBeTruthy();
  });
});

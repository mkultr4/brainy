import { Project } from '../projects/project';
import { Core } from '../cores/core';
import { WorkspaceAccess } from '../workspace/workspace-access';

export class Brand {
    public id: any;
    public name: string;
    public logo: string;
    // Status (suspended,active,eliminated)
    public status = 'suspended';
    public created: Date;
    public modified: Date;
    // Projects
    public projects: Project[] = [];
    public projectsCount = 0;
    // Cores
    public cores: Core[] = [];
    public coresCount = 0;
    // Access
    public workspaceAccesses: WorkspaceAccess[] = [];

}

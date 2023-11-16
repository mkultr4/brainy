import { Core } from '../cores/core';
import { WorkspaceAccess } from './workspace-access';

export class WorkspaceAccessAudit {
    public id: string;
    public core: Core;
    // public workspaceAccess: WorkspaceAccess;
    public type: string;
    public activity: string;
    public timestamp: Date;
}

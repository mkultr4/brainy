import * as uuid from 'uuid/v4';
import { WorkspaceAccessAudit } from '../models/workspace/workspace-access-audit';
import { CORES } from './mock-cores';




const userActivityTimestamp = new Date(new Date().setHours(10, 45, 0, 0));
const userActivityTimestamp1 = new Date(new Date().setHours(12, 45, 0, 0));
// User activity
export const WORKSPACE_ACCESS_AUDITORY: WorkspaceAccessAudit[] = [
    <WorkspaceAccessAudit>{
        id: uuid(),
        activity: 'Realizaste un comentario',
        timestamp: userActivityTimestamp,
        core: CORES[0]
    },
    <WorkspaceAccessAudit>{
        id: uuid(),
        activity: 'Te invitaron a una reunión',
        timestamp: userActivityTimestamp1,
         core: CORES[1]
    },
    <WorkspaceAccessAudit>{
        id: uuid(), activity: 'Realizaste un comentario',
        timestamp: userActivityTimestamp, core: CORES[0]
    },
    <WorkspaceAccessAudit>{
        id: uuid(), activity: 'Te invitaron a una reunión',
        timestamp: userActivityTimestamp1, core: CORES[1]
    },
    <WorkspaceAccessAudit>{
        id: uuid(), activity: 'Realizaste un comentario',
        timestamp: userActivityTimestamp, core: CORES[0]
    },
    <WorkspaceAccessAudit>{
        id: uuid(), activity: 'Te invitaron a una reunión',
        timestamp: userActivityTimestamp1, core: CORES[1]
    },
    <WorkspaceAccessAudit>{
        id: uuid(), activity: 'Realizaste un comentario',
        timestamp: userActivityTimestamp, core: CORES[0]
    },
    <WorkspaceAccessAudit>{
        id: uuid(), activity: 'Te invitaron a una reunión',
        timestamp: userActivityTimestamp1, core: CORES[1]
    },
    <WorkspaceAccessAudit>{
        id: uuid(), activity: 'Realizaste un comentario',
        timestamp: userActivityTimestamp, core: CORES[8]
    },
    <WorkspaceAccessAudit>{
        id: uuid(), activity: 'Te invitaron a una reunión',
        timestamp: userActivityTimestamp1, core: CORES[1]
    },
    <WorkspaceAccessAudit>{
        id: uuid(), activity: 'Realizaste un comentario',
        timestamp: userActivityTimestamp, core: CORES[6]
    },
    <WorkspaceAccessAudit>{
        id: uuid(), activity: 'Te invitaron a una reunión',
        timestamp: userActivityTimestamp1, core: CORES[1]
    },
    <WorkspaceAccessAudit>{
        id: uuid(), activity: 'Realizaste un comentario',
        timestamp: userActivityTimestamp, core: CORES[5]
    },
    <WorkspaceAccessAudit>{
        id: uuid(), activity: 'Te invitaron a una reunión',
        timestamp: userActivityTimestamp1, core: CORES[1]
    },
    <WorkspaceAccessAudit>{
        id: uuid(), activity: 'Realizaste un comentario',
        timestamp: userActivityTimestamp, core: CORES[2]
    },
    <WorkspaceAccessAudit>{
        id: uuid(), activity: 'Te invitaron a una reunión',
        timestamp: userActivityTimestamp1, core: CORES[1]
    },
    <WorkspaceAccessAudit>{
        id: uuid(), activity: 'Realizaste un comentario',
        timestamp: userActivityTimestamp, core: CORES[2]
    },
    <WorkspaceAccessAudit>{
        id: uuid(), activity: 'Te invitaron a una reunión',
        timestamp: userActivityTimestamp1, core: CORES[1]
    },

];

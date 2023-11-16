import { WorkspaceAccess } from '../models/workspace/workspace-access';
import { WORKSPACES } from './mock-workspace';
import { USERS } from './mock-users';
import * as moment from 'moment';
import { ROLES } from './mock-roles';
import { AccountStatus } from '../models/workspace/account-status';
const $today = moment().subtract(1, 'hour').toDate();
const $created = moment().subtract(30, 'days').toDate();
const $lastSession = moment().subtract(5, 'days').toDate();
export const ACCOUNT_STATUSES: AccountStatus[] = [
    <AccountStatus>{ key: 'active', text: 'Activos' },
    <AccountStatus>{ key: 'suspended', text: 'Suspendidos' },
    <AccountStatus>{ key: 'eliminated', text: 'Eliminados' },
  ];
// Workspaces access
export const WORKSPACE_ACCESSES: Array<WorkspaceAccess> = [
    Object.assign(new WorkspaceAccess(), <WorkspaceAccess>{
        id: '1',
        accountStatus: ACCOUNT_STATUSES[0],
        workspace: WORKSPACES[0],
        rol: ROLES[0],
        user: USERS[0],
        created: $created,
        modified: $today,
        lastSession: $lastSession
    }),
    Object.assign(new WorkspaceAccess(), <WorkspaceAccess>{
        id: '2',
        workspace: WORKSPACES[0],
        accountStatus: ACCOUNT_STATUSES[0],
        rol: ROLES[1],
        user: USERS[1],
        created: $created,
        modified: $today,
        lastSession: $lastSession
    }),
    Object.assign(new WorkspaceAccess(), <WorkspaceAccess>{
        id: '3',
        workspace: WORKSPACES[0],
        accountStatus: ACCOUNT_STATUSES[0],
        rol: ROLES[2],
        user: USERS[2],
        created: $created,
        modified: $today,
        lastSession: $lastSession
    }),
    Object.assign(new WorkspaceAccess(), <WorkspaceAccess>{
        id: '4',
        workspace: WORKSPACES[0],
        accountStatus: ACCOUNT_STATUSES[0],
        rol: ROLES[3],
        user: USERS[3],
        created: $created,
        modified: $today,
        lastSession: $lastSession
    }),
    Object.assign(new WorkspaceAccess(), <WorkspaceAccess>{
        id: '5',
        workspace: WORKSPACES[0],
        accountStatus: ACCOUNT_STATUSES[0],
        rol: ROLES[4],
        user: USERS[4],
        created: $created,
        modified: $today,
        lastSession: $lastSession
    }),
    Object.assign(new WorkspaceAccess(), <WorkspaceAccess>{
        id: '6',
        workspace: WORKSPACES[0],
        accountStatus: ACCOUNT_STATUSES[0],
        rol: ROLES[5],
        user: USERS[5],
        created: $created,
        modified: $today,
        lastSession: $lastSession
    }),
    Object.assign(new WorkspaceAccess(), <WorkspaceAccess>{
        id: '7',
        workspace: WORKSPACES[0],
        accountStatus: ACCOUNT_STATUSES[0],
        rol: ROLES[5],
        deleted: true,
        user: USERS[6],
        created: $created,
        modified: $today,
        lastSession: $lastSession

    })
];


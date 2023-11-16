import * as uuid from 'uuid/v4';
import { Invitation } from '../models/invitations/invitation';
import { ROLES } from './mock-roles';
import { GUESTS, TEAM } from './mock-team';
import { InvitationLevel } from '../models/invitations/invitation-level';
import { WORKSPACE_ACCESSES } from './mock-workspace-accesses';



export const NEW_INVITATION: Invitation =
    Object.assign(new Invitation(), <Invitation>{
        id: uuid(),
        levelId: InvitationLevel.WORKSPACE,
        referenceDescription: 'BBDO',
        email: 'ariel@prueba.com',
        rol: ROLES[4],
        from: WORKSPACE_ACCESSES[2]
    });
export const INVITATIONS_CORE: Array<Invitation> = [
    Object.assign(new Invitation(), <Invitation>{
        id: uuid(),
        email: 'ariel@prueba.com',
        rol: ROLES[4]
    })
];

export const INVITATIONS_EXAMPLE: Array<Invitation> = [

    Object.assign(new Invitation(), <Invitation>{
        id: uuid(),
        active: true,
        workspaceAccess: TEAM[0],
    }),
    Object.assign(new Invitation(), <Invitation>{
        id: uuid(),
        active: true,
        workspaceAccess: TEAM[1],
    }),
    Object.assign(new Invitation(), <Invitation>{
        id: uuid(),
        active: true,
        workspaceAccess: TEAM[2],
        groupReference: 'editor'
    }),
    Object.assign(new Invitation(), <Invitation>{
        id: uuid(),
        active: false,
        email: 'ariel@prueba.com',
        rol: ROLES[4]
    }),
    Object.assign(new Invitation(), <Invitation>{
        id: uuid(),
        active: true,
        workspaceAccess: TEAM[3],
    }),
    // Guests
    Object.assign(new Invitation(), <Invitation>{
        id: uuid(),
        workspaceAccess: GUESTS[5],
        active: true,
        groupReference: 'approver'
    }),
    Object.assign(new Invitation(), <Invitation>{
        id: uuid(),
        active: true,
        workspaceAccess: GUESTS[0]
    }),
    Object.assign(new Invitation(), <Invitation>{
        id: uuid(),
        active: true,
        workspaceAccess: GUESTS[1],
    }),
    Object.assign(new Invitation(), <Invitation>{
        id: uuid(),
        active: true,
        workspaceAccess: GUESTS[2],
    }),
    Object.assign(new Invitation(), <Invitation>{
        id: uuid(),
        active: true,
        workspaceAccess: GUESTS[3],
    }),


];

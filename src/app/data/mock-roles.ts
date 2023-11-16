import * as uuid from 'uuid/v4';
import { Rol } from '../models/workspace/rol';
import { RolPermission } from '../models/workspace/rol-permission';

// Roles
export const ROLES: Rol[] = [
    <Rol>{
        id: 1,
        key: 'super-admin',
        name: 'Super admin',

    },
    <Rol>{
        id: 2,
        key: 'admin',
        name: 'Administrador',

    },
    <Rol>{
        id: 3,
        key: 'co-admin',
        name: 'Co-administrador',

    },
    <Rol>{
        id: 4,
        key: 'manager',
        name: 'Manager',

    },
    <Rol>{
        id: 5,
        key: 'team',
        name: 'Team',

    },

    <Rol>{
        id: 6,
        key: 'guest',
        name: 'Invitado',

    }
];


export const ROLES_PERMISSIONS: Array<RolPermission> = [
    <RolPermission>{ id: uuid(), key: 'comment', text: 'Comentarios privados, públicos y en equipo', permitted: true },
    <RolPermission>{ id: uuid(), key: 'invite_collaborators', text: 'Inivitar / Compartir', permitted: true },
    <RolPermission>{ id: uuid(), key: 'upload_image_feedback', text: 'Subir imagenes en feedback', permitted: true },
    <RolPermission>{ id: uuid(), key: 'share_core', text: 'Compartir feedback, minuta, brief  ', permitted: true },
    <RolPermission>{ id: uuid(), key: 'delete_core', text: 'Eliminar  feedback, minuta, brief  ', permitted: true },
    <RolPermission>{ id: uuid(), key: 'approve_core', text: 'Aprobar  feedback, minuta', permitted: true },
    <RolPermission>{ id: uuid(), key: 'crud_projects', text: 'Alta, bajas, modificación de proyectos', permitted: true }
];

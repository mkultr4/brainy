import { Notification } from '../models/notifications/notification';
import { Invitation } from '../models/invitations/invitation';
import { WORKSPACE_ACCESSES } from './mock-workspace-accesses';
import { NotificationLevel } from '../models/notifications/notification-level';
import { NotificationStatus } from '../models/notifications/notification-status';
import { NotificationType } from '../models/notifications/notification-type';
import { USERS } from './mock-users';
import { CORES, CORE_STATUSES } from './mock-cores';
import { ROLES } from './mock-roles';
import { BriefTemplate } from '../models/brief/brief-template';
import { Brief } from '../models/brief/brief';
import { TYPES_TEMPLATE } from './mock-brief';


const $today = new Date();
$today.setHours($today.getHours() - 1, 0, 0, 0);
const $yesterday = new Date($today);
$yesterday.setHours(0, 0, 0, 0);
$yesterday.setDate($today.getDate() - 1);

const $beforeYesterday = new Date($yesterday);
$beforeYesterday.setHours(0, 0, 0, 0);
$beforeYesterday.setDate($yesterday.getDate() - 1);
// tslint:disable-next-line:max-line-length
const messageText = `The monkey-rope is found in all whalers; but it was only in the but it was only in the Pequod that the monkey and his holder were ever tied together. This impro.`;
// Levels
export const NOTIFICATION_LEVELS: NotificationLevel[] = [
    <NotificationLevel>{
        id: 1,
        name: 'workspace',
        key: 'workspace',
        description: 'workspace'
    },
    <NotificationLevel>{
        id: 2,
        name: 'core',
        key: 'core',
        description: 'core'
    },
    <NotificationLevel>{
        id: 3,
        name: 'brand',
        key: 'brand',
        description: 'brand'
    },
    <NotificationLevel>{
        id: 4,
        name: 'project',
        key: 'project',
        description: 'project'
    },
    <NotificationLevel>{
        id: 5,
        name: 'user',
        key: 'user',
        description: 'user'
    },
    <NotificationLevel>{
        id: 6,
        name: 'brief',
        key: 'brief',
        description: 'brief'
    },
    <NotificationLevel>{
        id: 7,
        name: 'feedback',
        key: 'feedback',
        description: 'feedback'
    },
    <NotificationLevel>{
        id: 8,
        name: 'meeting-note',
        key: 'meeting-note',
        description: 'meeting-note'
    },
    <NotificationLevel>{
        id: 9,
        name: 'brief-presentation',
        key: 'brief-presentation',
        description: 'brief-presentation'
    }
];
// Statuses
export const NOTIFICATION_STATUSES: NotificationStatus[] = [
    <NotificationStatus>{
        id: 1,
        key: 'active',
        description: 'active'
    },
    <NotificationStatus>{
        id: 2,
        name: 'inactive',
        key: 'inactive',
        description: 'inactive'
    }
];
// Types
export const NOTIFICATION_ICONS = {
    // CLOUD
    CLOUD: 'assets/img/notifications/ico_cloud.svg',
    // Brief
    BRIEF: 'assets/img/notifications/ico_notification_brief.svg',
    // Message
    MESSAGE: '/assets/img/notifications/ico_notification_message.svg',
    // Alert
    ALERT: 'assets/img/notifications/ico_notification_send.svg',
    // PERMISSIONS
    PERMISSIONS: 'assets/img/notifications/icon_notification_permission.svg',
    // Paper 
    PAPER :'assets/img/notifications/ico_notification_paper_check.svg'
}

export const NOTIFICATION_TYPES: NotificationType[] = [
    <NotificationType>{
        id: 1,
        name: 'Info',
        key: 'information',
        description: 'Information'
    },
    <NotificationType>{
        id: 2,
        name: 'Error',
        key: 'error',
        description: 'Error'
    },
    <NotificationType>{
        id: 3,
        name: 'Warning',
        key: 'warning',
        description: 'Warning'
    },
    <NotificationType>{
        id: 4,
        name: 'ModalInfo',
        key: 'modal-info',
        description: 'Modal with info'
    },
    <NotificationType>{
        id: 5,
        name: 'ModalError',
        key: 'modal-error',
        description: 'Modal with error'
    },
    <NotificationType>{
        id: 6,
        name: 'ModalWarning',
        key: 'modal-warning',
        description: 'Modal with warning'
    },
    // Notification open core
    <NotificationType>{
        id: 7,
        name: 'ModalRequestModification',
        key: 'modal-request-modification',
        description: 'Modal request modification'
    },
    // Notification open core
    <NotificationType>{
        id: 8,
        name: 'ModalRequestPermission',
        key: 'modal-request-permission',
        description: 'Modal request permission'
    },

];



export const NOTIFICATIONS: Notification[] = [
    <Notification>{
        title: 'Tienes 2 mensajes en Brief',
        message: messageText,
        type: NOTIFICATION_TYPES[0],
        status: NOTIFICATION_STATUSES[0],
        level: NOTIFICATION_LEVELS.filter(l => l.key === 'brief')[0],
        thumbnail: NOTIFICATION_ICONS.BRIEF,
        createDate: $today,
        updateDate: $today,
        read: false
    },
    <Notification>{
        title: 'Se edito el Biref Estrategico & Creativo',
        message: messageText,
        thumbnail: NOTIFICATION_ICONS.BRIEF,
        type: NOTIFICATION_TYPES[0],
        status: NOTIFICATION_STATUSES[0],
        level: NOTIFICATION_LEVELS.filter(l => l.key === 'brief')[0],
        createDate: $today,
        updateDate: $today,
        read: true
    },
    <Notification>{
        title: 'Lorem ipsum dolor sit amet',
        message: messageText,
        thumbnail: NOTIFICATION_ICONS.ALERT,
        type: NOTIFICATION_TYPES[0],
        status: NOTIFICATION_STATUSES[0],
        level: NOTIFICATION_LEVELS.filter(l => l.key === 'workspace')[0],
        createDate: $today,
        updateDate: $today,
        read: true
    },
    <Notification>{
        title: 'Lorem ipsum dolor sit amet',
        message: messageText,
        thumbnail: undefined,
        type: NOTIFICATION_TYPES[0],
        status: NOTIFICATION_STATUSES[0],
        level: NOTIFICATION_LEVELS.filter(l => l.key === 'user')[0],
        referenceObject: USERS[0],
        createDate: $today,
        updateDate: $today,
        read: false
    },
    <Notification>{
        title: 'Lorem ipsum dolor sit amet',
        message: messageText,
        thumbnail: NOTIFICATION_ICONS.CLOUD,
        type: NOTIFICATION_TYPES[0],
        status: NOTIFICATION_STATUSES[0],
        level: NOTIFICATION_LEVELS.filter(l => l.key === 'workspace')[0],
        createDate: $today,
        updateDate: $today,
        read: false
    },
    <Notification>{
        title: 'Tienes 2 mensajes en Brief',
        message: messageText,
        thumbnail: NOTIFICATION_ICONS.MESSAGE,
        type: NOTIFICATION_TYPES[0],
        status: NOTIFICATION_STATUSES[0],
        level: NOTIFICATION_LEVELS.filter(l => l.key === 'brief')[0],
        createDate: $today,
        updateDate: $today,
        read: true
    },
    <Notification>{
        title: 'Se edito el Biref Estrategico & Creativo.',
        message: messageText,
        thumbnail: NOTIFICATION_ICONS.MESSAGE,
        type: NOTIFICATION_TYPES[0],
        status: NOTIFICATION_STATUSES[0],
        level: NOTIFICATION_LEVELS.filter(l => l.key === 'brief')[0],
        createDate: $today,
        updateDate: $today,
        read: false
    },
    <Notification>{
        title: 'Lorem ipsum dolor sit amet',
        message: messageText,
        thumbnail: NOTIFICATION_ICONS.ALERT,
        type: NOTIFICATION_TYPES[0],
        status: NOTIFICATION_STATUSES[0],
        level: NOTIFICATION_LEVELS.filter(l => l.key === 'workspace')[0],
        createDate: $yesterday,
        updateDate: $yesterday,
        read: true
    },
    <Notification>{
        title: 'Lorem ipsum dolor sit amet',
        message: messageText,
        thumbnail: undefined,
        type: NOTIFICATION_TYPES[0],
        status: NOTIFICATION_STATUSES[0],
        level: NOTIFICATION_LEVELS.filter(l => l.key === 'user')[0],
        referenceObject: USERS[0],
        createDate: $yesterday,
        updateDate: $yesterday,
        read: false
    },
    <Notification>{
        title: 'Lorem ipsum dolor sit amet',
        message: messageText,
        thumbnail: NOTIFICATION_ICONS.CLOUD,
        type: NOTIFICATION_TYPES[0],
        status: NOTIFICATION_STATUSES[0],
        level: NOTIFICATION_LEVELS.filter(l => l.key === 'workspace')[0],
        createDate: $yesterday,
        updateDate: $yesterday,
        read: true
    },
    <Notification>{
        title: 'Tienes 2 mensajes en Brief',
        message: messageText,
        thumbnail: NOTIFICATION_ICONS.MESSAGE,
        type: NOTIFICATION_TYPES[0],
        status: NOTIFICATION_STATUSES[0],
        level: NOTIFICATION_LEVELS.filter(l => l.key === 'brief')[0],
        createDate: $yesterday,
        updateDate: $yesterday,
        read: false
    },
    <Notification>{
        title: 'Se edito el Biref Estrategico & Creativo.',
        message: messageText,
        thumbnail: NOTIFICATION_ICONS.MESSAGE,
        type: NOTIFICATION_TYPES[0],
        status: NOTIFICATION_STATUSES[0],
        level: NOTIFICATION_LEVELS.filter(l => l.key === 'brief')[0],
        createDate: $yesterday,
        updateDate: $yesterday,
        read: true
    },
    <Notification>{
        title: 'Lorem ipsum dolor sit amet',
        message: messageText,
        thumbnail: NOTIFICATION_ICONS.ALERT,
        type: NOTIFICATION_TYPES[0],
        status: NOTIFICATION_STATUSES[0],
        level: NOTIFICATION_LEVELS.filter(l => l.key === 'workspace')[0],
        createDate: $yesterday,
        updateDate: $yesterday,
        read: true
    },
    <Notification>{
        title: 'Lorem ipsum dolor sit amet',
        message: messageText,
        thumbnail: undefined,
        type: NOTIFICATION_TYPES[0],
        status: NOTIFICATION_STATUSES[0],
        level: NOTIFICATION_LEVELS.filter(l => l.key === 'user')[0],
        referenceObject: USERS[0],
        createDate: $yesterday,
        updateDate: $yesterday,
        read: false
    },
    <Notification>{
        title: 'Lorem ipsum dolor sit amet',
        message: messageText,
        thumbnail: NOTIFICATION_ICONS.CLOUD,
        type: NOTIFICATION_TYPES[0],
        status: NOTIFICATION_STATUSES[0],
        level: NOTIFICATION_LEVELS.filter(l => l.key === 'workspace')[0],
        createDate: $yesterday,
        updateDate: $yesterday,
        read: true
    },
    <Notification>{
        title: 'Tienes 2 mensajes en Brief',
        message: messageText,
        thumbnail: NOTIFICATION_ICONS.MESSAGE,
        type: NOTIFICATION_TYPES[0],
        status: NOTIFICATION_STATUSES[0],
        level: NOTIFICATION_LEVELS.filter(l => l.key === 'brief')[0],
        createDate: $yesterday,
        updateDate: $yesterday,
        read: true
    },
    <Notification>{
        title: 'Lorem ipsum dolor sit amet',
        message: messageText,
        thumbnail: NOTIFICATION_ICONS.ALERT,
        type: NOTIFICATION_TYPES[0],
        status: NOTIFICATION_STATUSES[0],
        level: NOTIFICATION_LEVELS.filter(l => l.key === 'workspace')[0],
        createDate: $beforeYesterday,
        updateDate: $beforeYesterday,
        read: false
    },
    <Notification>{
        title: 'Lorem ipsum dolor sit amet',
        message: messageText,
        thumbnail: undefined,
        type: NOTIFICATION_TYPES[0],
        status: NOTIFICATION_STATUSES[0],
        level: NOTIFICATION_LEVELS.filter(l => l.key === 'user')[0],
        referenceObject: USERS[0],
        createDate: $beforeYesterday,
        updateDate: $beforeYesterday,
        read: true
    },
    <Notification>{
        title: 'Lorem ipsum dolor sit amet',
        message: messageText,
        thumbnail: NOTIFICATION_ICONS.CLOUD,
        type: NOTIFICATION_TYPES[0],
        status: NOTIFICATION_STATUSES[0],
        level: NOTIFICATION_LEVELS.filter(l => l.key === 'workspace')[0],
        createDate: $beforeYesterday,
        updateDate: $beforeYesterday,
        read: false
    }
];
/***************************************************************************************
 * Feedback
 ***************************************************************************************/
// Feedback request modification
const feedbackClose = Object.assign({}, CORES.filter(c => c.type.key === 'feedback')[0]);
feedbackClose.status = CORE_STATUSES.filter(s => s.key === 'approved')[0];
export const NOTIFICATION_REQUEST_EDIT_FEEDBACK = <Notification>{
    id: 155,
    type: NOTIFICATION_TYPES.filter(t => t.key === 'modal-request-modification')[0],
    title: 'Te han enviado una solicitud de modificación.',
    level: NOTIFICATION_LEVELS.filter(l => l.key === 'feedback')[0],
    referenceId: '1',
    referenceObject: feedbackClose,
    originUser: USERS[1],
    originUserRol: ROLES[2],
    message: messageText,
    read: false,
    createDate: new Date(),
    updateDate: new Date(),
    queryParams: { notificationRequestModification: true, specialRol: 'editor' }
};
// Feedback permission accepted 
const feedbackOpen = Object.assign({}, CORES.filter(c => c.type.key === 'feedback')[0]);
feedbackOpen.status = CORE_STATUSES.filter(s => s.key === 'process')[0];
export const NOTIFICATION_PERMISSION_ACCEPTED_FEEDBACK = <Notification>{
    id: 156,
    title: 'Tu solicitud de permiso fue aceptada.',
    type: NOTIFICATION_TYPES.filter(t => t.key === 'information')[0],
    level: NOTIFICATION_LEVELS.filter(l => l.key === 'feedback')[0],
    thumbnail: NOTIFICATION_ICONS.PERMISSIONS,
    referenceObject: feedbackOpen,
    message: messageText,
    read: false,
    createDate: new Date(),
    updateDate: new Date()
};

// Notification Request permission feedback
export const NOTIFICATION_REQUEST_PERMISSION_FEEDBACK = <Notification>{
    id: 158,
    type: NOTIFICATION_TYPES.filter(t => t.key === 'modal-request-permission')[0],
    title: 'Te han enviado una solicitud de permiso.',
    level: NOTIFICATION_LEVELS.filter(l => l.key === 'feedback')[0],
    referenceId: '1',
    referenceObject: feedbackClose,
    originUser: USERS[1],
    originUserRol: ROLES[3],
    originUserGroupReference: 'editor',
    message: messageText,
    read: false,
    createDate: new Date(),
    updateDate: new Date(),
    queryParams: { notificationRequestPermission: true, rol: 'mananger', specialRol: 'approver' }
};

/***************************************************************************************
 * Meeting note
 ***************************************************************************************/
// Meeting note request modification
const meetingNoteClose = Object.assign({}, CORES.filter(c => c.type.key === 'meeting-note')[0]);
meetingNoteClose.status = CORE_STATUSES.filter(s => s.key === 'approved')[0];
export const NOTIFICATION_REQUEST_EDIT_MEETING = <Notification>{
    id: 155,
    type: NOTIFICATION_TYPES.filter(t => t.key === 'modal-request-modification')[0],
    title: 'Te han enviado una solicitud de modificación.',
    level: NOTIFICATION_LEVELS.filter(l => l.key === 'meeting-note')[0],
    referenceId: '1',
    referenceObject: meetingNoteClose,
    originUser: USERS[1],
    originUserRol: ROLES[2],
    message: messageText,
    read: false,
    createDate: new Date(),
    updateDate: new Date(),
    queryParams: { notificationRequestModification: true, specialRol: 'editor' }
};
// Feedback permission accepted 
const meetingNoteOpen = Object.assign({}, CORES.filter(c => c.type.key === 'meeting-note')[0]);
meetingNoteOpen.status = CORE_STATUSES.filter(s => s.key === 'process')[0];
export const NOTIFICATION_PERMISSION_ACCEPTED_MEETING= <Notification>{
    id: 156,
    title: 'Tu solicitud de permiso fue aceptada.',
    type: NOTIFICATION_TYPES.filter(t => t.key === 'information')[0],
    level: NOTIFICATION_LEVELS.filter(l => l.key === 'meeting-note')[0],
    thumbnail: NOTIFICATION_ICONS.PERMISSIONS,
    referenceObject: meetingNoteOpen,
    message: messageText,
    read: false,
    createDate: new Date(),
    updateDate: new Date()
};

// Notification Request permission feedback
export const NOTIFICATION_REQUEST_PERMISSION_MEETING= <Notification>{
    id: 158,
    type: NOTIFICATION_TYPES.filter(t => t.key === 'modal-request-permission')[0],
    title: 'Te han enviado una solicitud de permiso para abrir la minuta.',
    level: NOTIFICATION_LEVELS.filter(l => l.key === 'meeting-note')[0],
    referenceId: '1',
    referenceObject: feedbackClose,
    originUser: USERS[1],
    originUserRol: ROLES[3],
    originUserGroupReference: 'editor',
    message: `his holder were ever tied together. This impro.`,
    read: false,
    createDate: new Date(),
    updateDate: new Date(),
    queryParams: { notificationRequestPermission: true, rol: 'mananger', specialRol: 'approver' }
};

/***************************************************************************************
 * Brief
 ***************************************************************************************/
const brief = Object.assign({}, CORES.filter(c => c.type.key === 'feedback')[0]);
brief.status = CORE_STATUSES.filter(s => s.key === 'to-be-approved')[0];
export const NOTIFICATION_BRIEF_FILLED= <Notification>{
    id: 158,
    type: NOTIFICATION_TYPES.filter(t => t.key === 'information')[0],
    title: 'Te han enviado un Brief lleno.',
    level: NOTIFICATION_LEVELS.filter(l => l.key === 'brief')[0],
    referenceObject:brief,
    referenceId: '1',
    originUser: USERS[1],
    originUserRol: ROLES[3],
    originUserGroupReference: 'approver',
    thumbnail: NOTIFICATION_ICONS.PAPER,
    message: `In the tumultuous business of cutting-in and attending to a whale, there is much running backwards and forwards among the crew. Now hands are wanted here, and then.`,
    read: false,
    createDate: new Date(),
    updateDate: new Date(),
    queryParams: { rol: 'admin', specialRol: 'editor',autoFillResponse:true}
};

export const NOTIFICATION_BRIEF_GIVEBACK= <Notification>{
    id: 158,
    type: NOTIFICATION_TYPES.filter(t => t.key === 'information')[0],
    title: 'Tienes observaciones en tu Brief lleno.',
    level: NOTIFICATION_LEVELS.filter(l => l.key === 'brief')[0],
    referenceObject:brief,
    referenceId: '1',
    originUser: USERS[1],
    originUserRol: ROLES[3],
    originUserGroupReference: 'editor',
    thumbnail: NOTIFICATION_ICONS.PAPER,
    message: `In the tumultuous business of cutting-in and attending to a whale, there is much running backwards and forwards among the crew. Now hands are wanted here, and then.`,
    read: false,
    createDate: new Date(),
    updateDate: new Date(),
    queryParams: { rol: 'admin', specialRol: 'approver',autoFillResponse:true,addGiveback:true }
};

// Brief request modification
const briefClose = Object.assign(new Brief(), CORES.filter(c => c.type.key === 'brief')[0]);
briefClose.status = CORE_STATUSES.filter(s => s.key === 'approved')[0];
briefClose.template = new BriefTemplate();
briefClose.template.typeTemplate = TYPES_TEMPLATE.filter(t => t.key === 'brief')[0];
export const NOTIFICATION_REQUEST_EDIT_BRIEF = <Notification>{
    id: 155,
    type: NOTIFICATION_TYPES.filter(t => t.key === 'modal-request-modification')[0],
    title: 'Te han enviado una solicitud de modificación.',
    level: NOTIFICATION_LEVELS.filter(l => l.key === 'brief')[0],
    referenceId: '1',
    referenceObject: briefClose,
    originUser: USERS[1],
    originUserRol: ROLES[2],
    message: messageText,
    read: false,
    createDate: new Date(),
    updateDate: new Date(),
    queryParams: { notificationRequestModification: true, specialRol: 'editor' }
};
// Brief permission accepted 
const briefOpen = Object.assign(new Brief(), CORES.filter(c => c.type.key === 'brief')[0]);
briefOpen.status = CORE_STATUSES.filter(s => s.key === 'process')[0];
briefOpen.template = new BriefTemplate();
briefOpen.template.typeTemplate = TYPES_TEMPLATE.filter(t => t.key === 'brief')[0];
export const NOTIFICATION_PERMISSION_ACCEPTED_BRIEF = <Notification>{
    id: 156,
    title: 'Tu solicitud de permiso fue aceptada.',
    type: NOTIFICATION_TYPES.filter(t => t.key === 'information')[0],
    level: NOTIFICATION_LEVELS.filter(l => l.key === 'brief')[0],
    thumbnail: NOTIFICATION_ICONS.PERMISSIONS,
    referenceObject: briefOpen,
    message: messageText,
    read: false,
    createDate: new Date(),
    updateDate: new Date(),
    queryParams: { statusKey:'edit' }
};

// Notification Request permission feedback
export const NOTIFICATION_REQUEST_PERMISSION_BRIEF= <Notification>{
    id: 158,
    type: NOTIFICATION_TYPES.filter(t => t.key === 'modal-request-permission')[0],
    title: 'Te han enviado una solicitud de permiso.',
    level: NOTIFICATION_LEVELS.filter(l => l.key === 'brief')[0],
    referenceId: '1',
    referenceObject: briefClose,
    originUser: USERS[1],
    originUserRol: ROLES[3],
    originUserGroupReference: 'editor',
    message: messageText,
    read: false,
    createDate: new Date(),
    updateDate: new Date(),
    queryParams: { notificationRequestPermission: true, rol: 'mananger', specialRol: 'approver',statusKey:'edit' }
};


/***************************************************************************************
 *  PITCH
 ***************************************************************************************/

// Brief request modification
const pitchClose = Object.assign(new Brief(), CORES.filter(c => c.type.key === 'brief')[0]);
pitchClose.status = CORE_STATUSES.filter(s => s.key === 'approved')[0];
pitchClose.template = new BriefTemplate();
pitchClose.template.typeTemplate = TYPES_TEMPLATE.filter(t => t.key === 'pitch')[0];
export const NOTIFICATION_REQUEST_EDIT_PITCH = <Notification>{
    id: 155,
    type: NOTIFICATION_TYPES.filter(t => t.key === 'modal-request-modification')[0],
    title: 'Te han enviado una solicitud de modificación.',
    level: NOTIFICATION_LEVELS.filter(l => l.key === 'brief')[0],
    referenceId: '1',
    referenceObject: pitchClose,
    originUser: USERS[1],
    originUserRol: ROLES[2],
    message: messageText,
    read: false,
    createDate: new Date(),
    updateDate: new Date(),
    queryParams: { notificationRequestModification: true, specialRol: 'editor',templateType:'pitch' }
};
// Brief permission accepted 
const pitchOpen = Object.assign(new Brief(), CORES.filter(c => c.type.key === 'brief')[0]);
pitchOpen.status = CORE_STATUSES.filter(s => s.key === 'process')[0];
pitchOpen.template = new BriefTemplate();
pitchOpen.template.typeTemplate = TYPES_TEMPLATE.filter(t => t.key === 'pitch')[0];
export const NOTIFICATION_PERMISSION_ACCEPTED_PITCH = <Notification>{
    id: 156,
    title: 'Tu solicitud de permiso fue aceptada.',
    type: NOTIFICATION_TYPES.filter(t => t.key === 'information')[0],
    level: NOTIFICATION_LEVELS.filter(l => l.key === 'brief')[0],
    thumbnail: NOTIFICATION_ICONS.PERMISSIONS,
    referenceObject: pitchOpen,
    message: messageText,
    read: false,
    createDate: new Date(),
    updateDate: new Date(),
    queryParams: { statusKey:'edit',autoFillResponse:true,addGiveback:true,addProposals :true,'addFinalist':true}
};

// Notification Request permission feedback
export const NOTIFICATION_REQUEST_PERMISSION_PITCH= <Notification>{
    id: 158,
    type: NOTIFICATION_TYPES.filter(t => t.key === 'modal-request-permission')[0],
    title: 'Te han enviado una solicitud de permiso.',
    level: NOTIFICATION_LEVELS.filter(l => l.key === 'brief')[0],
    referenceId: '1',
    referenceObject: pitchClose,
    originUser: USERS[1],
    originUserRol: ROLES[3],
    originUserGroupReference: 'editor',
    message: messageText,
    read: false,
    createDate: new Date(),
    updateDate: new Date(),
    queryParams: { notificationRequestPermission: true, rol: 'mananger', specialRol: 'approver',statusKey:'edit',templateType:'pitch' }
};




import * as moment from 'moment';
import { CATEGORIES } from './mock-categories';;

import { User } from '../models/users/user';
import { ROLES } from './mock-roles';
import { WorkspaceAccess } from '../models/workspace/workspace-access';
import { ACCOUNT_STATUSES, WORKSPACE_ACCESSES } from './mock-workspace-accesses';
import { Brand } from '../models/brands/brand';
import { WORKSPACES } from './mock-workspace';
import { BRANDS } from './mock-brands';

let $today = new Date();
$today = moment($today).subtract(1, 'hour').toDate();
const $yesterday = moment().subtract(1, 'days').toDate();
const $beforeYesterday = moment().subtract(2, 'days').toDate();
const $created = moment().subtract(30, 'days').toDate();
const $lastSession = moment().subtract(5, 'days').toDate();
// Team
export const TEAM: Array<WorkspaceAccess> = [
    <WorkspaceAccess>{
        id: '8',
        accountStatus: ACCOUNT_STATUSES[0],
        workspace: WORKSPACES[0],
        rol: ROLES[2],
        user: <User>{
            id: '11',
            name: 'Esteban',
            lastName: 'López',
            acronym: 'AL',
            status: 'offline',
            profilePicture: '/assets/img/profile_3.jpg',
            email: 'ariel@teamknowlogy.com',
            password: '12345',
        },
        brands: [
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/bbva.jpg',
            },
            <Brand>{
                logo: 'assets/img/brands/apple.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
        ],
        modified: $today,
        created: $created,
        lastSession: $lastSession
    },
    <WorkspaceAccess>{
        id: '9',
        accountStatus: ACCOUNT_STATUSES[0],
        rol: ROLES[2],
        workspace: WORKSPACES[0],
        user: <User>{
            id: '12',
            name: 'Mathew',
            lastName: 'Bellamy',
            acronym: 'MB',
            status: 'bussy',
            profilePicture: '/assets/img/avatar_3.jpg',
            email: 'ariel@teamknowlogy.com',
            password: '12345',
        },
        brands: [
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/bbva.jpg',
            },
            <Brand>{
                logo: 'assets/img/brands/apple.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
        ],
        modified: $today,
        created: $created,
        lastSession: $lastSession
    },
    <WorkspaceAccess>{
        id: '10',
        accountStatus: ACCOUNT_STATUSES[0],
        rol: ROLES[2],
        workspace: WORKSPACES[0],
        user: <User>{
            id: '13',
            name: 'Gustavo',
            lastName: 'Bracco',
            acronym: 'GB',
            status: 'online',
            profilePicture: '/assets/img/profile_4.png',
            email: 'ariel@teamknowlogy.com',
            password: '12345',
        },
        brands: [
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/bbva.jpg',
            },
            <Brand>{
                logo: 'assets/img/brands/apple.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/bbva.jpg',
            },
            <Brand>{
                logo: 'assets/img/brands/apple.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
        ],
        modified: $yesterday,
        created: $created,
        lastSession: $lastSession
    },
    <WorkspaceAccess>{
        id: '11',
        accountStatus: ACCOUNT_STATUSES[0],
        rol: ROLES[2],
        workspace: WORKSPACES[0],
        user: <User>{
            id: '14',
            name: 'Graciela',
            lastName: 'Armani',
            acronym: 'AL',
            status: 'offline',
            profilePicture: '/assets/img/profile_1.jpg',
            email: 'ariel@teamknowlogy.com',
        },
        brands: [
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/bbva.jpg',
            },
            <Brand>{
                logo: 'assets/img/brands/apple.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
        ],
        modified: $yesterday,
        created: $created,
        lastSession: $lastSession
    },
    <WorkspaceAccess>{
        id: '12',
        accountStatus: ACCOUNT_STATUSES[1],
        rol: ROLES[2],
        workspace: WORKSPACES[0],
        user: <User>{
            name: 'Mathew',
            lastName: 'Bellamy',
            acronym: 'MB',
            status: 'bussy',
            profilePicture: '/assets/img/avatar_3.jpg',
            email: 'ariel@teamknowlogy.com',
        },
        brands: [
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/bbva.jpg',
            },
            <Brand>{
                logo: 'assets/img/brands/apple.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
        ],
        modified: $yesterday,
        created: $created,
        lastSession: $lastSession
    },
    <WorkspaceAccess>{
        id: '13',
        accountStatus: ACCOUNT_STATUSES[1],
        workspace: WORKSPACES[0],
        rol: ROLES[3],
        user: <User>{
            name: 'Jorgito',
            lastName: 'Bracco',
            acronym: 'GB',
            status: 'online',
            profilePicture: '/assets/img/profile_2.jpg',
            email: 'ariel@teamknowlogy.com',
        },
        brands: [
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/bbva.jpg',
            },
            <Brand>{
                logo: 'assets/img/brands/apple.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/bbva.jpg',
            },
            <Brand>{
                logo: 'assets/img/brands/apple.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
        ],
        modified: $yesterday,
        created: $created,
        lastSession: $lastSession
    }
];
// Guests
export const GUESTS: Array<WorkspaceAccess> = [
    <WorkspaceAccess>{
        id: '14',
        workspace: WORKSPACES[0],
        accountStatus: ACCOUNT_STATUSES[0],
        rol: ROLES[5],
        category: CATEGORIES[0],
        user: <User>{
            id: '11',
            name: 'Ariel',
            lastName: 'López',
            acronym: 'AL',
            status: 'offline',
            profilePicture: '/assets/img/avatar_ariel.png',
            email: 'ariel@teamknowlogy.com',
        },
        brands: [
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/bbva.jpg',
            },
            <Brand>{
                logo: 'assets/img/brands/apple.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
        ],
        brandCurrentCore:BRANDS[6],
        modified: $today,
        created: $created,
        lastSession: $lastSession
    },
    <WorkspaceAccess>{
        id: '15',
        workspace: WORKSPACES[0],
        accountStatus: ACCOUNT_STATUSES[0],
        rol: ROLES[5],
        category: CATEGORIES[0],
        user: <User>{
            id: '12',
            name: 'Mathew',
            lastName: 'Bellamy',
            acronym: 'MB',
            status: 'bussy',
            profilePicture: '/assets/img/avatar_3.jpg',
            email: 'ariel@teamknowlogy.com',
        },
        brands: [
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/bbva.jpg',
            },
            <Brand>{
                logo: 'assets/img/brands/apple.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
        ],
        brandCurrentCore:BRANDS[4],
        modified: $today,
        created: $created,
        lastSession: $lastSession
    },
    <WorkspaceAccess>{
        id: '16',
        accountStatus: ACCOUNT_STATUSES[0],
        rol: ROLES[5],
        workspace: WORKSPACES[0],
        category: CATEGORIES[1],
        user: <User>{
            id: '13',
            name: 'Gustavo',
            lastName: 'Bracco',
            acronym: 'GB',
            status: 'online',
            profilePicture: false,

            email: 'ariel@teamknowlogy.com',

        },
        brands: [
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/bbva.jpg',
            },
            <Brand>{
                logo: 'assets/img/brands/apple.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/bbva.jpg',
            },
            <Brand>{
                logo: 'assets/img/brands/apple.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
        ],
        brandCurrentCore:BRANDS[3],
        modified: $yesterday,
        created: $created,
        lastSession: $lastSession
    },
    <WorkspaceAccess>{
        id: '17',
        accountStatus: ACCOUNT_STATUSES[0],
        rol: ROLES[5],
        workspace: WORKSPACES[0],
        category: CATEGORIES[1],
        user: <User>{
            id: '14',
            name: 'Ariel',
            lastName: 'López',
            acronym: 'AL',
            status: 'online',
            profilePicture: '/assets/img/avatar_ariel.png',
            email: 'ariel@teamknowlogy.com',

        },
        brands: [
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/bbva.jpg',
            },
            <Brand>{
                logo: 'assets/img/brands/apple.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
        ],
        brandCurrentCore:BRANDS[2],
        modified: $yesterday,
        created: $created,
        lastSession: $lastSession
    },
    <WorkspaceAccess>{
        id: '18',
        accountStatus: ACCOUNT_STATUSES[1],
        rol: ROLES[5],
        workspace: WORKSPACES[0],
        category: CATEGORIES[2],
        user: <User>{

            name: 'Mathew',
            lastName: 'Bellamy',
            acronym: 'MB',
            status: 'bussy',
            profilePicture: '/assets/img/avatar_3.jpg',

            email: 'ariel@teamknowlogy.com',

        },
        brands: [
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/bbva.jpg',
            },
            <Brand>{
                logo: 'assets/img/brands/apple.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
        ],
        brandCurrentCore:BRANDS[1],
        modified: $yesterday,
        created: $created,
        lastSession: $lastSession
    },
    <WorkspaceAccess>{
        id: '19',
        accountStatus: ACCOUNT_STATUSES[0],
        rol: ROLES[5],
        category: CATEGORIES[2],
        workspace: WORKSPACES[0],
        user: <User>{
            name: 'Gustavo',
            lastName: 'Bracco',
            acronym: 'GB',
            status: 'online',
            profilePicture: false,

            email: 'ariel@teamknowlogy.com',

        },
        brands: [
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/bbva.jpg',
            },
            <Brand>{
                logo: 'assets/img/brands/apple.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/bbva.jpg',
            },
            <Brand>{
                logo: 'assets/img/brands/apple.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
            <Brand>{
                logo: 'assets/img/brands/the_north_face.png',
            },
        ],
        brandCurrentCore:BRANDS[0],
        modified: $yesterday,
        created: $created,
        lastSession: $lastSession
    }
];
// All users
export const ALL_TEAM = TEAM.concat(GUESTS, WORKSPACE_ACCESSES);


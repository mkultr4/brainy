import { Brand } from '../models/brands/brand';
import { Project } from '../models/projects/project';
import * as moment from 'moment';
import { WORKSPACE_ACCESSES } from './mock-workspace-accesses';

let $today = new Date();
$today = moment($today).subtract(1, 'hour').toDate();

const $yesterday = moment().subtract(1, 'days').toDate();

const $beforeYesterday = moment().subtract(2, 'days').toDate();
export const BRANDS_STATUSES = [
    'all',
    'active',
    'eliminated'
];
export const BRANDS: Brand[] = [
    <Brand>{
        id: '1',
        status: 'active',
        name: 'Apple',
        logo: 'assets/img/brands/apple.png',
        workspaceAccesses: [
            WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[2], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[3], WORKSPACE_ACCESSES[4]
        ],
        modified: $today,
        projects: [new Project(), new Project(), new Project()],
        projectsCount: 3,
    },
    <Brand>{
        id: '155',
        status: 'active',
        name: 'Grupo modelo',
        logo: null,
        workspaceAccesses: [
            WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[2], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[3], WORKSPACE_ACCESSES[4]
        ],
        modified: $today,
        projects: [new Project(), new Project(), new Project()],

        projectsCount: 3,
    },
    <Brand>{
        id: '2',
        status: 'active',
        name: 'Adidas',
        logo: 'assets/img/brands/adidas.png',
        workspaceAccesses: [
            WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[2], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[3], WORKSPACE_ACCESSES[4]
        ],
        modified: $today,
        projects: [new Project(), new Project(), new Project()],
        projectsCount: 3,
    },
    <Brand>{
        id: '3',
        status: 'active',
        name: 'BBVA BANCOMER',
        logo: 'assets/img/brands/bbva.jpg',
        workspaceAccesses: [
            WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[2], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[3], WORKSPACE_ACCESSES[4]
        ],
        modified: $yesterday,
        projects: [new Project(), new Project(), new Project()],
        projectsCount: 3,
    },
    <Brand>{
        id: '4',
        status: 'active',
        name: 'Citi',
        logo: 'assets/img/brands/citi.png',
        workspaceAccesses: [
            WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[2], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[3], WORKSPACE_ACCESSES[4]
        ],
        projects: [new Project(), new Project(), new Project()],

        projectsCount: 3,
    },
    <Brand>{
        id: '5',
        status: 'active',
        name: 'H&M',
        logo: 'assets/img/brands/hm.jpg',
        workspaceAccesses: [
            WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[2], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[3], WORKSPACE_ACCESSES[4]
        ],
        projects: [new Project(), new Project(), new Project()],

        projectsCount: 3,
    },
    <Brand>{
        id: '6',
        status: 'eliminated',
        name: 'Johnnie Walker',
        logo: 'assets/img/brands/johnnie_walker.png',
        workspaceAccesses: [
            WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[2], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[3], WORKSPACE_ACCESSES[4]
        ],
        projects: [new Project(), new Project(), new Project()],

        projectsCount: 3,
    },
    <Brand>{
        id: '7',
        status: 'eliminated',
        name: 'Manson Guitars',
        logo: 'assets/img/brands/manson.png',
        workspaceAccesses: [
            WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[2], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[3], WORKSPACE_ACCESSES[4]
        ],
        projects: [new Project(), new Project(), new Project()],

        projectsCount: 3
    },
    <Brand>{
        id: '8',
        status: 'eliminated',
        name: 'Nestle',
        logo: 'assets/img/brands/nestle.png',
        workspaceAccesses: [
            WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[2], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[3], WORKSPACE_ACCESSES[4]
        ],
        modified: $yesterday,
        projects: [new Project(), new Project(), new Project()],

        projectsCount: 3
    },
    <Brand>{
        id: '9',
        status: 'eliminated',
        name: 'Samsung',
        logo: 'assets/img/brands/samsung.png',
        workspaceAccesses: [
            WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[2], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[3], WORKSPACE_ACCESSES[4]
        ],
        modified: $yesterday,
        projects: [new Project(), new Project(), new Project()],
        projectsCount: 3,
    },
    <Brand>{
        id: '10',
        status: 'eliminated',
        name: 'Starbucks',
        logo: 'assets/img/brands/starbucks.jpg',
        workspaceAccesses: [
            WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[2], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[3], WORKSPACE_ACCESSES[4]
        ],
        modified: $beforeYesterday,
        projects: [new Project(), new Project(), new Project()],

        projectsCount: 3,
    },
    <Brand>{
        id: '11',
        status: 'eliminated',
        name: 'The North Face',
        logo: 'assets/img/brands/the_north_face.png',
        workspaceAccesses: [
            WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[2], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[3], WORKSPACE_ACCESSES[4]
        ],
        modified: $beforeYesterday,
        projects: [new Project(), new Project(), new Project()],
        projectsCount: 3,
    },
    <Brand>{
        id: '12',
        status: 'eliminated',
        name: 'Zara',
        logo: 'assets/img/brands/zara.jpg',
        workspaceAccesses: [
            WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[2], WORKSPACE_ACCESSES[0],
            WORKSPACE_ACCESSES[1], WORKSPACE_ACCESSES[3], WORKSPACE_ACCESSES[4]
        ],
        modified: $beforeYesterday,
        projects: [new Project(), new Project(), new Project()],
        projectsCount: 3,
    }
];

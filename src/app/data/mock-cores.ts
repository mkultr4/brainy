import { CoreType } from '../models/cores/core-type';
import { CoreStatus } from '../models/cores/core-status';
import { Core } from '../models/cores/core';
import * as uuid from 'uuid/v4';
import * as moment from 'moment';
import { PROJECTS } from './mock-projects';
import { WORKSPACE_ACCESSES } from './mock-workspace-accesses';

let $today = new Date();
$today = moment($today).subtract(1, 'hour').toDate();
const $yesterday = moment().subtract(1, 'days').toDate();
const $beforeYesterday = moment().subtract(2, 'days').toDate();
// Types
export const CORE_TYPES: CoreType[] = [
    <CoreType>{ id: 1, key: 'feedback', text: 'Pieza' },
    <CoreType>{ id: 2, key: 'brief', text: 'Brief' },
    <CoreType>{ id: 3, key: 'meeting-note', text: 'Minuta' },
    <CoreType>{ id: 4, key: 'brief-presentation', text: 'Presentación' },
    <CoreType>{ id: 5, key: 'brief-template', text: 'Template' },
    <CoreType>{ id: 5, key: 'note', text: 'Nota' },
];
// Statuses
export const CORE_STATUSES: CoreStatus[] = [
    {
        id: 1,
        key: 'edit', text: 'En edición',
        ico: '/assets/img/commons/status/status_en_edicion.svg'
    },
    {
        id: 2,
        key: 'process', text: 'En proceso',
        ico: '/assets/img/commons/status/status_en_proceso.svg'
    },
    {
        id: 3,
        key: 'to-be-approved', text: 'Por aprobar',
        ico: '/assets/img/commons/status/status_por_aprobar.svg'
    },
    {
        id: 4,
        key: 'approved', text: 'Aprobado',
        ico: '/assets/img/commons/status/status_aprobar.svg'
    },
    {
        id: 5,
        key: 'canceled', text: 'Cancelado',
        ico: '/assets/img/commons/status/status_cancelar.svg'
    },
    {
        id: 6,
        key: 'disapproved', text: 'Desaprobar',
        ico: '/assets/img/commons/status/status_desaprobar.svg'
    },
    {
        id: 7,
        key: 'archived', text: 'Archivado',
        ico: '/assets/img/commons/icono_archivados.svg'
    }
];
// Cores
export const CORES: Array<Core> = [
    // Feedbacks
    <Core>{
        id: '1',
        title: 'Nuevo lanzamiento',
        coverImage: 'assets/img/feedback/examples/piece_1.jpg',
        project: PROJECTS[0],
        type: CORE_TYPES[0],
        status: CORE_STATUSES[0],
        modified: $today,
        created: $today,
        messages: 0,
        groupReference: 'approver',
        owner: WORKSPACE_ACCESSES[0].user,
        workspace: WORKSPACE_ACCESSES[0].workspace
    },
    <Core>{
        id: uuid(),
        title: 'Nuevo lanzamiento 2',
        coverImage: 'assets/img/feedback/examples/piece_2.jpg',
        project: PROJECTS[1],
        type: CORE_TYPES[0],
        status: CORE_STATUSES[1],
        modified: $yesterday,
        created: $yesterday,
        messages: 0,
        groupReference: 'approver',
        owner: WORKSPACE_ACCESSES[0].user,
        workspace: WORKSPACE_ACCESSES[0].workspace
    },
    <Core>{
        id: '3',
        title: 'Nuevo lanzamiento',
        coverImage: 'assets/img/feedback/examples/piece_3.jpg',
        project: PROJECTS[2],
        type: CORE_TYPES[2],
        status: CORE_STATUSES[0],
        modified: $beforeYesterday,
        created: $beforeYesterday,
        messages: 0,
        groupReference: 'approver',
        owner: WORKSPACE_ACCESSES[0].user,
        workspace: WORKSPACE_ACCESSES[0].workspace
    },
    // Brief
    <Core>{
        id: uuid(),
        title: 'Nuevo lanzamiento',
        coverImage: 'assets/img/feedback/examples/piece_1.jpg',
        project: PROJECTS[3],
        type: CORE_TYPES[1],
        status: CORE_STATUSES[3],
        modified: $today,
        created: $today,
        messages: 0,
        groupReference: 'approver',
        owner: WORKSPACE_ACCESSES[0].user,
        workspace: WORKSPACE_ACCESSES[0].workspace
    },
    <Core>{
        id: uuid(),
        title: 'Nuevo lanzamiento',
        coverImage: 'assets/img/feedback/examples/piece_2.jpg',
        project: PROJECTS[4],
        type: CORE_TYPES[1],
        status: CORE_STATUSES[4],
        modified: $yesterday,
        created: $yesterday,
        messages: 0,
        groupReference: 'editor',
        owner: WORKSPACE_ACCESSES[0].user,
        workspace: WORKSPACE_ACCESSES[0].workspace
    },
    <Core>{
        id: uuid(),
        title: 'Nuevo lanzamiento',
        coverImage: 'assets/img/feedback/examples/piece_3.jpg',
        project: PROJECTS[5],
        type: CORE_TYPES[1],
        status: CORE_STATUSES[5],
        modified: $beforeYesterday,
        created: $beforeYesterday,
        messages: 0,
        groupReference: 'editor',
        owner: WORKSPACE_ACCESSES[0].user,
        workspace: WORKSPACE_ACCESSES[0].workspace
    },
    // Meeting note
    <Core>{
        id: uuid(),
        title: 'Nuevo lanzamiento',
        coverImage: 'assets/img/feedback/examples/piece_1.jpg',
        project: PROJECTS[6],
        type: CORE_TYPES[2],
        status: CORE_STATUSES[4],
        modified: $today,
        created: $today,
        messages: 0,
        groupReference: 'editor',
        owner: WORKSPACE_ACCESSES[0].user,
        workspace: WORKSPACE_ACCESSES[0].workspace
    },
    <Core>{
        id: uuid(),
        title: 'Nuevo lanzamiento',
        coverImage: 'assets/img/feedback/examples/piece_2.jpg',
        project: PROJECTS[7],
        type: CORE_TYPES[2],
        status: CORE_STATUSES[1],
        modified: $yesterday,
        created: $yesterday,
        messages: 0,
        groupReference: 'editor',
        owner: WORKSPACE_ACCESSES[0].user,
        workspace: WORKSPACE_ACCESSES[0].workspace
    },
    <Core>{
        id: uuid(),
        title: 'Nuevo lanzamiento',
        coverImage: 'assets/img/feedback/examples/piece_3.jpg',
        project: PROJECTS[8],
        type: CORE_TYPES[2],
        status: CORE_STATUSES[2],
        modified: $beforeYesterday,
        created: $beforeYesterday,
        messages: 0,
        owner: WORKSPACE_ACCESSES[0].user,
        workspace: WORKSPACE_ACCESSES[0].workspace
    },
    // Brief presentation
    <Core>{
        id: uuid(),
        title: 'Nuevo lanzamiento',
        coverImage: 'assets/img/feedback/examples/piece_1.jpg',
        project: PROJECTS[9],
        type: CORE_TYPES[3],
        status: CORE_STATUSES[3],
        modified: $today,
        created: $today,
        messages: 0,
        owner: WORKSPACE_ACCESSES[0].user,
        workspace: WORKSPACE_ACCESSES[0].workspace
    },
    <Core>{
        id: uuid(),
        title: 'Nuevo lanzamiento',
        coverImage: 'assets/img/feedback/examples/piece_2.jpg',
        project: PROJECTS[10],
        type: CORE_TYPES[3],
        status: CORE_STATUSES[4],
        modified: $yesterday,
        created: $yesterday,
        messages: 0,
        owner: WORKSPACE_ACCESSES[0].user,
        workspace: WORKSPACE_ACCESSES[0].workspace
    },
    <Core>{
        id: uuid(),
        title: 'Nuevo lanzamiento',
        coverImage: 'assets/img/feedback/examples/piece_3.jpg',
        project: PROJECTS[11],
        type: CORE_TYPES[3],
        status: CORE_STATUSES[5],
        modified: $beforeYesterday,
        created: $beforeYesterday,
        messages: 0,
        owner: WORKSPACE_ACCESSES[0].user,
        workspace: WORKSPACE_ACCESSES[0].workspace
    }

];


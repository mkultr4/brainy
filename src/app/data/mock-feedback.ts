import { Piece } from '../models/feedback/piece';
import * as uuid from 'uuid/v4';
import * as moment from 'moment';
import { CommentThread } from '../models/comments/comment-thread';
import { WORKSPACE_ACCESSES } from './mock-workspace-accesses';
import { COMMENT_THREADS_STATUSES, COMMENTS_THREAD_MESSAGE_EXAMPLE } from './mock-comments';
import { PARTICIPANTS_TYPES } from './mock-participants';
import { CommentThreadMessage } from '../models/comments/comment-thread-message';

let $today = new Date();
$today = moment($today).subtract(1, 'hour').toDate();
const $versionDate = moment().subtract(20, 'days').toDate();

export const PIECES_VERSIONES = [
    Object.assign(new Piece(), <Piece>{
        id:'1',
        order: 1,
        name: 'pieza_1.jpg',
        type: 'image',
        url: 'assets/img/feedback/examples/piece_1.jpg',
        setting : {naturalWidth: 800, naturalHeight: 520},
        empty: false,
        latest: true
    }),
    Object.assign(new Piece(), <Piece>{
        id: uuid(),
        order: 2,
        name: 'pieza_2.jpg',
        type: 'image',
        url: 'assets/img/feedback/examples/piece_2.jpg',
        setting : {naturalWidth: 800, naturalHeight: 520},
        empty: false,
        latest: true,
        commentThreads: []
    }),
    Object.assign(new Piece(), <Piece>{
        id: uuid(),
        order: 3,
        name: 'pieza_3.jpg',
        type: 'image',
        url: 'assets/img/feedback/examples/piece_3.jpg',
        setting : {naturalWidth: 800, naturalHeight: 520},
        empty: false,
        latest: true,
        commentThreads: []
    }),
    Object.assign(new Piece(), <Piece>{
        id: uuid(),
        order: 4,
        name: 'pieza_4.jpg',
        type: 'image',
        url: 'assets/img/feedback/examples/piece_4.jpg',
        setting : {naturalWidth: 800, naturalHeight: 520},
        empty: false,
        latest: true,
        commentThreads: []
    }),
    Object.assign(new Piece(), <Piece>{
        id: uuid(),
        order: 5,
        name: 'pieza_5.jpg',
        type: 'image',
        url: 'assets/img/feedback/examples/piece_5.jpg',
        setting : {naturalWidth: 800, naturalHeight: 520},
        empty: false,
        latest: true,
        commentThreads: []
    }),
    // Versions
    Object.assign(new Piece(), <Piece>{
        id: 'piece-version-1',
        order: 1,
        parentId: '1',
        name: 'version_pieza_3.jpg',
        url: 'assets/img/feedback/examples/piece_1_v3.jpg',
        type: 'image',
        setting : {naturalWidth: 800, naturalHeight: 520},
        created: $versionDate,
        versionNumber: 3,
        empty: false,
        commentThreads: [
            <CommentThread>{
                title: 'Editar aqui',
                levelId:'PIECE',
                referenceId:'piece-version-1',
                id: uuid(),
                event: 'click',
                type: 'pin',
                workspaceAccess: WORKSPACE_ACCESSES[0],
                saved: true,
                number: 1,
                originalContainerHeight: 661,
                originalContainerWidth: 1024,
                left: 50,
                top: 50,
                originalLeft: 50,
                originalTop: 50,
                comments: Object.assign([], COMMENTS_THREAD_MESSAGE_EXAMPLE),
                status: COMMENT_THREADS_STATUSES[1],
                participantType: PARTICIPANTS_TYPES[0]
            },
            <CommentThread>{
                title: 'Editar aqui',
                id: uuid(),
                levelId:'PIECE',
                referenceId:'piece-version-1',
                event: 'click',
                type: 'pin',
                workspaceAccess: WORKSPACE_ACCESSES[0],
                saved: true,
                number: 2,
                originalContainerHeight: 661,
                originalContainerWidth: 1024,
                left: 100,
                top: 80,
                originalLeft: 100,
                originalTop: 80,
                comments: Object.assign([], COMMENTS_THREAD_MESSAGE_EXAMPLE),
                status: COMMENT_THREADS_STATUSES[2],
                resolvedBy:WORKSPACE_ACCESSES[0],
                resolvedAt : new Date(),
                participantType: PARTICIPANTS_TYPES[2]
            }
        ]

    }),
    Object.assign(new Piece(), <Piece>{
        id: 'piece-version-2',
        order: 1,
        name: 'version_pieza_2.jpg',
        url: 'assets/img/feedback/examples/piece_1_v2.jpg',
        setting : {naturalWidth: 800, naturalHeight: 520},
        parentId: '1',
        versionNumber: 2,
        empty: false,
        type: 'image',
        created: $versionDate,
        commentThreads: [
            <CommentThread>{
                title: 'Editar aqui',
                id: uuid(),
                levelId:'PIECE',
                referenceId:'piece-version-2',
                event: 'click',
                type: 'pin',
                workspaceAccess: WORKSPACE_ACCESSES[0],
                saved: true,
                number: 1,
                originalContainerHeight: 661,
                originalContainerWidth: 1024,
                left: 50,
                top: 50,
                originalLeft: 50,
                originalTop: 50,
                comments: Object.assign([], COMMENTS_THREAD_MESSAGE_EXAMPLE),
                status: COMMENT_THREADS_STATUSES[1],
                participantType: PARTICIPANTS_TYPES[0]
            },
            <CommentThread>{
                title: 'Editar aqui',
                id: uuid(),
                levelId:'PIECE',
                referenceId:'piece-version-2',
                event: 'click',
                type: 'pin',
                workspaceAccess: WORKSPACE_ACCESSES[0],
                saved: true,
                number: 2,
                originalContainerHeight: 661,
                originalContainerWidth: 1024,
                left: 100,
                top: 80,
                originalLeft: 100,
                originalTop: 80,
                comments: Object.assign([], COMMENTS_THREAD_MESSAGE_EXAMPLE),
                status: COMMENT_THREADS_STATUSES[2],
                resolvedBy:WORKSPACE_ACCESSES[0],
                resolvedAt : new Date(),
                participantType: PARTICIPANTS_TYPES[2]
            }
        ]

    }),
    Object.assign(new Piece(), <Piece>{
        id: 'piece-version-3',
        order: 1,
        name: 'version_pieza_1.jpg',
        url: 'assets/img/feedback/examples/piece_1_v1.jpg',
        setting : {naturalWidth: 800, naturalHeight: 520},
        parentId: '1',
        versionNumber: 1,
        empty: false,
        type: 'image',
        created: $versionDate,
        commentThreads: [
            <CommentThread>{
                title: 'Editar aqui',
                id: uuid(),
                levelId:'PIECE',
                referenceId:'piece-version-2',
                event: 'click',
                type: 'pin',
                workspaceAccess: WORKSPACE_ACCESSES[0],
                saved: true,
                number: 1,
                originalContainerHeight: 661,
                originalContainerWidth: 1024,
                left: 50,
                top: 50,
                originalLeft: 50,
                originalTop: 50,
                comments: Object.assign([], COMMENTS_THREAD_MESSAGE_EXAMPLE),
                status: COMMENT_THREADS_STATUSES[1],
                participantType: PARTICIPANTS_TYPES[0]
            },
            <CommentThread>{
                title: 'Editar aqui',
                id: uuid(),
                levelId:'PIECE',
                referenceId:'piece-version-3',
                event: 'click',
                type: 'pin',
                workspaceAccess: WORKSPACE_ACCESSES[0],
                saved: true,
                number: 2,
                originalContainerHeight: 661,
                originalContainerWidth: 1024,
                left: 100,
                top: 80,
                originalLeft: 100,
                originalTop: 80,
                comments: Object.assign([], COMMENTS_THREAD_MESSAGE_EXAMPLE),
                status: COMMENT_THREADS_STATUSES[2],
                resolvedBy:WORKSPACE_ACCESSES[0],
                resolvedAt : new Date(),
                participantType: PARTICIPANTS_TYPES[2]
            }
        ]

    })
];

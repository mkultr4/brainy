
import * as uuid from 'uuid/v4';
import * as moment from 'moment';
import { CommentThreadStatus } from '../models/comments/comment-thread-status';
import { CommentThreadType } from '../models/comments/comment-thread-type';
import { CommentThread } from '../models/comments/comment-thread';
import { PARTICIPANTS_TYPES } from './mock-participants';
import { CommentThreadMessage } from '../models/comments/comment-thread-message';
import { WORKSPACE_ACCESSES } from './mock-workspace-accesses';


export const COMMENT_THREADS_STATUSES: CommentThreadStatus[] = [
    new CommentThreadStatus('0', 'all', 'Todos', 'assets/img/commons/comments/ico_comment_all.svg'),
    new CommentThreadStatus('1', 'in-process', 'En proceso', 'assets/img/commons/comments/ico_status_in_process.svg'),
    new CommentThreadStatus('2', 'resolved', 'Resuelto', 'assets/img/commons/comments/ico_status_resolved.svg'),
    new CommentThreadStatus('3', 'disapproved', 'Desaprobado', 'assets/img/commons/comments/ico_status_disapproved.svg'),
    new CommentThreadStatus('4', 'urgent', 'Urgente respuesta', 'assets/img/commons/comments/ico_status_urgent.svg')
];
export const COMMENT_THREADS_TYPES: CommentThreadType[] = [
    new CommentThreadType('all', 'all', 'Todos', 'assets/img/commons/comments/ico_file_all.svg'),
    new CommentThreadType('1', 'image', 'Imagen', 'assets/img/commons/comments/ico_image.svg'),
    new CommentThreadType('2', 'audio', 'Audio', 'assets/img/commons/comments/ico_audio.svg'),
    new CommentThreadType('3', 'file', 'Archivo', 'assets/img/commons/comments/ico_attachment.svg'),

];
export const COMMENT_THREAD_EXAMPLE: CommentThread[] = [
    <CommentThread>{
        id: uuid(),
        participantType: PARTICIPANTS_TYPES[0],
        status: COMMENT_THREADS_STATUSES[1],
        number: 1,
        referenceId:'1'
    },
    <CommentThread>{
        id: uuid(),
        participantType: PARTICIPANTS_TYPES[0],
        status: COMMENT_THREADS_STATUSES[2],
        number: 2,
        referenceId:'1'
    },
    <CommentThread>{
        id: uuid(),
        participantType: PARTICIPANTS_TYPES[0],
        status: COMMENT_THREADS_STATUSES[3],
        number: 3,
        referenceId:'1'
    },
    <CommentThread>{
        id: uuid(),
        participantType: PARTICIPANTS_TYPES[0],
        status: COMMENT_THREADS_STATUSES[4],
        number: 4,
        referenceId:'1'
    }


];

let today = new Date();
today = moment(today).subtract(1, 'hour').toDate();

const yesterday = moment().subtract(1, 'days').toDate();

const beforeYesterday = moment().subtract(2, 'days').toDate();


// Comment Thread Message Audio

const commentAudio = 'assets/data/audio.wav';
const commentFileUrl = 'assets/img/piece.jpg';
// tslint:disable-next-line:max-line-length
const commentText = 'Hay muchas variaciones de los pasajes de Lorem Ipsum disponibles, pero la mayoría sufrió alteraciones en alguna manera, ya sea porque se le agregó humor, o palabras aleatorias que no parecen ni un poco creíbles. Si vas a utilizar un pasaje de Lorem Ipsum, necesitás estar seguro de que no hay nada avergonzante escondido en el medio del texto. Todos los generadores de Lorem Ipsum que se encuentran en Internet tienden a repetir trozos predefinidos ';
export const COMMENTS_THREAD_MESSAGE_EXAMPLE: Array<CommentThreadMessage> = [
    Object.assign(new CommentThreadMessage(), <CommentThreadMessage>{
        id: uuid(),
        type: 'text',
        commentText: commentText,
        timestamp: today,
        saved: true,
        workspaceAccess: WORKSPACE_ACCESSES[2],
        commentThread: COMMENT_THREAD_EXAMPLE[0]
    }),
    Object.assign(new CommentThreadMessage(), <CommentThreadMessage>{
        id: uuid(),
        type: 'file',
        mimeType:'image',
        commentFileUrl: commentFileUrl,
        timestamp: today,
        workspaceAccess: WORKSPACE_ACCESSES[4],
        saved: true,
        commentThread: COMMENT_THREAD_EXAMPLE[1]
    }),
    Object.assign(new CommentThreadMessage(), <CommentThreadMessage>{
        id: uuid(),
        type: 'audio',
        commentAudio: commentAudio,
        commentAudioDuration: 3,
        timestamp: today,
        workspaceAccess: WORKSPACE_ACCESSES[3],
        saved: true,
        commentThread: COMMENT_THREAD_EXAMPLE[2]
    }),
    // Yesterday
    Object.assign(new CommentThreadMessage(), <CommentThreadMessage>{
        id: uuid(),
        type: 'text',
        commentText: commentText,
        timestamp: yesterday,
        workspaceAccess: WORKSPACE_ACCESSES[2],
        saved: true,
        commentThread: COMMENT_THREAD_EXAMPLE[3]

    }),
    Object.assign(new CommentThreadMessage(), <CommentThreadMessage>{
        id: uuid(),
        type: 'file',
        mimeType:'image',
        commentFileUrl: commentFileUrl,
        timestamp: yesterday,
        workspaceAccess: WORKSPACE_ACCESSES[4],
        saved: true,
        commentThread: COMMENT_THREAD_EXAMPLE[0]
    }),
    Object.assign(new CommentThreadMessage(), <CommentThreadMessage>{
        id: uuid(),
        type: 'audio',
        commentAudio: commentAudio,
        commentAudioDuration: 3,
        timestamp: yesterday,
        workspaceAccess: WORKSPACE_ACCESSES[3],
        saved: true,
        commentThread: COMMENT_THREAD_EXAMPLE[1]
    }),
    // Before yesterday
    Object.assign(new CommentThreadMessage(), <CommentThreadMessage>{
        id: uuid(),
        type: 'text',
        commentText: commentText,
        timestamp: beforeYesterday,
        workspaceAccess: WORKSPACE_ACCESSES[2],
        saved: true,
        commentThread: COMMENT_THREAD_EXAMPLE[2]
    }),
    Object.assign(new CommentThreadMessage(), <CommentThreadMessage>{
        id: uuid(),
        type: 'file',
        mimeType:'image',
        commentFileUrl: commentFileUrl,
        timestamp: beforeYesterday,
        workspaceAccess: WORKSPACE_ACCESSES[4],
        saved: true,
        commentThread: COMMENT_THREAD_EXAMPLE[3]
    }),
    Object.assign(new CommentThreadMessage(), <CommentThreadMessage>{
        id: uuid(),
        type: 'audio',
        mimeType:'image',
        commentAudio: commentAudio,
        commentAudioDuration: 3,
        timestamp: beforeYesterday,
        workspaceAccess: WORKSPACE_ACCESSES[3],
        saved: true,
        commentThread: COMMENT_THREAD_EXAMPLE[0]
    }),

];

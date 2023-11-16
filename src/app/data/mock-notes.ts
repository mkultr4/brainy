

import * as moment from 'moment';
import * as uuid from 'uuid/v4';
import { USERS } from './mock-users';
import { Note } from '../models/notes/note';
import { PROJECTS } from './mock-projects';
import { WORKSPACE_ACCESSES } from './mock-workspace-accesses';
import { INVITATIONS_EXAMPLE } from './mock-invitations';
import { ROLES } from './mock-roles';
import { CORE_TYPES } from './mock-cores';

let today = new Date();
today = moment(today).subtract(1, 'hour').toDate()

let yesterday = moment().subtract(1, 'days').toDate();

let beforeYesterday = moment().subtract(2, 'days').toDate();
const noteType = CORE_TYPES.filter(t => t.key === 'note')[0];
export const NOTES: Array<Note> = [
    Object.assign(new Note(), <Note>{
        id: uuid(),
        type: noteType,
        title: 'Wes Anderson, deep v pour-over trust.',
        content: `Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec. Donec viverra eleifend lacus, vita. It was a humorously perilous business for both of us. For, before we proceed further, it must be said that the monkey-rope was fast at both ends; fast to Queequeg's broad canvas belt, and fast to my narrow leather one. So that for better or for worse, we two, for the time, were wedded; and should poor Queequeg sink to rise no more, then both usage and honour demanded, that instead of cutting the cord, it should drag me down in his wake. So, then, an elongated Siamese ligature united us. Queequeg was my own inseparable twin brother; nor could I any way get rid of the dangerous liabilities which the hempen bond entailed.`,
        created: today,
        modified: today,
        project: PROJECTS[0],
        reminders: [],
        owner: USERS[1],
        ownerRol: ROLES[2],
        invitations: [INVITATIONS_EXAMPLE[0], INVITATIONS_EXAMPLE[1], INVITATIONS_EXAMPLE[2]]

    }),
    Object.assign(new Note(), <Note>{
        id: uuid(),
        type: noteType,
        title: 'Wes Anderson, deep v pour-over trust.',
        content: `Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec. Donec viverra eleifend lacus, vita. It was a humorously perilous business for both of us. For, before we proceed further, it must be said that the monkey-rope was fast at both ends; fast to Queequeg's broad canvas belt, and fast to my narrow leather one. So that for better or for worse, we two, for the time, were wedded; and should poor Queequeg sink to rise no more, then both usage and honour demanded, that instead of cutting the cord, it should drag me down in his wake. So, then, an elongated Siamese ligature united us. Queequeg was my own inseparable twin brother; nor could I any way get rid of the dangerous liabilities which the hempen bond entailed.`,
        created: beforeYesterday,
        modified: beforeYesterday,
        project: PROJECTS[0],
        reminders: [],
        owner: USERS[1],
        ownerRol: ROLES[2],
    }),
    Object.assign(new Note(), <Note>{
        id: uuid(),
        type: noteType,
        title: 'Wes Anderson, deep v pour-over trust.',
        content: `Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec. Donec viverra eleifend lacus, vita. It was a humorously perilous business for both of us. For, before we proceed further, it must be said that the monkey-rope was fast at both ends; fast to Queequeg's broad canvas belt, and fast to my narrow leather one. So that for better or for worse, we two, for the time, were wedded; and should poor Queequeg sink to rise no more, then both usage and honour demanded, that instead of cutting the cord, it should drag me down in his wake. So, then, an elongated Siamese ligature united us. Queequeg was my own inseparable twin brother; nor could I any way get rid of the dangerous liabilities which the hempen bond entailed.`,
        created: today,
        modified: today,
        project: PROJECTS[0],
        reminders: [],
        owner: USERS[1],
        ownerRol: ROLES[2],
    }),
    Object.assign(new Note(), <Note>{
        id: uuid(),
        type: noteType,
        title: 'Wes Anderson, deep v pour-over trust.',
        content: `Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec. Donec viverra eleifend lacus, vita. It was a humorously perilous business for both of us. For, before we proceed further, it must be said that the monkey-rope was fast at both ends; fast to Queequeg's broad canvas belt, and fast to my narrow leather one. So that for better or for worse, we two, for the time, were wedded; and should poor Queequeg sink to rise no more, then both usage and honour demanded, that instead of cutting the cord, it should drag me down in his wake. So, then, an elongated Siamese ligature united us. Queequeg was my own inseparable twin brother; nor could I any way get rid of the dangerous liabilities which the hempen bond entailed.`,
        created: yesterday,
        modified: yesterday,
        project: PROJECTS[0],
        reminders: [],
        owner: USERS[1],
        ownerRol: ROLES[2],
    }),
    Object.assign(new Note(), <Note>{
        id: uuid(),
        type: noteType,
        title: 'Wes Anderson, deep v pour-over trust.',
        content: `Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec. Donec viverra eleifend lacus, vita. It was a humorously perilous business for both of us. For, before we proceed further, it must be said that the monkey-rope was fast at both ends; fast to Queequeg's broad canvas belt, and fast to my narrow leather one. So that for better or for worse, we two, for the time, were wedded; and should poor Queequeg sink to rise no more, then both usage and honour demanded, that instead of cutting the cord, it should drag me down in his wake. So, then, an elongated Siamese ligature united us. Queequeg was my own inseparable twin brother; nor could I any way get rid of the dangerous liabilities which the hempen bond entailed.`,
        created: today,
        modified: today,
        project: PROJECTS[0],
        reminders: [],
        owner: USERS[1],
        ownerRol: ROLES[2],
    }),
    Object.assign(new Note(), <Note>{
        id: uuid(),
        type: noteType,
        title: 'Wes Anderson, deep v pour-over trust.',
        content: `Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec. Donec viverra eleifend lacus, vita. It was a humorously perilous business for both of us. For, before we proceed further, it must be said that the monkey-rope was fast at both ends; fast to Queequeg's broad canvas belt, and fast to my narrow leather one. So that for better or for worse, we two, for the time, were wedded; and should poor Queequeg sink to rise no more, then both usage and honour demanded, that instead of cutting the cord, it should drag me down in his wake. So, then, an elongated Siamese ligature united us. Queequeg was my own inseparable twin brother; nor could I any way get rid of the dangerous liabilities which the hempen bond entailed.`,
        created: beforeYesterday,
        modified: beforeYesterday,
        project: PROJECTS[0],
        owner: USERS[1],
        ownerRol: ROLES[2],
    }),
    Object.assign(new Note(), <Note>{
        id: uuid(),
        type: noteType,
        title: 'Wes Anderson, deep v pour-over trust.',
        content: `Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec. Donec viverra eleifend lacus, vita. It was a humorously perilous business for both of us. For, before we proceed further, it must be said that the monkey-rope was fast at both ends; fast to Queequeg's broad canvas belt, and fast to my narrow leather one. So that for better or for worse, we two, for the time, were wedded; and should poor Queequeg sink to rise no more, then both usage and honour demanded, that instead of cutting the cord, it should drag me down in his wake. So, then, an elongated Siamese ligature united us. Queequeg was my own inseparable twin brother; nor could I any way get rid of the dangerous liabilities which the hempen bond entailed.`,
        created: today,
        modified: today,
        project: PROJECTS[0],
        reminders: [],
        owner: USERS[1],
        ownerRol: ROLES[2],
    }),
    Object.assign(new Note(), <Note>{
        id: uuid(),
        type: noteType,
        title: 'Wes Anderson, deep v pour-over trust.',
        content: `Fusce vehicula dolor arcu, sit amet blandit dolor mollis nec. Donec viverra eleifend lacus, vita. It was a humorously perilous business for both of us. For, before we proceed further, it must be said that the monkey-rope was fast at both ends; fast to Queequeg's broad canvas belt, and fast to my narrow leather one. So that for better or for worse, we two, for the time, were wedded; and should poor Queequeg sink to rise no more, then both usage and honour demanded, that instead of cutting the cord, it should drag me down in his wake. So, then, an elongated Siamese ligature united us. Queequeg was my own inseparable twin brother; nor could I any way get rid of the dangerous liabilities which the hempen bond entailed.`,
        created: beforeYesterday,
        modified: beforeYesterday,
        project: PROJECTS[0],
        reminders: [],
        owner: USERS[1],
        ownerRol: ROLES[2],
    }),

];
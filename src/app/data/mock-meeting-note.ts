
import { MeetingNoteType } from '../models/meeting-note/meeting-note-type';
import { Topic } from '../models/meeting-note/topic';
import * as uuid from 'uuid/v4';
import { TopicLineItem } from '../models/meeting-note/topic-line-item';
import { Content } from '../interface/topic/Content';
import { Task } from '../models/meeting-note/task';
import { WORKSPACE_ACCESSES } from './mock-workspace-accesses';
import { TopicLineItemReference } from '../models/meeting-note/topic-line-item-reference';
import { MeetingNoteAudit } from '../models/meeting-note/meeting-note-audit';
import { TopicEditionLog } from '../models/meeting-note/topic-edition-log';

export const MEETING_NOTE_TYPES = [
    <MeetingNoteType>{ id: 1, key: 'fill_now', name: 'LLenar ahora' },
    <MeetingNoteType>{ id: 2, key: 'scheduled', name: 'Programa reunión' },
]

export const TOPIC_LINE_TEXT_EMPTY = `<span><br></span>`
// Topic Example
export const TOPICS_EXAMPLE = [
    Object.assign(new Topic(), <Topic>{
        id: 'topic-1',
        order: 1,
        title: 'Primer tema',
        descriptionItems: [
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: 'primer-tema-1',
                idTopic: 'topic-1',
                content: <Content>{ text: '<span>1.1.Subtema</span>' },
                type: 'sub-topic',
                order: 1
            }),
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: 'primer-tema-description',
                idParent: 'primer-tema-1',
                idTopic: 'topic-1',
                content: <Content>{ text: `<span>Contenido primer tema</span>` },
                type: 'text',
                order: 2
            }),
            // Second subtopic
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: 'primer-tema-2',
                idTopic: 'topic-1',
                content: <Content>{ text: '<span>1.2.Subtema</span>' },
                type: 'sub-topic',
                order: 3
            }),
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: uuid(),
                idParent: 'primer-tema-2',
                idTopic: 'topic-1',
                content: <Content>{ text: `<span>Contenido segundo tema</span>` },
                type: 'text',
                order: 4
            }),
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: 'primer-tema-3',
                idTopic: 'topic-1',
                type: 'sub-topic',
                content: <Content>{ text: '<span>1.3.Subtema</span>' },
                order: 5
            }),
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: uuid(),
                idParent: 'primer-tema-3',
                idTopic: 'topic-1',
                content: <Content>{ text: `<span>Contenido tercer tema</span>` },
                type: 'text',
                order: 6
            }),
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: 'primer-tema-4',
                idTopic: 'topic-1',
                type: 'sub-topic',
                content: <Content>{ text: '<span>1.4.Subtema</span>' },
                order: 7
            }),
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: uuid(),
                idParent: 'primer-tema-4',
                idTopic: 'topic-1',
                content: <Content>{ text: `<span>Contenido cuarto tema</span>` },
                type: 'text',
                order: 8
            }),
        ],
        agreementItems: [
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: uuid(),
                idParent: null,
                idTopic: 'topic-1',
                reference: TopicLineItemReference.AGREEMENT,
                content: <Content>{ text: `<span>Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: </span>` },
                type: 'text',
                order: 1

            })
        ]
    }),
    Object.assign(new Topic(), <Topic>{
        id: 'topic-2',
        order: 2,
        title: 'Segundo tema',
        descriptionItems: [
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: 'segundo-tema-1',
                idTopic: 'topic-2',
                type: 'sub-topic',
                content: <Content>{ text: '<span>2.1.Subtema</span>' },
                order: 1
            }),
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: uuid(),
                idParent: 'segundo-tema-1',
                idTopic: 'topic-2',
                content: <Content>{ text: `<span>Contenido 2.1  tema</span>` },
                type: 'text',
                order: 2
            }),
        ],
        agreementItems: [
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: uuid(),
                idParent: null,
                idTopic: 'topic-2',
                reference: TopicLineItemReference.AGREEMENT,
                content: <Content>{ text: `<span>Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: </span>` },
                type: 'text',
                order: 1

            })
        ]
    })
]

// Topic Edition log
export const TOPIC_EDITION_LOG = [
    <TopicEditionLog> {
        id:'edition-title',
        reference: TopicLineItemReference.DESCRIPTION,
        idTopicLine: 'primer-tema-description',
        idTopic: 'topic-1'
    },
    <TopicEditionLog> {
        id:'edition-text-1',
        reference: TopicLineItemReference.DESCRIPTION,
        idTopicLine: 'primer-tema-description',
        idTopic: 'topic-1'
    }
]
export const AGREEMENTS_EXAMPLE = [
    Object.assign(new Topic(), <Topic>{
        id: 'topic-1',
        order: 1,
        title: 'Primer tema',
        agreementItems: [
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: 'primer-tema-1',
                idTopic: 'topic-1',
                content: <Content>{ text: '<span>1.1.Subtema</span>' },
                type: 'sub-topic',
                order: 1
            }),
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: uuid(),
                idParent: 'primer-tema-1',
                idTopic: 'topic-1',
                content: <Content>{ text: `<span>Contenido primer tema</span>` },
                type: 'text',
                order: 2
            }),
            // Second subtopic
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: 'primer-tema-2',
                idTopic: 'topic-1',
                content: <Content>{ text: '<span>1.2.Subtema</span>' },
                type: 'sub-topic',
                order: 3
            }),
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: uuid(),
                idParent: 'primer-tema-2',
                idTopic: 'topic-1',
                content: <Content>{ text: `<span>Contenido segundo tema</span>` },
                type: 'text',
                order: 4
            }),
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: 'primer-tema-3',
                idTopic: 'topic-1',
                type: 'sub-topic',
                content: <Content>{ text: '<span>1.3.Subtema</span>' },
                order: 5
            }),
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: uuid(),
                idParent: 'primer-tema-3',
                idTopic: 'topic-1',
                content: <Content>{ text: `<span>Contenido tercer tema</span>` },
                type: 'text',
                order: 6
            }),
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: 'primer-tema-4',
                idTopic: 'topic-1',
                type: 'sub-topic',
                content: <Content>{ text: '<span>1.4.Subtema</span>' },
                order: 7
            }),
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: uuid(),
                idParent: 'primer-tema-4',
                idTopic: 'topic-1',
                content: <Content>{ text: `<span>Contenido cuarto tema</span>` },
                type: 'text',
                order: 8
            }),
        ]
    }),
    Object.assign(new Topic(), <Topic>{
        id: 'topic-2',
        order: 2,
        title: 'Segundo tema',
        agreementItems: [
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: 'segundo-tema-1',
                idTopic: 'topic-2',
                type: 'sub-topic',
                content: <Content>{ text: '<span>2.1.Subtema</span>' },
                order: 1
            }),
            Object.assign(new TopicLineItem(), <TopicLineItem>{
                id: uuid(),
                idParent: 'segundo-tema-1',
                idTopic: 'topic-2',
                content: <Content>{ text: `<span>Contenido 2.1  tema</span>` },
                type: 'text',
                order: 2
            }),
        ]
    })
]

export const TASKS_CLOSE = [
    Object.assign(new Task(), <Task>{
        date: new Date().toDateString(),
        description: `Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua.`,
        hour: "03:35 pm",
        idTopic: "topic-1",
        order: 2,
        reference: "TOPIC_DESCRIPTION",
        responsible: WORKSPACE_ACCESSES[0],
        timestamp: new Date()
    }),
    Object.assign(new Task(), <Task>{
        date: new Date().toDateString(),
        description: `Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua.`,
        hour: "03:35 pm",
        idTopic: "topic-1",
        order: 2,
        reference: "TOPIC_DESCRIPTION",
        responsible: WORKSPACE_ACCESSES[0],
        timestamp: new Date()
    }),
]

export const MEETING_NOTE_AUDIT = [
    <MeetingNoteAudit>{
        id:uuid(),
        text:`Se cambio el título del tema a “Content writing”`,
    },
    <MeetingNoteAudit>{
        id:uuid(),
        text:`Se agrego un nuevo subtema al tema de ”Jerarquía de los títulos”`,
    },
    <MeetingNoteAudit>{
        id:uuid(),
        text:`Se  edito contendido del tema Content writing.`,
    },
    <MeetingNoteAudit>{
        id:uuid(),
        text:`Se realizaron 5 nuevos comentarios.`,
    }
]
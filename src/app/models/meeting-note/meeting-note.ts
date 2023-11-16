import { Core } from '../cores/core';
import { MeetingNoteType } from './meeting-note-type';
import { TopicLineItem } from './topic-line-item';
import { Task } from './task';

export class MeetingNote extends Core {
    public meetingNoteType: MeetingNoteType = new MeetingNoteType();
    public syncType = '';
    public date: string;
    public hour: string;
    public duration: string;
    public place: string;
    public tasks: Task[];
    public nextMeeting: MeetingNote;
    constructor() {
        super();
    }
}

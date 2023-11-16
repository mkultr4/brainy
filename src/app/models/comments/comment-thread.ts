import { CommentThreadStatus } from './comment-thread-status';
import { ParticipantType } from '../participants/participant-type';
import { CommentThreadMessage } from './comment-thread-message';
import { WorkspaceAccess } from '../workspace/workspace-access';
import { Invitation } from '../invitations/invitation';

export const POINT_SIZE = { width: 20, height: 20 };

export class CommentThread {
    public id: any;
    public levelId: any;
    public referenceId: any;
    public objectReference: any;
    public objectReferenceId: any;
    // pin rectangle circle
    public type = 'pin';
    // Sizes
    public width = 62;
    public height = 62;
    public originalWidth = 62;
    public originalHeight = 62;
    // Times
    public timeStart = 0;
    public timeEnd = 0;
    // Frame
    public frameImage: string;
    public frameWidth: number;
    public frameHeight: number;
    public frameScale: number;
    // Style
    public borderColor = '#F5A623';
    public borderStyle = 'solid';
    public borderWidth = 1;
    public backgroundColor = 'transparent';
    // Position
    public left: number;
    public top: number;
    public originalLeft: number;
    public originalTop: number;
    // Container
    public containerTop: number;
    public containerWidth: number;
    public containerHeight: number;
    public originalContainerWidth: number;
    public originalContainerHeight: number;
    // Event
    public event: string;
    public eventObject: any;
    // Number
    public number: number;
    // Attributes
    public title: string;
    public status: CommentThreadStatus;
    public participantType: ParticipantType;
    public timestamp: Date;
    public saved = false;
    public deleted = false;
    public comments: Array<CommentThreadMessage> = new Array<CommentThreadMessage>();
    public workspaceAccess: WorkspaceAccess;
    public invitations: Array<Invitation> = new Array<Invitation>();
    // Flag unread messages
    public unreadMessages = false;
    // resolved
    public resolvedBy: WorkspaceAccess;
    public resolvedAt: Date;
}

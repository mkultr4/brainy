import { WorkspaceAccess } from '../workspace/workspace-access';
import { CommentThread } from './comment-thread';
import { CommentLink } from './comment-link';


export class CommentThreadMessage {
    public id: any;
    public commentThreadId: string;
    // Text file audio
    public type:string = 'text';
    public workspaceAccess: WorkspaceAccess;
    public timestamp: Date;
    // Value
    public commentText = '';
    public commentAudio: any;
    public commentAudioDuration; // To fix
    public commentFile: any;
    public commentFileName: any;
    public commentFileUrl: any;
    public mimeType;
    // Flags
    public isNewMessage = false;
    public saved = false;
    public edited = false;
    public deleted = false;
    // Mention
    public commentThreadMention: CommentThreadMessage;
    // Parent
    public commentThread: CommentThread;
    public commentLink: CommentLink;

    constructor();
    constructor(
        id: string,
        commentThreadId: string,
        type: string,
        workspaceAccess: WorkspaceAccess,
        commentThread: CommentThread,
        timestamp: Date,
        edited: boolean,
        deleted: boolean,

    );
    constructor(
        id?: string,
        commentThreadId?: string,
        type?: string,
        workspaceAccess?: WorkspaceAccess,
        commentThread?: CommentThread,
        timestamp?: Date,
        edited?: boolean,
        deleted?: boolean,

    ) {
        if (id) {
            this.id = id;
        }
        if (commentThreadId) {
            this.commentThreadId = commentThreadId;
        }
        if (type) {
            this.type = type;
        }
        if (workspaceAccess) {
            this.workspaceAccess = workspaceAccess;
        }
        if (timestamp) {
            this.timestamp = timestamp;
        }
        if (edited) {
            this.edited = edited;
        }
        if (deleted) {
            this.deleted = deleted;
        }
        if (commentThread) {
            this.commentThread = commentThread;
        }
        
    }

    isEmpty() {
        const empty = !this.commentAudio && !this.commentText && !this.commentFile;

        return empty;
    }

    setTimestamp(timestamp: Date) {
        this.timestamp = timestamp;


    }
    setId(id: string) {
        this.id = id;


    }

    get() {
        return this;
    }
}

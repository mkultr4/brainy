import { NoteReminder } from "./note-reminder";
import { Project } from "../projects/project";
import { User } from "../users/user";
import { WorkspaceAccess } from "../workspace/workspace-access";
import { Core } from "../cores/core";

export class Note extends Core{
    public id: string;
    public content = '';
    public created: Date;
    public modified: Date;
    //Share to delete
    public users:Array<User> = new Array<User>();
    // Share 
    public workspaceAccesses: Array<WorkspaceAccess> = new Array<WorkspaceAccess>();
    //Reminders
    public reminders:Array<NoteReminder> = new Array<NoteReminder>();

    constructor();
    constructor(
        id: string,
        content: string,
        project: Project,
        created: Date,
        modified: Date

        
        
    );
    constructor(
        id?: string,
        content?: string,
        project?: Project,
        created?: Date,
        modified?: Date
    ) {
        super();
        if (id)
            this.id = id;
        if(content)
            this.content = content
        
        if (project)
            this.project = project;
        if (created)
            this.created = created;
        
        if (modified)
            this.modified = modified;
        
    }
}

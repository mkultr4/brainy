import { Project } from '../projects/project';
import { CoreType } from './core-type';
import { CoreStatus } from './core-status';
import { Workspace } from '../workspace/workspace';
import { User } from '../users/user';
import { Invitation } from '../invitations/invitation';
import { Rol } from '../workspace/rol';
import { Brand } from '../brands/brand';

export class Core {
    public id: any;
    public title: string;
    public coverImage: string;
    public project: Project;
    public fechaReg:Date;
    // Type
    public type: CoreType;
    // Status
    public status: CoreStatus;
    // Timestamps
    public created: Date;
    public modified: Date;
    // Messages unread
    public messages: number;
    // Deleted
    public deleted = false;
    // Workspace Access Current group reference to core
    public groupReference = 'comment';

    public workspace: Workspace;
    public owner: User;
    public ownerRol: Rol;

    // Approved information
    public approvedDate: Date;
    public approvedBy: Invitation;

    public brand:Brand;

    public invitations:Array<Invitation> = [];
    
    constructor() { }
}

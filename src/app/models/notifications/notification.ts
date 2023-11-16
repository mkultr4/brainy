import { WorkspaceAccess } from '../workspace/workspace-access';
import { Invitation } from '../invitations/invitation';
import { NotificationType } from './notification-type';
import { NotificationLevel } from './notification-level';
import { NotificationStatus } from './notification-status';
import { User } from '../users/user';
import { Rol } from '../workspace/rol';

export class Notification {
    public id: any;
    // Data
    public title: string;
    public message: string = '';
    public thumbnail: string;
    // Type
    public type: NotificationType;
    // References
    public level: NotificationLevel;
    public referenceId:any;
    public referenceObject:any;
    // Status
    public status: NotificationStatus;
    // Read
    public read: boolean;
    // Alert
    public alertRead = false;
    // Origin user
    public originUser: User;
    public originUserRol: Rol;
    public originUserGroupReference = 'comment';
    // To user
    public destinationUser: User;
    // TimeStamps
    public createDate: Date;
    public updateDate: Date;
    // Extra link data for design
    public queryParams:any;
    constructor(){};
    
    
}

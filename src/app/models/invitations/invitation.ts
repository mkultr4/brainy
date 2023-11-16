import { WorkspaceAccess } from '../workspace/workspace-access';
import { Rol } from '../workspace/rol';
import { Brand } from '../brands/brand';
import { RolPermission } from '../workspace/rol-permission';
import { Category } from '../categories/category';
import { User } from '../users/user';

export class Invitation {
    public id: string;
    public email: string;
    public rol: Rol;
    public levelId: any;
    public referenceId: any;
    public referenceDescription: any;
    public groupReference = 'comment';
    public workspaceAccessId: string;
    public workspaceAccess: WorkspaceAccess;
    public brand: Brand;
    public active = false;
    // invitation category
    public categoryId: string;
    public category: Category;
    public invitationStatus: string;
    // Permissions
    public permissions: Array<RolPermission>;
    // Audit
    public from: WorkspaceAccess;
    public created: Date;
    public modified: Date;
    public user: User;
    constructor();
    constructor(id: string, email: string, rol: Rol);
    constructor(id?: string, email?: string, rol?: Rol) {
        this.email = email;
        this.rol = rol;
    }
}

import { Workspace } from './workspace';
import { Rol } from './rol';
import { User } from '../users/user';
import { AccountStatus } from './account-status';
import { Category } from '../categories/category';
import { WorkspaceAccessAudit } from './workspace-access-audit';
import { RolPermission } from './rol-permission';
import { Brand } from '../brands/brand';

export class WorkspaceAccess {
    public id: any;
    // Workspace
    public workspace: Workspace;
    // Rol granted
    public rol: Rol;
    // Roles Permission
    public permissions: Array<RolPermission>;
    // Category
    public category: Category;
    // User
    public user: User;
    // created
    public created: Date;
    // modified
    public modified: Date;
    // Account status
    public accountStatus: AccountStatus;
    // Brands
    public brands = [];
    // Brand
    public brandCurrentCore: Brand;
    // last session
    public lastSession: Date;
    // Group reference
    public groupReference: string;
    // Deleted
    public deleted = false;
    // Audits
    public audits: WorkspaceAccessAudit[];
}

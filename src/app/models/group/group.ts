import { WorkspaceAccess } from '../workspace/workspace-access';
import { User } from '../users/user';
import { Brand } from '../brands/brand';

export class Group {
    public id: string;
    public name: string;
    public createDate: Date;
    public user: User;
    public workspaceId: string;
    public workspaceAccesses: Array<WorkspaceAccess> = new Array<WorkspaceAccess>();
    public brands: Array<Brand> = new Array<Brand>();
    //public brands: Array<Brand> = [];
    //public brands: Brand;
    public modified: Date;
    public members: number;
  }
  
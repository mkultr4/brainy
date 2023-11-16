import { WorkspaceAccess } from '../workspace/workspace-access';
import { Brand } from '../brands/brand';


export class Category {
  public id: string;
  public workspaceId: string;
  public name: string;
  public workspaceAccesses: Array<WorkspaceAccess> = new Array<WorkspaceAccess>();
  public brands: Array<Brand> = [];
  public modified: Date;
}

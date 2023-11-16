import { WorkspaceAccess } from "../workspace/workspace-access";

export class Giveback {
    public id: any;
    public briefCategoryId: any;
    public briefCategoryItemId: any;
    public categoryTitle: string = '';
    public subCategoryTitle: string = '';
    public briefCategoryItemTitle:string = ''
    public message: string = '';
    public reply: string = '';
    // Edited
    public edited = false;
    public editedReply = false;
    //  Add to reply
    public addToBrief = false;
    // Audit
    public createdBy: WorkspaceAccess;
    public modifiedBy: WorkspaceAccess;
    public answeredBy: WorkspaceAccess;
    // Date
    public createdAt: Date;
    public modifiedAt: Date;
    public answeredAt: Date;

}

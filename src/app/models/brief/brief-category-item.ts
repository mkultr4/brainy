import { ResponseType } from "./response-type";
import ResponseContent from "src/app/interface/brief/ResponseContent";
import Content from "src/app/interface/brief/Content";
import ResponseTypeSetting from "src/app/interface/brief/ResponseTypeSetting";
import { Option } from "./option";
import { WorkspaceAccess } from "../workspace/workspace-access";
import { Giveback } from "./giveback";


export class BriefCategoryItem {

    public id: any;
    public idBriefCategory: any;
    public title = '';
    public description = '';
    public order: number;
    public idParent: any;
    public idQuestionParent: any;
    public type: string;
    // Content
    public content: Content;
    // Response
    public responseType: ResponseType;
    public responseSettings: ResponseTypeSetting;
    public responseContent: ResponseContent;
    // Questions childs
    public optionParent:Option = new Option();
    public hasQuestionChild = false;
    public childs: BriefCategoryItem[] = [];
    // Is filled
    public isFilled = false;
    // Workspace user filled
    public fillAnswerBy: WorkspaceAccess;
    // Public 
    public giveback = new Giveback();
}

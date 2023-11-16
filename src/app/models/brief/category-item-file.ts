import Setting from "src/app/interface/files/Setting";

export class CategoryItemFile {
    // id
    id: any;
    // reference
    idBriefCategoryItem: any;
    // Name
    name: string;
    // File
    url: string;
    // setting
    public setting: Setting;
    // constructor
    constructor() { }
}

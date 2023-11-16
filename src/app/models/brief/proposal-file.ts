import Setting from "src/app/interface/files/Setting";

export class ProposalFile {
    // id
    id: any;
    // Name
    name: string;
    // File
    url: string;
    // setting
    public setting: Setting;
    created: Date;
    modified: Date;
    // constructor
    constructor() { }
}

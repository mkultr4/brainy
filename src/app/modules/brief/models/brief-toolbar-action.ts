export class BriefToolbarAction {

    type: string;
    args: any;
    constructor();
    constructor(
        type: string,
        args: any);
    constructor(
        type?: string,
        args?: any) {
        this.type = type;
        if (args) {
            this.args = args;
        }
    }


}


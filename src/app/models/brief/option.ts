import { Icon } from "../icons/Icon";

export class Option {
    id: any;
    referenceType:string;
    referenceId:any;
    label: string = '';
    value:string = '';
    type: string;
    icon:Icon = undefined;
    order: number;
}

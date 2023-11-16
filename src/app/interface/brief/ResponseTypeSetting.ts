import { Option } from "src/app/models/brief/option";
import { Table } from "src/app/models/brief/table";

export default interface ResponseTypeSetting {
    maxLength?: number;
    options?: Option[];
    table?: Table;
    quantity?: { type?: string, mask?: string, placeholder?: string };
    assessment?: { type?: string };
    acceptFiles?: { video: boolean, image:boolean,file: boolean, audio: boolean, link: boolean };
}

import { Option } from "./option";
import { TableCellType } from "./table-cell-type";

export class TableCell {
    id:any;
    isNew:boolean = true;
    type: TableCellType;
    value:string;
    options:Array<Option>  = new Array<Option>();
    
}

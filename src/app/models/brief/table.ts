import { TableColumn } from "./table-column";
import { TableRow } from "./table-row";

export class Table {
    public id: any;
    public isNew = true;
    columns: Array<TableColumn> = new Array<TableColumn>();
    rows: Array<TableRow> = new Array<TableRow>();
}

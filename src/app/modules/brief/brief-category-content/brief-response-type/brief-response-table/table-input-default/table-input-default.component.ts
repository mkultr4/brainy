import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { TableCell } from 'src/app/models/brief/table-cell';
import { TableCellType } from 'src/app/models/brief/table-cell-type';

@Component({
  selector: 'app-table-input-default',
  templateUrl: './table-input-default.component.html',
  styleUrls: ['./table-input-default.component.scss']
})
export class TableInputDefaultComponent implements OnInit {
  // Input
  @Input() cell: TableCell;
  @Input() editable:boolean = false;
  @Input() isResizing:boolean = false;
  @Input() refillable:boolean = false;
  @Input() tableCellTypes: TableCellType[];
  // Output
  @Output() onFocus = new EventEmitter();
  @Output() onChangeSettings = new EventEmitter();
  //  Contructor
  constructor() { }

  ngOnInit() {
  }

  
  onFocusFn(focus:boolean){
    this.onFocus.emit(focus);
  }
  onChangeValue(){
    this.onChangeSettings.emit();
  }

}

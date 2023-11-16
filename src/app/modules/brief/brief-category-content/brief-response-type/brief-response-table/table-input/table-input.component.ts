import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TableCell } from 'src/app/models/brief/table-cell';
import { TableCellType } from 'src/app/models/brief/table-cell-type';

@Component({
  selector: 'app-table-input',
  templateUrl: './table-input.component.html',
  styleUrls: ['./table-input.component.scss']
})
export class TableInputComponent implements OnInit {
  // Public vars
  focused = false;
  isShowContextualTable = false;
  // Inputs
  @Input() cell: TableCell;
  @Input() editable: boolean = false;
  @Input() isResizing: boolean = false;
  @Input() refillable: boolean = false;
  @Input() tableCellTypes: TableCellType[];
  // Outputs
  @Output() onChangeInput = new EventEmitter();
  // Constructor
  constructor() { }
  // Init
  ngOnInit() {
  }
  // On focus
  onFocus(focus: boolean) {
    this.focused = focus;
  }
  // On show contextual
  onShowContextual(show:boolean){
    this.isShowContextualTable =show;
  }
  onChangeType(type){
    this.cell.isNew = false;
    this.onChangeInput.emit();
  }
  // On change settings
  onChangeSettings(){
    this.onChangeInput.emit();
  }
}

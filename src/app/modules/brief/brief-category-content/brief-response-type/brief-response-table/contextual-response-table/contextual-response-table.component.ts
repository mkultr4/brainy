import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit } from '@angular/core';
import { TableCellType } from 'src/app/models/brief/table-cell-type';
import { TableCell } from 'src/app/models/brief/table-cell';
import { ModalFloatingComponent } from 'src/app/modules/shared/modal-floating/modal-floating.component';
import * as uuid from 'uuid/v4';
import { Option } from 'src/app/models/brief/option';

@Component({
  selector: 'app-contextual-response-table',
  templateUrl: './contextual-response-table.component.html',
  styleUrls: ['./contextual-response-table.component.scss']
})
export class ContextualResponseTableComponent implements OnInit, AfterViewInit{
  // Public 
  optionsSelectDefault = [
  ]
  // Inputs
  @Input() tableCellTypes: TableCellType[];
  @Input() cell: TableCell = new TableCell();
  // Outputs
  @Output() onShowContextual = new EventEmitter();
  @Output() onChangeType = new EventEmitter();
  // View Child
  @ViewChild(ModalFloatingComponent) modal: ModalFloatingComponent;
  // Constructor
  constructor() {
  }
  // Init
  ngOnInit() {
  }
  // After view init
  ngAfterViewInit() {
    setTimeout(() => {
   
    });
  }
  // Chnage type
  changeType($event,type) {
    // Prevent
    $event.preventDefault();
    $event.stopPropagation();
    // Set
    this.cell.type = type;
    this.cell.value = '';
    this.cell.isNew = false;
    if (this.cell.type.key === 'select') {
      this.cell.options = this.generateOptionsSelectDefault();
    }
    this.modal.hideModal();
    setTimeout(() => {
      if (this.cell.type.key === 'select') {
        $('#contextual-btn-select-cell-' + this.cell.id).trigger('click');
      }
    });
    this.onChangeType.emit(type);
  }
  // Options select default
  generateOptionsSelectDefault(){
    return  [
      <Option>{ id: uuid(),referenceType:'cell', referenceId: this.cell.id, label: 'Opción 1' },
      <Option>{ id: uuid(),referenceType:'cell', referenceId: this.cell.id, label: 'Opción 2' },
    ]
  }
  // On show
  onShowFn(show: boolean) {
    this.onShowContextual.emit(show);
  }

}

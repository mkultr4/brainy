import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalFloatingComponent } from 'src/app/modules/shared/modal-floating/modal-floating.component';
import { TableCell } from 'src/app/models/brief/table-cell';
import { ToastrService } from 'ngx-toastr';
import * as uuid from 'uuid/v4';
import { Option } from 'src/app/models/brief/option';

@Component({
  selector: 'app-contextual-response-table-select',
  templateUrl: './contextual-response-table-select.component.html',
  styleUrls: ['./contextual-response-table-select.component.scss']
})
export class ContextualResponseTableSelectComponent implements OnInit {
  // Inputs
  @Input() cell: TableCell = new TableCell();
  // Outputs
  @Output() onOptionsChange = new EventEmitter();
  // View childs
  @ViewChild(ModalFloatingComponent) modal: ModalFloatingComponent;
  constructor(private _toastrService: ToastrService) { }

  ngOnInit() {
  }
  // Add option
  addOption() {
    if (this.cell.options.length >= 10) {
      this._toastrService.info('El límite es de 10 opciones');
      return false;
    }
    // Add option
    let option = <Option>{ id: uuid(), referenceType: 'cell', referenceId: this.cell.id, label: 'Opción ' + (this.cell.options.length + 1) };
    this.cell.options.push(Object.assign(new TableCell(), option));
    // emit
    this.onOptionsChange.emit();
    setTimeout(() => {
      this.modal.posisionated();
    });
  }
  // Remove option
  removeOption($event, option) {
    $event.preventDefault();
    $event.stopPropagation();
    // Remove
    var index = this.cell.options.indexOf(option);
    this.cell.options.splice(index, 1);
    // emit
    this.onOptionsChange.emit();
    setTimeout(() => {
      this.modal.posisionated();
    })
  }
  optionChange($event){
    this.onOptionsChange.emit();
  }
}

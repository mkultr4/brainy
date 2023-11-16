import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
export class DropdownOrderEvent {
  public column;
  public direction;
  constructor(column, direction) {
    this.column = column;
    this.direction = direction;
  }
  getOrderBy() {
    let orderBy = this.column;
    if (this.direction === -1) {
      orderBy = '-' + this.column;
    }

    return orderBy;
  }
}
@Component({
  selector: 'app-dropdown-order',
  templateUrl: './dropdown-order.component.html',
  styleUrls: ['./dropdown-order.component.scss']
})
export class DropdownOrderComponent implements OnInit {

  // Inputs
  @Input() empty = false;
  @Input() emptyText = 'Sin elementos para ordenar';
  @Input() drodpownId = 'dropdown-order';
  @Input() filterOrderColumn: string;
  @Input() filterOrderDirection: number;
  @Input() orderAlph = 'name';
  @Input() orderAlphText = 'ORDENAR';
  @Input() orderDate = 'modified';
  @Input() orderDateText = 'ACTIVIDAD';
  @Output() filterOnChangeFilterOrder = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  setOrder(column, direction) {
    const order = new DropdownOrderEvent(column, direction);
    this.filterOnChangeFilterOrder.emit(order);
  }


}

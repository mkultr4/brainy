import { Component, OnInit, Input } from '@angular/core';
import { TableCell } from 'src/app/models/brief/table-cell';

@Component({
  selector: 'app-table-input-quantity-close',
  templateUrl: './table-input-quantity-close.component.html',
  styleUrls: ['./table-input-quantity-close.component.scss']
})
export class TableInputQuantityCloseComponent implements OnInit {
  @Input() cell: TableCell;
  constructor() { }

  ngOnInit() {
  }

}

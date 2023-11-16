import { Component, OnInit, Input } from '@angular/core';
import { TableCell } from 'src/app/models/brief/table-cell';

@Component({
  selector: 'app-table-input-select-close',
  templateUrl: './table-input-select-close.component.html',
  styleUrls: ['./table-input-select-close.component.scss']
})
export class TableInputSelectCloseComponent implements OnInit {
  @Input() cell: TableCell;
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { TableCell } from 'src/app/models/brief/table-cell';

@Component({
  selector: 'app-table-input-close',
  templateUrl: './table-input-close.component.html',
  styleUrls: ['./table-input-close.component.scss']
})
export class TableInputCloseComponent implements OnInit {
  @Input() cell: TableCell;
  constructor() { }

  ngOnInit() {
  }

}

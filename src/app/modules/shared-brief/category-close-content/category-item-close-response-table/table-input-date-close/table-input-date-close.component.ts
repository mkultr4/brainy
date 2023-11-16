import { Component, OnInit, Input } from '@angular/core';
import { TableCell } from 'src/app/models/brief/table-cell';

@Component({
  selector: 'app-table-input-date-close',
  templateUrl: './table-input-date-close.component.html',
  styleUrls: ['./table-input-date-close.component.scss']
})
export class TableInputDateCloseComponent implements OnInit {
  @Input() cell: TableCell;
  constructor() { }

  ngOnInit() {
  }

}

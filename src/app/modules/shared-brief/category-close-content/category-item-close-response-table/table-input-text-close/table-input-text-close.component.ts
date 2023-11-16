import { Component, OnInit, Input } from '@angular/core';
import { TableCell } from 'src/app/models/brief/table-cell';

@Component({
  selector: 'app-table-input-text-close',
  templateUrl: './table-input-text-close.component.html',
  styleUrls: ['./table-input-text-close.component.scss']
})
export class TableInputTextCloseComponent implements OnInit {
  @Input() cell: TableCell;
  constructor() { }

  ngOnInit() {
  }

}

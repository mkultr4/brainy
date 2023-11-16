import { Component, OnInit, Input } from '@angular/core';
import { TableCell } from 'src/app/models/brief/table-cell';

@Component({
  selector: 'app-table-input-percentage-close',
  templateUrl: './table-input-percentage-close.component.html',
  styleUrls: ['./table-input-percentage-close.component.scss']
})
export class TableInputPercentageCloseComponent implements OnInit {
  @Input() cell: TableCell;
  constructor() { }

  ngOnInit() {
  }

}

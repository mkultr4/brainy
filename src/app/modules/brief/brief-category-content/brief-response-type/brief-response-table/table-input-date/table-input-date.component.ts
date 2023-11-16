import { Component, OnInit } from '@angular/core';
import { TableInputDefaultComponent } from '../table-input-default/table-input-default.component';
import { DATEPICKER_CONFIG } from 'src/app/config/app.config';

@Component({
  selector: 'app-table-input-date',
  templateUrl: './table-input-date.component.html',
  styleUrls: ['./table-input-date.component.scss']
})
export class TableInputDateComponent 
extends TableInputDefaultComponent
implements OnInit {
  // Opions
  public datePickerOptions: any = Object.assign({}, DATEPICKER_CONFIG);
  constructor() { 
    super();
    this.datePickerOptions.container = 'body';
    this.datePickerOptions.format= 'dd/mm/yy';
  }

  ngOnInit() {
  }

}

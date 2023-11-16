import { Component, OnInit } from '@angular/core';
import { TableInputDefaultComponent } from '../table-input-default/table-input-default.component';

@Component({
  selector: 'app-table-input-quantity',
  templateUrl: './table-input-quantity.component.html',
  styleUrls: ['./table-input-quantity.component.scss']
})
export class TableInputQuantityComponent
extends TableInputDefaultComponent
 implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}

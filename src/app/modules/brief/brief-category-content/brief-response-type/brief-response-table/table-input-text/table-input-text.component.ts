import { Component, OnInit } from '@angular/core';
import { TableInputDefaultComponent } from '../table-input-default/table-input-default.component';

@Component({
  selector: 'app-table-input-text',
  templateUrl: './table-input-text.component.html',
  styleUrls: ['./table-input-text.component.scss']
})
export class TableInputTextComponent 
extends TableInputDefaultComponent
implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

}

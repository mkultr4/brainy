import { Component, OnInit } from '@angular/core';
import { TableInputDefaultComponent } from '../table-input-default/table-input-default.component';

@Component({
  selector: 'app-table-input-select',
  templateUrl: './table-input-select.component.html',
  styleUrls: ['./table-input-select.component.scss']
})
export class TableInputSelectComponent 
extends TableInputDefaultComponent
implements OnInit {

  constructor() { 
    super();
  }

  ngOnInit() {
  }

  onOptionsChange(){
    this.onChangeSettings.emit();
  }
}

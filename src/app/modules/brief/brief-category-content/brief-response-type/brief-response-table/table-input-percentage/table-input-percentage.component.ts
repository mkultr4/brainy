import { Component, OnInit } from '@angular/core';
import { TableInputDefaultComponent } from '../table-input-default/table-input-default.component';
import { MASK_PERCENTAGE } from 'src/app/data/mock-brief';

@Component({
  selector: 'app-table-input-percentage',
  templateUrl: './table-input-percentage.component.html',
  styleUrls: ['./table-input-percentage.component.scss']
})
export class TableInputPercentageComponent
extends TableInputDefaultComponent
 implements OnInit {
  public maskPecentage = MASK_PERCENTAGE;
  constructor() { 
    super();
  }

  ngOnInit() {
  }

}

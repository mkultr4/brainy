import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BriefTemplate } from 'src/app/models/brief/brief-template';
import { Area } from 'src/app/models/brief/area';

@Component({
  selector: 'app-dropdown-filter-area',
  templateUrl: './dropdown-filter-area.component.html',
  styleUrls: ['./dropdown-filter-area.component.scss']
})
export class DropdownFilterAreaComponent implements OnInit {

  // Input
  @Input() templates: BriefTemplate[];
  @Input() areas: Area[];
  @Input() filterArea: Area;
  // Outputs
  @Output() dropdownOnChangeFilterArea= new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  setFilterArea(area: Area) {
    this.dropdownOnChangeFilterArea.emit(area);
  }


}

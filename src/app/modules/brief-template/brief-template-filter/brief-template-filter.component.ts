import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { InterfaceMenuFilterComponent } from '../../shared-header/interface-menu-filter/interface-menu-filter.component';
import { BriefTemplate } from 'src/app/models/brief/brief-template';
import { Category } from 'src/app/models/brief/category';
import { Area } from 'src/app/models/brief/area';

@Component({
  selector: '[app-brief-template-filter]',
  templateUrl: './brief-template-filter.component.html',
  styleUrls: ['./brief-template-filter.component.scss']
})
export class BriefTemplateFilterComponent extends InterfaceMenuFilterComponent implements OnInit {
  // Inputs
  @Input() templates: Array<BriefTemplate>;
  // Area
  @Input() filterArea: Area;
  @Input() areas: Area[];
  // Permissions
  @Input() isAdmin = false;
  // Outputs
  @Output() filterOnChangeFilterArea = new EventEmitter();
  // Constructor
  constructor() {
    super();
  }

  ngOnInit() {
  }

  changeFilterArea(area: Area) {
    this.filterOnChangeFilterArea.emit(area);
  }

}

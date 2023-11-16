import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { InterfaceMenuFilterComponent } from '../../shared-header/interface-menu-filter/interface-menu-filter.component';
import { Brand } from '../../../models/brands/brand';

@Component({
  selector: 'app-brands-filter,[app-brands-filter]',
  templateUrl: './brands-filter.component.html',
  styleUrls: ['./brands-filter.component.scss']
})
export class BrandsFilterComponent
  extends InterfaceMenuFilterComponent
  implements OnInit {
  // Inputs
  @Input() brands: Array<Brand>;
  @Input() filterBrand: Brand;
  // Output
  @Output() filterOnChangeFilterBrand = new EventEmitter();
  constructor() {
    super();
  }

  ngOnInit() {
  }

  changeFilterBrand(brand: Brand) {
    this.filterOnChangeFilterBrand.emit(brand);
  }

}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Brand } from '../../../../models/brands/brand';

@Component({
  selector: 'app-dropdown-filter-brands',
  templateUrl: './dropdown-filter-brands.component.html',
  styleUrls: ['./dropdown-filter-brands.component.scss']
})
export class DropdownFilterBrandsComponent implements OnInit {
  // Input
  @Input() brands: Brand[];
  @Input() filterBrand: Brand;
  // Output
  @Output() dropdownOnChangeFilterBrand = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  setFilterBrand(brand: Brand) {
    this.dropdownOnChangeFilterBrand.emit(brand);
  }

}

import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Brand } from '../../../models/brands/brand';
import { Core } from '../../../models/cores/core';
import { Project } from '../../../models/projects/project';

@Component({
  selector: 'app-activity-filter-brand',
  templateUrl: './activity-filter-brand.component.html',
  styleUrls: ['./activity-filter-brand.component.scss']
})
export class ActivityFilterBrandComponent implements OnInit {
 // Brands
 @Input() brands: Array<Brand>;
 // Inputs
 @Input() cores: Array<Core>;
 @Input() filterBrand: Brand;
 @Output() filterOnChangeFilterBrand = new EventEmitter();
 @Output() filterOnChangeFilterProject = new EventEmitter();

 constructor() { }

 ngOnInit() {
 }
 //  Brand
 setFilterBrand(brand) {
   this.filterBrand = brand;
   this.filterOnChangeFilterProject.emit(<Project>{ id: 'all'});
   this.filterOnChangeFilterBrand.emit(this.filterBrand);
 }
 getCountBrands(brandId) {

   const countBrands = this.cores.filter(
     c => c.project.brand.id === brandId).length;

   return countBrands;
 }
}

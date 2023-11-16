import { Pipe, PipeTransform } from '@angular/core';
import { Brand } from '../../../models/brands/brand';

@Pipe({
  name: 'filterCoreByBrand'
})
export class FilterCoreByBrandPipe implements PipeTransform {

  transform(values: Array<any>, filterBrand: Brand) {
    let filterValues = values;
    if (filterBrand.id !== 'all') {
      filterValues = values.filter(object => {

        return object.project.brand.id === filterBrand.id;

      }
      );
    }
    return filterValues;
  }
}

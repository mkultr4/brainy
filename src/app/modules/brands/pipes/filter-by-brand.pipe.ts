import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByBrand'
})
export class FilterByBrandPipe implements PipeTransform {

  transform(values: any, filterBrand?: any): any {
    let filterValues = values;
    if (filterBrand.id !== 'all') {
      filterValues = values.filter(object => object.id === filterBrand.id);
    }
    return filterValues;
  }


}

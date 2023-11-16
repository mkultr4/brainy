import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProjectByBrand'
})
export class FilterProjectByBrandPipe implements PipeTransform {

  transform(values: any, filterBrand: any): any {
    let filterValues = values;
    if (filterBrand.id !== 'all') {
      filterValues = values.filter(object => {
        let valid = false;
        if (object.brandId) {
          valid = object.brandId === filterBrand.id;
        } else {
          valid = object.brand.id === filterBrand.id;
        }

        return valid;
      });
    }

    return filterValues;
  }

}


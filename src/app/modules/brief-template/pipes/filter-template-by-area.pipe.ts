import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTemplateByArea'
})
export class FilterTemplateByAreaPipe implements PipeTransform {

  transform(values: any, filterArea?: any): any {
    let filterValues = values;
    if (filterArea.id !== 'all') {
      filterValues = values.filter(object => object.category.area.id === filterArea.id);
    }
    return filterValues;
  }

}

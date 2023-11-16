import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCoreByProject'
})
export class FilterCoreByProjectPipe implements PipeTransform {

  transform(values: any, filterProject: any): any {
    let filterValues = values;
    if (filterProject.id !== 'all') {
      filterValues  =  values.filter(object => {
            return object.project.id === filterProject.id;
      });
    }
    return filterValues;
  }
}

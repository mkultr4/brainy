import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProject'
})
export class FilterProjectPipe implements PipeTransform {

  transform(values: any, filterProject: any): any {
      let filterValues = values;
      if (filterProject.id !== 'all') {
        filterValues  =  values.filter(object => {
          return object.id === filterProject.id;
        }
        );
      }
      return filterValues;
  }

}

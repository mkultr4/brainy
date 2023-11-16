import { Pipe, PipeTransform } from '@angular/core';
import { CoreType } from '../../../models/cores/core-type';

@Pipe({
  name: 'filterCoreByType'
})
export class FilterCoreByTypePipe implements PipeTransform {

  transform(values: Array<any>, filterBrainyObjectType: CoreType) {
    let filterValues = values;
    if (filterBrainyObjectType.key !== 'all') {
      filterValues = values.filter(object => {
        let valid = false;

        valid = object.type.key === filterBrainyObjectType.key;

        return valid;
      });
    }

    return filterValues;
  }

}

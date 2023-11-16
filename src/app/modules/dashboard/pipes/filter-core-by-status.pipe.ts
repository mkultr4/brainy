import { Pipe, PipeTransform } from '@angular/core';
import { CoreStatus } from '../../../models/cores/core-status';

@Pipe({
  name: 'filterCoreByStatus'
})
export class FilterCoreByStatusPipe implements PipeTransform {

  transform(values: Array<any>, filterBrainyObjectStatus: CoreStatus) {
    let filterValues = values;
    if (filterBrainyObjectStatus.key !== 'all') {
      filterValues = values.filter(object => {
        const showArchived = filterBrainyObjectStatus.key === 'archived';
        let valid = false;

        if (showArchived) {
          valid = object.status.key === filterBrainyObjectStatus.key;
        } else {
          valid = object.status.key === filterBrainyObjectStatus.key && object.status.key !== 'archived';
        }

        return valid;
      });
    } else {
      filterValues = values.filter(object => {
        let valid = false;
        valid = object.status.key !== 'archived';
        return valid;
      });
    }

    return filterValues;
  }

}

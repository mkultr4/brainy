import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCommentThreadStatus'
})
export class FilterCommentThreadStatusPipe implements PipeTransform {

  transform(values: Array<any>, statusesFilter: Array<any>): any {

    let filterValues = values;
    // First Status
    if (statusesFilter.length > 0) {
      if (statusesFilter.filter(status => status.key === 'all').length === 0) {
        filterValues = values.filter(commentThread => {
          let valid = false;
          if (!commentThread.saved) {
            valid = true;
          } else if (statusesFilter.filter(status => status.key === commentThread.status.key).length > 0) {
            valid = true;
          } else {
            valid = false;
          }
          return valid;
        });
      }
    }


    return filterValues;
  }
}
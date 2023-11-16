import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'filterCommentMessageByDay'
})
export class FilterCommentMessageByDayPipe implements PipeTransform {

  transform(values: any, day: any): any {
    let filterValues = values;
    filterValues = values.filter(comment => {
      let valid = false;
      valid = moment(comment.timestamp).format('YYYY-MM-DD') === day;
      return valid;
    });


    return filterValues;

  }

}

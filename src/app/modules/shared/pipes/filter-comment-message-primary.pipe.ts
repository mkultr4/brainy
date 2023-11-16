import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterCommentMessagePrimary'
})
export class FilterCommentMessagePrimaryPipe implements PipeTransform {

  transform(values: any, arg?: any): any {
    let filterValues = values;
    filterValues = values.filter(comment => {
      let valid = false;
      valid = comment.parentId === undefined || comment.parentId === null;
      return valid;
    });


    return filterValues;

  }

}

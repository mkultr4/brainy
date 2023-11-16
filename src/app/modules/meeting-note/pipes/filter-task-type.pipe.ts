import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTaskType'
})
export class FilterTaskTypePipe implements PipeTransform {
  transform(values: any, type): any {
    console.log(values);
    return values.filter( v => v.taskType === type);
  }

}

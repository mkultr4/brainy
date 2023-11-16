import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterItemSubTopic'
})
export class FilterItemSubTopicPipe implements PipeTransform {

  transform(values: any, args?: any): any {
      return values.filter(v => v.type === 'sub-topic');
  }

}

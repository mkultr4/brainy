import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'topicNotEmpty'
})
export class TopicNotEmptyPipe implements PipeTransform {

  transform(values: any, args?: any): any {
      return values.filter( t => t.title.length > 0);
  }

}

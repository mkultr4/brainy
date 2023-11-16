import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showTopicList'
})
export class ShowTopicListPipe implements PipeTransform {

  transform(values: any, args?: any): any {
    let show = false;
    if (values.length === 0) {
      show = false;
    } else if (values.length === 1) {
      const topic = values[0];
      if(topic && topic.title.length === 0 && !topic.saved){
        show = false;
      }else{
        show  = true;
      }
      

    }
    else {
      show = true;
    }

    return show;
  }

}

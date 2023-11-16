import { Pipe, PipeTransform } from '@angular/core';
import { Topic } from 'src/app/models/meeting-note/topic';
import { TOPIC_LINE_TEXT_EMPTY } from 'src/app/data/mock-meeting-note';

@Pipe({
  name: 'filterTopicWithAgreement'
})
export class FilterTopicWithAgreementPipe implements PipeTransform {

  transform(values: Topic[], args?: any): any {
    return values.filter(topic => {
      let valid = false;
      if (topic.agreementItems.length > 1) {
        valid = true;
      } else if (topic.agreementItems.length === 1) {
        const line = topic.agreementItems[0];
        if (line.type === 'text') {
          valid = line.content.text !== '' && line.content.text !== TOPIC_LINE_TEXT_EMPTY && line.content.text !== '<br>';
        } else {
          valid = true;
        }
      } else {
        valid = false;
      }
      return valid;
    });
  }

}

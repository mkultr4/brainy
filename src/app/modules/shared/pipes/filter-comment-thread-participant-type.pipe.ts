import { Pipe, PipeTransform } from '@angular/core';
import { ParticipantType } from '../../../models/participants/participant-type';

@Pipe({
  name: 'filterCommentThreadParticipantType'
})
export class FilterCommentThreadParticipantTypePipe implements PipeTransform {

  transform(commentThreads: any, participantTypes: Array<ParticipantType>): any {
    let filterValues = commentThreads;
    // First Status
    if (participantTypes.length > 0) {
      if (participantTypes.filter(status => status.key === 'all').length === 0) {
        filterValues = commentThreads.filter(commentThread => {
          let valid = false;
          if (!commentThread.saved) {
            valid = true;
          } else if (participantTypes.filter(status => status.key === commentThread.status.key).length > 0) {
            valid = true;
          } else {
            valid = false;
          }
          return valid;
        })
      }
    }


    return filterValues;
  }

}
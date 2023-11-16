import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterInvitationPending'
})
export class FilterInvitationPendingPipe implements PipeTransform {

  transform(values: any, showPending = false ): any {
    return values.filter(invitation => {
      let valid = false;
      if (showPending) {
        valid = true;
      } else {
        valid = invitation.active;
      }

      return valid;
    });
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterInvitationGuestCategory'
})
export class FilterInvitationGuestCategoryPipe implements PipeTransform {

  transform(values: any, categoryId: string): any {
    return values.filter(invitation => {
      const valid = invitation.rol.key === 'guest' && invitation.category && invitation.category.id === categoryId;
      return valid;
    });

  }

}

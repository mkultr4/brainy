import { Pipe, PipeTransform } from '@angular/core';
import { RolService } from '../../../services/roles/rol.service';

@Pipe({
  name: 'filterInvitationGuest'
})
export class FilterInvitationGuestPipe implements PipeTransform {

  transform(values: any): any {

    return values.filter(invitation => {
      let valid = false;
      if (invitation.workspaceAccess) {
        valid = RolService.isGuestRol(invitation.workspaceAccess.rol.key);
      } else {
        valid = RolService.isGuestRol(invitation.rol.key );
      }
      return valid;
    });



  }

}

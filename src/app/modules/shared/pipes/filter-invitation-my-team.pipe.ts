import { Pipe, PipeTransform } from '@angular/core';
import { RolService } from '../../../services/roles/rol.service';

@Pipe({
  name: 'filterInvitationMyTeam'
})
export class FilterInvitationMyTeamPipe implements PipeTransform {

  transform(values: any): any {

    return values.filter(invitation => {
      let valid = false;
      if (invitation.workspaceAccess) {
        valid = RolService.isTeamRol(invitation.workspaceAccess.rol.key);
      } else {
        valid = RolService.isTeamRol(invitation.rol.key);
      }

      return valid;
    });

  }

}

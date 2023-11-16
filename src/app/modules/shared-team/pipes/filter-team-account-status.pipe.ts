import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../../models/users/user';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';

@Pipe({
  name: 'filterTeamAccountStatus'
})
export class FilterTeamAccountStatusPipe implements PipeTransform {

  transform(users: Array<WorkspaceAccess>, accountStatus: string): any {
    let filterValues = users;
    if (accountStatus !== 'all') {
      filterValues = users.filter(w => w.accountStatus.key === accountStatus);
    }

    return filterValues;

  }

}

import { Pipe, PipeTransform } from '@angular/core';
import { WorkspaceAccess } from '../../../models/workspace/workspace-access';

@Pipe({
  name: 'filterSearchUser'
})
export class FilterSearchUserPipe implements PipeTransform {

  transform(workspaceAccesses: Array<WorkspaceAccess>, search: string): any {
    let filterValues = workspaceAccesses;
    if (search !== '') {
      const query = new RegExp('^' + search, 'i');
      filterValues = workspaceAccesses.filter((w: WorkspaceAccess) => {
        return query.test(w.user.name + ' ' + w.user.lastName) ||
              query.test(w.user.name) || query.test(w.user.lastName)
              || query.test(w.user.email);
      });
    }
    return filterValues;
  }

}

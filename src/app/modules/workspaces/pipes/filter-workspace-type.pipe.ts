import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterWorkspaceType'
})
export class FilterWorkspaceTypePipe implements PipeTransform {

  transform(values: Array<any>, type: string, userId: string) {
    let filterValues = values;
    if (type !== 'all') {
      let owner = type === 'my' ? true : false;
      if (owner) {
        filterValues = values.filter(object => object.workspace.ownerId === userId);
      } else {
        filterValues = values.filter(object => object.workspace.ownerId !== userId);
      }
    }
    return filterValues;
  }


}

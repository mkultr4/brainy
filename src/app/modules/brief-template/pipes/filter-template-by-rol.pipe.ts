import { Pipe, PipeTransform } from '@angular/core';
import { BriefTemplate } from 'src/app/models/brief/brief-template';
import { RolService } from 'src/app/services/roles/rol.service';

@Pipe({
  name: 'filterTemplateByRol'
})
export class FilterTemplateByRolPipe implements PipeTransform {

  transform(values: BriefTemplate[], rolKey: string): any {
    let filterValues = values.filter(object => {
      const isAdmin = RolService.isAdminRol(rolKey);
      return object.isLibrary || isAdmin;
    });

    return filterValues;
  }

}

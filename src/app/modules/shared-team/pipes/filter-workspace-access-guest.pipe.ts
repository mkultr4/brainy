import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterWorkspaceAccessGuest'
})
export class FilterWorkspaceAccessGuestPipe implements PipeTransform {

  transform(values: any, guest: boolean = true): any {
    return values.filter(w => {
      let valid = w.rol.key === 'guest';
      if (!guest) {
        valid = !valid;
      }
      return valid;
    });
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showCategoriesList'
})
export class ShowCategoriesListPipe implements PipeTransform {

  transform(values: any, args?: any): any {
    let show = false;
    if (!values || values.length === 0) {
      show = false;
    } else if (values.length === 1) {
      const category = values[0];
      if (category && category.title.length === 0 && !category.saved) {
        show = false;
      } else {
        show = true;
      }

    }
    else {
      show = true;
    }
    return show;
  }


}

import { Pipe, PipeTransform } from '@angular/core';
import { BriefCategoryItemType } from 'src/app/models/brief/brief-category-item-type';

@Pipe({
  name: 'filterItemSubCategory'
})
export class FilterItemSubCategoryPipe implements PipeTransform {

  transform(values: any, args?: any): any {
    return values.filter(v => v.type === BriefCategoryItemType.SUB_CATEGORY);
  }


}

import { Pipe, PipeTransform } from '@angular/core';
import { CommentThread } from 'src/app/models/comments/comment-thread';
import { BriefCategoryItemType } from 'src/app/models/brief/brief-category-item-type';

@Pipe({
  name: 'filterCommentThreadCategory'
})
export class FilterCommentThreadCategoryPipe implements PipeTransform {

  transform(values: CommentThread[], args?: any): any {

    return values.filter(v => v.objectReference !== BriefCategoryItemType.VIDEO && v.objectReference !==  BriefCategoryItemType.IMAGE);

  }
}

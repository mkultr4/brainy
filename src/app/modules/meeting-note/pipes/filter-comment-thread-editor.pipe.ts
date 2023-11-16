import { Pipe, PipeTransform } from '@angular/core';
import { CommentThread } from 'src/app/models/comments/comment-thread';

@Pipe({
  name: 'filterCommentThreadEditor'
})
export class FilterCommentThreadEditorPipe implements PipeTransform {

  transform(values: CommentThread[], args?: any): any {

    return values.filter(v => v.objectReference !== 'video' 
    && v.objectReference !== 'image' 
    && v.objectReference !== 'topic-title'
    && v.objectReference !== 'agreement-title'
    );

  }

}

import { Injectable } from '@angular/core';
import { POINT_SIZE } from 'src/app/models/comments/comment-thread';

@Injectable()
export class BriefCommentsService {

  constructor() { }
  /**
    * Get position selecion
    * @param commentId 
    */
  public getPositionSelection(commentId) {
    // Get the wrapper element selection
    // 'closest-comment-thread-container'
    
    const wrapperEl = $('.comment-thread-selection-' + commentId + ':last');
    const parent = wrapperEl.closest('.closest-comment-thread-container');
    // console.log(wrapperEl);
    if (wrapperEl.length > 0 && parent.length > 0) {

      const offsetParent = parent.offset();
      const scrollTop = parent.scrollTop();

      const wrapperElementOffset = wrapperEl.offset();

      // Point size
      let top = 0;
      let left = 0;

      const textNode = wrapperEl.get(0).firstChild;
      const range = document.createRange();
      range.selectNodeContents(textNode);
      const rects = range.getClientRects();
      
      if (rects.length > 0) {
        top = rects[rects.length - 1].top - offsetParent.top - (POINT_SIZE.width / 2) + scrollTop;
        left = rects[rects.length - 1].right - offsetParent.left;
      } else {
        top = wrapperElementOffset.top - offsetParent.top - (POINT_SIZE.width / 2) + scrollTop;
        left = (wrapperElementOffset.left - offsetParent.left) + wrapperEl.width();
      }
      return { left: left, top: top };
    }
    return null;
  }
}

import { Component, OnInit, ElementRef } from '@angular/core';
import { BriefCategoryItemDefaultComponent } from '../brief-category-item-default/brief-category-item-default.component';
import { BriefStrategyService } from 'src/app/services/brief/brief-strategy.service';

@Component({
  selector: '[app-brief-category-item-dynamic-content]',
  templateUrl: './brief-category-item-dynamic-content.component.html',
  styleUrls: ['./brief-category-item-dynamic-content.component.scss']
})
export class BriefCategoryItemDynamicContentComponent
  extends BriefCategoryItemDefaultComponent
  implements OnInit {
  // Public vars
  public focusText = false;
  // Service
  private _briefService;
  // constructor
  constructor(
    elementRef: ElementRef,
    private _briefServiceStrategy: BriefStrategyService
  ) {
    super(elementRef);
    // Strategy
    this._briefService = this._briefServiceStrategy.getService();
  }
  // Init
  ngOnInit() {
  }
  // Update text
  updateText(textVal) {
    const text = this.briefCategoryItem.content.dynamicContent.filter(c => c.type === 'TEXT')[0];
    text.content = textVal;
    this._briefService.updateBriefCategoryItem(this.briefCategoryItem).subscribe(response => {
      setTimeout(() => {
        $('.comment-thread-point-brief').trigger('resize');
      });
    });
  }

}
